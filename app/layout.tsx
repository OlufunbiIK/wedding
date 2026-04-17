import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amara & Tunde | Traditional Wedding",
  description:
    "Celebrate the traditional wedding of Amara Okafor and Tunde Adeyemi in Lagos on August 9th, 2026.",
  openGraph: {
    title: "Amara & Tunde | Traditional Wedding",
    description:
      "Join us for an Igbo-Yoruba fusion traditional wedding filled with warmth, family, and celebration.",
    siteName: "Amara & Tunde",
    type: "website",
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
