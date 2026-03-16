import { prisma } from "@/app/lib/db";
import { requireSession } from "@/app/lib/requireAuth";
import { VolunteerPortalNav } from "@/app/volunteer/portal/VolunteerPortalNav";
import { HoursForm } from "@/app/volunteer/hours/HoursForm";
import { ReviewStatus } from "@prisma/client";

export default async function VolunteerHoursPage() {
  const session = await requireSession();

  const logs = await prisma.hourLog.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
  });

  const byStatus = (status: ReviewStatus) => logs.filter((l) => l.status === status);

  const render = (items: typeof logs) => (
    <div className="mt-3 grid gap-3">
      {items.length ? (
        items.map((h) => (
          <div key={h.id} className="rounded-2xl border border-blue-100 bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="font-extrabold text-slate-900">
                {h.hours.toFixed(1)} hr • {h.activityType}
              </div>
              <div className="text-xs font-extrabold text-blue-800">{h.status}</div>
            </div>
            <div className="mt-1 text-sm text-slate-700">
              {h.date.toLocaleDateString()} • {h.location}
            </div>
            <div className="mt-2 text-sm text-slate-700">{h.notes}</div>
            {h.adminNote ? (
              <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                <span className="font-extrabold">Admin note:</span> {h.adminNote}
              </div>
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
            <h1 className="text-2xl font-extrabold text-slate-900">Log volunteer hours</h1>
            <p className="mt-2 text-slate-700">
              Submitted hours go into a <span className="font-extrabold">pending approval</span>{" "}
              queue until an admin approves them.
            </p>
            <div className="mt-6">
              <HoursForm />
            </div>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-900">My hours</h2>

            <div className="mt-6">
              <div className="text-sm font-extrabold text-slate-900">Pending</div>
              {render(byStatus(ReviewStatus.PENDING))}

              <div className="mt-6 text-sm font-extrabold text-slate-900">Approved</div>
              {render(byStatus(ReviewStatus.APPROVED))}

              <div className="mt-6 text-sm font-extrabold text-slate-900">Rejected</div>
              {render(byStatus(ReviewStatus.REJECTED))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

