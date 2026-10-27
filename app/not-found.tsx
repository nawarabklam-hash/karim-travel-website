import Link from "next/link";
import arMessages from "@/messages/ar.json";
import enMessages from "@/messages/en.json";
import { fontVariables } from "./fonts";
import "./globals.css";

// Fallback for paths outside any locale (the proxy skips them). Shows both languages.
export default function RootNotFound() {
  return (
    <html lang="ar" dir="rtl" className={`${fontVariables} h-full`}>
      <body className="flex min-h-full items-center justify-center font-sans">
        <section className="flex flex-col items-center gap-6 px-4 py-24 text-center">
          <p className="text-7xl font-bold text-red">404</p>
          <div>
            <h1 className="text-2xl font-bold">{arMessages.notFound.title}</h1>
            <p className="mt-2 text-navy/70">{arMessages.notFound.description}</p>
          </div>
          <div dir="ltr" lang="en">
            <h2 className="text-xl font-bold">{enMessages.notFound.title}</h2>
            <p className="mt-2 text-navy/70">{enMessages.notFound.description}</p>
          </div>
          <div className="flex gap-3">
            <Link href="/ar" className="rounded-md bg-red px-5 py-2.5 font-medium text-white">
              {arMessages.notFound.backHome}
            </Link>
            <Link href="/en" className="rounded-md border border-navy/20 px-5 py-2.5 font-medium">
              {enMessages.notFound.backHome}
            </Link>
          </div>
        </section>
      </body>
    </html>
  );
}
