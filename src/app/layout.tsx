import type { ReactNode } from "react";
import "./globals.css";

/**
 * Root layout. The <html> and <body> tags live in app/[lang]/layout.tsx
 * so each locale sets its own `lang` attribute.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
