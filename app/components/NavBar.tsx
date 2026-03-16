import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/partners", label: "Partners" },
  { href: "/book", label: "Book a Session" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/contact", label: "Contact" },
];

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-blue-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl px-2 py-1 font-semibold text-blue-900 hover:bg-blue-50"
        >
          <span className="inline-flex size-8 items-center justify-center rounded-xl bg-blue-600 text-white">
            TW
          </span>
          <span className="hidden sm:inline">TechWiseTutors</span>
        </Link>

        <nav className="hidden flex-wrap items-center justify-end gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-900"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/volunteer/login"
            className="rounded-xl border border-blue-200 bg-white px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
          >
            Volunteer Login
          </Link>
        </div>
      </div>

      <div className="mx-auto block max-w-6xl px-4 pb-3 md:hidden">
        <div className="flex flex-wrap gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-900"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

