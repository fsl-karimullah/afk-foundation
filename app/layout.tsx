import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amir Faisal Karimullah Foundation | Filantropi Berbasis Inovasi Digital",
  description:
    "Gerakan filantropi personal dari sebagian gaji dan penghasilan usaha Amir Faisal Karimullah. Membagikan stimulus Rp200rb/bulan untuk pendidikan, modal usaha mandiri, dan kebutuhan mendesak.",
  keywords: [
    "filantropi",
    "pendidikan",
    "bantuan sosial",
    "Amir Faisal Karimullah",
    "stimulus modal",
    "kebutuhan mendesak",
    "teknologi kemanusiaan",
    "filantropi mandiri",
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
  icons: {
    icon: "/afk-logo.png",
    shortcut: "/afk-logo.png",
    apple: "/afk-logo.png",
  },
};

export default function RootLayout({
  children,
 }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="icon" href="/afk-logo.png" />
        <link rel="shortcut icon" href="/afk-logo.png" />
        <link rel="apple-touch-icon" href="/afk-logo.png" />
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
