import mongoose from "mongoose";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseConnectionCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseConnectionCache || {
  conn: null,
  promise: null,
};

global.mongooseConnectionCache = cached;

export async function connectDB(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes("username:password") || uri.includes("your_user")) {
    throw new Error(
      "MONGODB_URI belum diatur atau masih menggunakan placeholder. Silakan isi MONGODB_URI di .env.local atau Vercel Environment Variables."
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
    };

    cached.promise = mongoose.connect(uri, opts).then((instance) => {
      return instance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
