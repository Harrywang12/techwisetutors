"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, Clock, User, LogOut } from "lucide-react";
import { logoutVolunteer } from "./actions";

const links = [
  { href: "/volunteer/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/volunteer/schedule", label: "My Schedule", icon: Calendar },
  { href: "/volunteer/hours", label: "My Hours", icon: Clock },
  { href: "/volunteer/profile", label: "My Profile", icon: User },
];

export default function VolunteerPortalNav({ volunteerName }: { volunteerName: string }) {
  const pathname = usePathname();

  return (
    <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-6 overflow-x-auto">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 text-sm font-medium py-4 border-b-2 transition-colors whitespace-nowrap ${
                    active
                      ? "border-primary-600 text-primary-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 hidden sm:block">
              Welcome, <span className="font-semibold text-gray-700">{volunteerName}</span>
            </span>
            <form action={logoutVolunteer}>
              <button type="submit" className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 transition-colors">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
