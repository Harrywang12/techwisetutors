import { requireAdmin } from "@/app/lib/requireAuth";
import { AdminNav } from "@/app/admin/AdminNav";
import { prisma } from "@/app/lib/db";
import { ReviewStatus } from "@prisma/client";
import { approveHourLog, rejectHourLog } from "@/app/admin/hours/actions";

export default async function AdminHoursPage() {
  await requireAdmin();

  const pending = await prisma.hourLog.findMany({
    where: { status: ReviewStatus.PENDING },
    include: { user: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <main className="bg-gradient-to-b from-blue-50 via-white to-white">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <AdminNav />

        <div className="mt-6 rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-2xl font-extrabold text-slate-900">
              Pending Hours Approval
            </h1>
            <div className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-extrabold text-blue-800">
              {pending.length}
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {pending.length ? (
              pending.map((h) => (
                <div key={h.id} className="rounded-2xl border border-blue-100 bg-white p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-base font-extrabold text-slate-900">
                        {h.user.name} • {h.hours.toFixed(1)} hr • {h.activityType}
                      </div>
                      <div className="text-sm font-semibold text-slate-700">
                        {h.user.email} • {h.date.toLocaleDateString()} • {h.location}
                      </div>
                      <div className="mt-2 text-sm text-slate-700">{h.notes}</div>
                    </div>
                    <div className="text-xs font-extrabold text-blue-800">{h.status}</div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <form action={approveHourLog} className="grid gap-2">
                      <input type="hidden" name="id" value={h.id} />
                      <input
                        name="note"
                        placeholder="Optional note"
                        className="h-10 rounded-2xl border border-blue-100 bg-white px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                      />
                      <button className="h-10 rounded-2xl bg-emerald-600 text-sm font-extrabold text-white hover:bg-emerald-700">
                        Approve
                      </button>
                    </form>

                    <form action={rejectHourLog} className="grid gap-2">
                      <input type="hidden" name="id" value={h.id} />
                      <input
                        name="note"
                        placeholder="Optional note"
                        className="h-10 rounded-2xl border border-blue-100 bg-white px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                      />
                      <button className="h-10 rounded-2xl bg-rose-600 text-sm font-extrabold text-white hover:bg-rose-700">
                        Reject
                      </button>
                    </form>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-slate-700">
                No pending hour logs.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

