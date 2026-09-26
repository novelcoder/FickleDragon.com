import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fickledragon.com"),
  title: "Fickle Dragon Publishing",
  description:
    "Independent science fiction, fantasy, and mysteries from Jamie McFarlane and Mac Worden.",
  icons: {
    icon: [
      {
        url: "/images/brand/fickle-dragon-favicon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/images/brand/fickle-dragon-favicon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/images/brand/fickle-dragon-favicon-512.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#9e3f2e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
