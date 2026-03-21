"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, UserCheck, Users, Clock, Calendar as Cal, BookOpen, LogOut, Shield } from "lucide-react";
import { logoutAdmin } from "./actions";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/applications", label: "Applications", icon: UserCheck },
  { href: "/admin/volunteers", label: "Volunteers", icon: Users },
  { href: "/admin/hours", label: "Hours", icon: Clock },
  { href: "/admin/bookings", label: "Bookings", icon: BookOpen },
  { href: "/admin/schedule", label: "Schedule", icon: Cal },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="bg-gray-900 text-white sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center gap-1 overflow-x-auto">
            <Shield className="w-4 h-4 text-primary-400 mr-2 shrink-0" />
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                    active ? "bg-primary-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <link.icon className="w-3.5 h-3.5" />
                  {link.label}
                </Link>
              );
            })}
          </div>
          <form action={logoutAdmin}>
            <button type="submit" className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-400 transition-colors ml-4">
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
