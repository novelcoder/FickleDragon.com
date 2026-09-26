import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { AnalyticsConsent } from "@/app/ui/analytics-consent";
import { validMeasurementId } from "@/config/analytics.mjs";
import { serializeJsonLd } from "@/config/seo.mjs";
import { organizationJsonLd, rootMetadata } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = rootMetadata;

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
  const measurementId = validMeasurementId(process.env.GA4_MEASUREMENT_ID);

  return (
    <html lang="en">
      <body>
        {children}
        <Suspense fallback={null}>
          <AnalyticsConsent measurementId={measurementId} />
        </Suspense>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
