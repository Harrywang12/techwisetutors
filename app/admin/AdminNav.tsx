import Link from "next/link";
import { adminLogout } from "@/app/admin/actions";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/applications", label: "Volunteer Applications" },
  { href: "/admin/volunteers", label: "Volunteer Accounts" },
  { href: "/admin/hours", label: "Approve Hours" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/schedule", label: "Schedule" },
];

export function AdminNav() {
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
      </div>
      <form action={adminLogout}>
        <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          Log out
        </button>
      </form>
    </div>
  );
}

