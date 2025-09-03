import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://proformcladdingsupplies.co.uk";
const siteName = "Proform Cladding Supplies";
const title = "Proform Cladding Supplies — Coming Soon";
const description =
  "Premium cladding, trims, and fixings. Fast UK delivery. Launching January 5, 2026.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: siteName,
  keywords: [
    "cladding supplies",
    "cladding sheets",
    "roofing sheets",
    "trims and flashings",
    "construction materials",
    "UK delivery",
  ],
  authors: [{ name: siteName }],
  themeColor: "#ffffff",
  colorScheme: "light",
  viewport:
    "width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title,
    description,
    locale: "en_GB",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Proform Cladding Supplies — Coming Soon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        // Body gets the light base background via globals.css variables
        // Safe-area insets are used in the page component
      >
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteName,
              url: siteUrl,
              logo: `${siteUrl}/icon-512.png`,
            }),
          }}
        />
      </body>
    </html>
  );
}
