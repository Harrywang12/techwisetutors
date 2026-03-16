import { requireAdmin } from "@/app/lib/requireAuth";
import { AdminNav } from "@/app/admin/AdminNav";
import { prisma } from "@/app/lib/db";
import { ReviewStatus } from "@prisma/client";

export default async function AdminDashboardPage() {
  await requireAdmin();

  const [pendingApps, pendingHours, upcomingBookings] = await Promise.all([
    prisma.volunteerApplication.count({ where: { status: ReviewStatus.PENDING } }),
    prisma.hourLog.count({ where: { status: ReviewStatus.PENDING } }),
    prisma.booking.count({
      where: { scheduledAt: { gte: new Date() } },
    }),
  ]);

  return (
    <main className="bg-gradient-to-b from-blue-50 via-white to-white">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <AdminNav />

        <div className="mt-6 rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-slate-700">
            Review volunteer applications, approve hours, manage bookings, and
            assign schedules.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { k: "Pending applications", v: pendingApps },
              { k: "Pending hour logs", v: pendingHours },
              { k: "Upcoming bookings", v: upcomingBookings },
            ].map((x) => (
              <div
                key={x.k}
                className="rounded-2xl border border-blue-100 bg-blue-50 p-4"
              >
                <div className="text-sm font-semibold text-slate-700">{x.k}</div>
                <div className="mt-2 text-3xl font-extrabold text-blue-800">
                  {x.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

