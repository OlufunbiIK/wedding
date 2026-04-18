import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl ?? "http://localhost:3000"),
  title: "Amara & Tunde | Traditional Wedding",
  description:
    "Celebrate the traditional wedding of Amara Okafor and Tunde Adeyemi in Lagos on August 9th, 2026.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Amara & Tunde | Traditional Wedding",
    description:
      "Join us for an Igbo-Yoruba fusion traditional wedding filled with warmth, family, and celebration.",
    siteName: "Amara & Tunde",
    type: "website",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amara & Tunde | Traditional Wedding",
    description:
      "An elegant microsite for the traditional wedding of Amara Okafor and Tunde Adeyemi.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NG" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
