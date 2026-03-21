import { Users, UserCheck, Clock, BookOpen, Calendar, AlertCircle } from "lucide-react";
import { requireAdmin } from "../lib/requireAuth";
import { supabase } from "../lib/db";
import AdminNav from "./AdminNav";
import Link from "next/link";

export default async function AdminDashboardPage() {
  await requireAdmin();

  const today = new Date().toISOString().split("T")[0];

  const [
    { count: pendingApps },
    { count: totalVolunteers },
    { count: pendingHours },
    { count: totalBookings },
    { count: upcomingEvents },
    { data: recentBookings },
  ] = await Promise.all([
    supabase.from("volunteer_applications").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("volunteers").select("*", { count: "exact", head: true }),
    supabase.from("hour_logs").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("bookings").select("*", { count: "exact", head: true }),
    supabase.from("schedule_events").select("*", { count: "exact", head: true }).gte("date", today),
    supabase.from("bookings").select("*").order("created_at", { ascending: false }).limit(5),
  ]);

  const stats = [
    { label: "Pending Applications", value: pendingApps || 0, icon: UserCheck, color: "bg-yellow-50 text-yellow-600", href: "/admin/applications" },
    { label: "Active Volunteers", value: totalVolunteers || 0, icon: Users, color: "bg-blue-50 text-blue-600", href: "/admin/volunteers" },
    { label: "Pending Hours", value: pendingHours || 0, icon: Clock, color: "bg-orange-50 text-orange-600", href: "/admin/hours" },
    { label: "Total Bookings", value: totalBookings || 0, icon: BookOpen, color: "bg-green-50 text-green-600", href: "/admin/bookings" },
    { label: "Upcoming Events", value: upcomingEvents || 0, icon: Calendar, color: "bg-purple-50 text-purple-600", href: "/admin/schedule" },
  ];

  const bookings = recentBookings || [];

  return (
    <>
      <AdminNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">TechWiseTutors management overview.</p>
        </div>

        {/* Action Alerts */}
        {((pendingApps || 0) > 0 || (pendingHours || 0) > 0) && (
          <div className="mb-8 space-y-3">
            {(pendingApps || 0) > 0 && (
              <Link href="/admin/applications" className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl hover:bg-yellow-100 transition-colors">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <span className="text-yellow-800 font-medium text-sm">{pendingApps} volunteer application{pendingApps !== 1 ? "s" : ""} waiting for review</span>
              </Link>
            )}
            {(pendingHours || 0) > 0 && (
              <Link href="/admin/hours" className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-200 rounded-xl hover:bg-orange-100 transition-colors">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <span className="text-orange-800 font-medium text-sm">{pendingHours} hour log{pendingHours !== 1 ? "s" : ""} waiting for approval</span>
              </Link>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
          {stats.map((stat) => (
            <Link key={stat.label} href={stat.href} className="card hover:border-primary-200">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
            <Link href="/admin/bookings" className="text-primary-600 text-sm font-semibold hover:text-primary-700">View All</Link>
          </div>
          {bookings.length === 0 ? (
            <p className="text-gray-500 text-sm py-4">No bookings yet.</p>
          ) : (
            <div className="space-y-3">
              {bookings.map((b) => (
                <div key={b.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{b.name}</div>
                    <div className="text-gray-500 text-xs">{b.date} at {b.time_slot} with {b.staff_member}</div>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    b.status === "confirmed" ? "bg-green-100 text-green-700" :
                    b.status === "completed" ? "bg-blue-100 text-blue-700" :
                    b.status === "cancelled" ? "bg-red-100 text-red-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
