import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { Ubuntu } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const ubuntu = Ubuntu({ subsets: ["latin"], weight: "400" });
const lato = Lato({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "OSCA Chapters Program",
  description:
    "Discover local chapters, connect with chapter leads, and join community events.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.png",
        type: "image/png",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" className="bg-background">
        <body className={`${ubuntu.className} font-sans antialiased`}>
          {children}
          {process.env.NODE_ENV === "production" && <Analytics />}
        </body>
      </html>
    </>
  );
}
