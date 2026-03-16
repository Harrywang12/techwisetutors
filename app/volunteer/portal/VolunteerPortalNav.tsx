import Link from "next/link";
import { logout } from "@/app/volunteer/portal/actions";

export function VolunteerPortalNav(props: { role: "ADMIN" | "VOLUNTEER" }) {
  const links = [
    { href: "/volunteer/dashboard", label: "Dashboard" },
    { href: "/volunteer/schedule", label: "My Schedule" },
    { href: "/volunteer/hours", label: "My Hours" },
    { href: "/volunteer/profile", label: "My Profile" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-blue-100 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap gap-2">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-100"
          >
            {l.label}
          </Link>
        ))}
        {props.role === "ADMIN" ? (
          <Link
            href="/admin"
            className="rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-900 hover:bg-indigo-100"
          >
            Admin Portal
          </Link>
        ) : null}
      </div>
      <form action={logout}>
        <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          Log out
        </button>
      </form>
    </div>
  );
}

