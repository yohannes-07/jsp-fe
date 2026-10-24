import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CirWork — Find work that fits",
    template: "%s | CirWork",
  },
  description:
    "An AI-native job search platform that helps people discover better-fit roles and move forward with confidence.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full w-full antialiased">
      <body className="min-h-full w-full overflow-x-hidden bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
