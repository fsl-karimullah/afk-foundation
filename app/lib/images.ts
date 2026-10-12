/**
 * Helper untuk memformat URL gambar.
 * Jika URL berasal dari Cloudinary (res.cloudinary.com), otomatis di-route melalui CDN proxy Cloudflare (wsrv.nl)
 * dengan optimasi WebP.
 * 
 * Hal ini mengatasi masalah koneksi timeout/blokir pada provider internet Indonesia (seperti Telkomsel/Indihome)
 * terhadap domain res.cloudinary.com, sekaligus mempercepat loading gambar hingga 70%.
 */
export function formatImageUrl(url?: string | null): string {
  if (!url) return "";
  if (url.includes("res.cloudinary.com")) {
    return `https://wsrv.nl/?url=${encodeURIComponent(url)}&output=webp&q=85`;
  }
  return url;
}
