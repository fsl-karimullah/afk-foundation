import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

const COOKIE_NAME = "afk_admin_session";
const SESSION_DURATION_SECONDS = 7 * 24 * 60 * 60; // 7 hari

function getSecretKey(): Uint8Array {
  const secret =
    process.env.JWT_SECRET ||
    "super_secret_afk_foundation_key_change_in_production_32chars!";
  return new TextEncoder().encode(secret);
}

// In-memory sliding rate limiter untuk mitigasi brute force login
interface AttemptRecord {
  count: number;
  lastAttempt: number;
}
const loginAttempts = new Map<string, AttemptRecord>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 menit

export function checkRateLimit(ipOrKey: string): {
  allowed: boolean;
  remainingAttempts: number;
  lockoutRemainingSeconds?: number;
} {
  const now = Date.now();
  const record = loginAttempts.get(ipOrKey);

  if (!record) {
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  // Reset jika lockout sudah lewat
  if (now - record.lastAttempt > LOCKOUT_MS) {
    loginAttempts.delete(ipOrKey);
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  if (record.count >= MAX_ATTEMPTS) {
    const remainingSec = Math.ceil(
      (LOCKOUT_MS - (now - record.lastAttempt)) / 1000
    );
    return {
      allowed: false,
      remainingAttempts: 0,
      lockoutRemainingSeconds: remainingSec,
    };
  }

  return {
    allowed: true,
    remainingAttempts: MAX_ATTEMPTS - record.count,
  };
}

export function recordFailedAttempt(ipOrKey: string) {
  const now = Date.now();
  const record = loginAttempts.get(ipOrKey);
  if (!record || now - record.lastAttempt > LOCKOUT_MS) {
    loginAttempts.set(ipOrKey, { count: 1, lastAttempt: now });
  } else {
    record.count += 1;
    record.lastAttempt = now;
  }
}

export function resetRateLimit(ipOrKey: string) {
  loginAttempts.delete(ipOrKey);
}

/**
 * Validasi kredensial admin dari environment variables
 */
export async function verifyAdminCredentials(
  user: string,
  pass: string
): Promise<boolean> {
  const envUser = process.env.ADMIN_USERNAME || "admin";
  const envPass = process.env.ADMIN_PASSWORD || "adminsecret123!";
  const envPassHash = process.env.ADMIN_PASSWORD_HASH;

  // Verifikasi username
  if (user.trim() !== envUser.trim()) {
    return false;
  }

  // Verifikasi password (bisa plaintext env atau bcrypt hash)
  if (envPassHash) {
    return bcrypt.compare(pass, envPassHash);
  }

  return pass === envPass;
}

/**
 * Membuat token JWT sesi admin
 */
export async function createSessionToken(username: string): Promise<string> {
  const secret = getSecretKey();
  return new SignJWT({
    username,
    role: "admin",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(secret);
}

/**
 * Verifikasi token JWT
 */
export async function verifySessionToken(token: string) {
  try {
    const secret = getSecretKey();
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
}

/**
 * Simpan cookie sesi HttpOnly
 */
export async function setAdminSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION_SECONDS,
    path: "/",
  });
}

/**
 * Dapatkan sesi saat ini dari cookie
 */
export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

/**
 * Hapus cookie sesi saat logout
 */
export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
