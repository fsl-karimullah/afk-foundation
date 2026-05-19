import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amir Faisal Karimullah Foundation | Filantropi Berbasis Inovasi Digital",
  description:
    "Gerakan filantropi personal yang didanai penuh oleh profit inovasi digital. Membagikan stimulus Rp200rb/bulan untuk pendidikan, modal usaha, dan kebutuhan mendesak. Powered by Akademi UMKM & PulseAI.",
  keywords: [
    "filantropi",
    "pendidikan",
    "bantuan sosial",
    "Akademi UMKM",
    "PulseAI",
    "Amir Faisal Karimullah",
    "stimulus modal",
    "kebutuhan mendesak",
    "teknologi kemanusiaan",
    "circular philanthropy",
  ],
  authors: [{ name: "Amir Faisal Karimullah", url: "https://amirfaisalkarimullah.my.id" }],
  openGraph: {
    title: "Amir Faisal Karimullah Foundation",
    description: "Teknologi untuk Kemanusiaan, Modal untuk Kemandirian.",
    url: "https://amirfaisalkarimullah.my.id",
    siteName: "AFK Foundation",
    locale: "id_ID",
    type: "website",
  },
  metadataBase: new URL("https://amirfaisalkarimullah.my.id"),
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
