import { prisma } from "@/app/lib/db";
import { requireSession } from "@/app/lib/requireAuth";
import { VolunteerPortalNav } from "@/app/volunteer/portal/VolunteerPortalNav";

export default async function VolunteerSchedulePage() {
  const session = await requireSession();
  const now = new Date();

  const upcoming = await prisma.shiftAssignment.findMany({
    where: { userId: session.userId, shift: { startAt: { gte: now } } },
    include: { shift: true },
    orderBy: { shift: { startAt: "asc" } },
  });

  const past = await prisma.shiftAssignment.findMany({
    where: { userId: session.userId, shift: { startAt: { lt: now } } },
    include: { shift: true },
    orderBy: { shift: { startAt: "desc" } },
  });

  const render = (items: typeof upcoming) => (
    <div className="mt-3 grid gap-3">
      {items.length ? (
        items.map((a) => (
          <div
            key={a.id}
            className="rounded-2xl border border-blue-100 bg-white p-4"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div className="font-extrabold text-slate-900">{a.shift.title}</div>
              <div className="text-sm font-semibold text-slate-700">
                {a.shift.startAt.toLocaleString()} –{" "}
                {a.shift.endAt.toLocaleTimeString(undefined, {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </div>
            </div>
            <div className="mt-1 text-sm text-slate-700">
              Location: <span className="font-semibold">{a.shift.location}</span>
            </div>
            {a.shift.details ? (
              <div className="mt-2 text-sm text-slate-600">{a.shift.details}</div>
            ) : null}
          </div>
        ))
      ) : (
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-slate-700">
          Nothing here yet.
        </div>
      )}
    </div>
  );

  return (
    <main className="bg-gradient-to-b from-blue-50 via-white to-white">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <VolunteerPortalNav role={session.role} />

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-extrabold text-slate-900">
              Upcoming schedule
            </h1>
            {render(upcoming)}
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-900">Past</h2>
            {render(past)}
          </div>
        </div>
      </section>
    </main>
  );
}

