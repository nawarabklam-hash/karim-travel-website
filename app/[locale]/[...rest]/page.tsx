import { notFound } from "next/navigation";

// Sends unknown paths under a locale (e.g. /ar/xyz) to [locale]/not-found.tsx
export default function CatchAll() {
  notFound();
}
