import type { Metadata } from "next";
import Link from "next/link";
import { FloatingSocialSliver } from "@/components/floating-social-sliver";
import "./globals.css";

export const metadata: Metadata = {
  title: "OEMO | Online Encyclopedia of Mathematical Objects",
  description: "Object-first encyclopedia of mathematical structures, examples, code, relations, and references."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans text-ink antialiased">
        <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-lg bg-ink text-sm font-black text-white">O</span>
              <span>
                <span className="block text-sm font-black tracking-wide">OEMO</span>
                <span className="block text-xs font-semibold text-muted">mathematical objects</span>
              </span>
            </Link>
            <nav className="hidden items-center gap-6 text-sm font-bold text-muted md:flex">
              <Link href="/search" className="hover:text-ink">Search</Link>
              <Link href="/browse/groups" className="hover:text-ink">Groups</Link>
              <Link href="/browse/graphs" className="hover:text-ink">Graphs</Link>
              <Link href="/submit" className="hover:text-ink">Submit</Link>
              <Link href="/admin" className="hover:text-ink">Admin</Link>
            </nav>
          </div>
        </header>
        <FloatingSocialSliver />
        {children}
        <footer className="border-t border-line bg-white/80 px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_1fr_1fr]">
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.14em] text-ink">Disclaimer</h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                OEMO is an educational reference and research-navigation tool. Entries should be checked against
                cited primary sources before use in publication, teaching, engineering, financial, medical, or legal decisions.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.14em] text-ink">Contact</h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                Editorial contact: <a className="font-bold text-ocean hover:underline" href="mailto:contact@oemo.org">contact@oemo.org</a>
                <br />
                Corrections, citations, and source-quality notes are welcome.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.14em] text-ink">Copyright</h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                &copy; 2026 Online Encyclopedia of Mathematical Objects. Original editorial text and design are reserved
                unless otherwise licensed. Mathematical facts, names, and formulas are cited to their respective sources.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
