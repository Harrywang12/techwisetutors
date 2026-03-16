import { prisma } from "@/app/lib/db";
import { requireSession } from "@/app/lib/requireAuth";
import { VolunteerPortalNav } from "@/app/volunteer/portal/VolunteerPortalNav";
import { ReviewStatus } from "@prisma/client";

export default async function VolunteerDashboardPage() {
  const session = await requireSession();
  const now = new Date();

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      hourLogs: { orderBy: { createdAt: "desc" }, take: 5 },
    },
  });

  if (!user) return null;

  const totals = await prisma.hourLog.groupBy({
    by: ["status"],
    where: { userId: user.id },
    _sum: { hours: true },
  });

  const sumFor = (status: ReviewStatus) =>
    totals.find((t) => t.status === status)?._sum.hours ?? 0;

  const totalLogged = totals.reduce((acc, t) => acc + (t._sum.hours ?? 0), 0);
  const totalApproved = sumFor(ReviewStatus.APPROVED);

  const upcomingAssignments = await prisma.shiftAssignment.findMany({
    where: { userId: user.id, shift: { startAt: { gt: now } } },
    include: { shift: true },
    orderBy: { shift: { startAt: "asc" } },
    take: 4,
  });
  const upcoming = upcomingAssignments.map((a) => a.shift);

  return (
    <main className="bg-gradient-to-b from-blue-50 via-white to-white">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <VolunteerPortalNav role={session.role} />

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm md:col-span-2">
            <h1 className="text-2xl font-extrabold text-slate-900">
              Welcome, {user.name}
            </h1>
            <p className="mt-2 text-slate-700">
              Here’s your overview, upcoming shifts/sessions, and recent activity.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { k: "Total hours logged", v: totalLogged.toFixed(1) },
                { k: "Total hours approved", v: totalApproved.toFixed(1) },
                { k: "Pending hours", v: sumFor(ReviewStatus.PENDING).toFixed(1) },
              ].map((x) => (
                <div
                  key={x.k}
                  className="rounded-2xl border border-blue-100 bg-blue-50 p-4"
                >
                  <div className="text-sm font-semibold text-slate-700">
                    {x.k}
                  </div>
                  <div className="mt-2 text-3xl font-extrabold text-blue-800">
                    {x.v}
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-8 text-xl font-bold text-slate-900">
              Upcoming shifts / sessions
            </h2>
            <div className="mt-3 grid gap-3">
              {upcoming.length ? (
                upcoming.map((s) => (
                  <div
                    key={s.id}
                    className="rounded-2xl border border-blue-100 bg-white p-4"
                  >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div className="font-extrabold text-slate-900">
                        {s.title}
                      </div>
                      <div className="text-sm font-semibold text-slate-700">
                        {s.startAt.toLocaleString()}
                      </div>
                    </div>
                    <div className="mt-1 text-sm text-slate-700">
                      Location: <span className="font-semibold">{s.location}</span>
                    </div>
                    {s.details ? (
                      <div className="mt-2 text-sm text-slate-600">{s.details}</div>
                    ) : null}
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-slate-700">
                  No upcoming assignments yet.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Recent activity</h2>
            <div className="mt-3 grid gap-3">
              {user.hourLogs.length ? (
                user.hourLogs.map((h) => (
                  <div
                    key={h.id}
                    className="rounded-2xl border border-blue-100 bg-white p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-extrabold text-slate-900">
                        {h.hours.toFixed(1)} hr • {h.activityType}
                      </div>
                      <div className="text-xs font-extrabold text-blue-800">
                        {h.status}
                      </div>
                    </div>
                    <div className="mt-1 text-xs font-semibold text-slate-600">
                      {h.date.toLocaleDateString()} • {h.location}
                    </div>
                    <div className="mt-2 text-sm text-slate-700">{h.notes}</div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-slate-700">
                  No hour logs yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

