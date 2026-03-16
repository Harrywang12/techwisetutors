import { requireAdmin } from "@/app/lib/requireAuth";
import { AdminNav } from "@/app/admin/AdminNav";
import { prisma } from "@/app/lib/db";
import { UserRole } from "@prisma/client";
import { assignVolunteer, createShift, unassignVolunteer } from "@/app/admin/schedule/actions";

export default async function AdminSchedulePage() {
  await requireAdmin();

  const [shifts, volunteers] = await Promise.all([
    prisma.shift.findMany({
      include: { assignments: { include: { user: true } } },
      orderBy: { startAt: "asc" },
      take: 50,
    }),
    prisma.user.findMany({
      where: { role: UserRole.VOLUNTEER, isActive: true },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <main className="bg-gradient-to-b from-blue-50 via-white to-white">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <AdminNav />

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-extrabold text-slate-900">Manage Schedule</h1>
            <p className="mt-2 text-slate-700">
              Create upcoming event shifts and assign volunteers. Volunteers will see assignments in their dashboard.
            </p>

            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <div className="text-sm font-extrabold text-slate-900">Create shift</div>
              <form action={createShift} className="mt-3 grid gap-3">
                <input
                  name="title"
                  required
                  placeholder="Shift title (e.g., Retirement Home Workshop)"
                  className="h-10 rounded-2xl border border-blue-100 bg-white px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="grid gap-1">
                    <span className="text-xs font-semibold text-slate-700">Start</span>
                    <input
                      type="datetime-local"
                      name="startAt"
                      required
                      className="h-10 rounded-2xl border border-blue-100 bg-white px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </label>
                  <label className="grid gap-1">
                    <span className="text-xs font-semibold text-slate-700">End</span>
                    <input
                      type="datetime-local"
                      name="endAt"
                      required
                      className="h-10 rounded-2xl border border-blue-100 bg-white px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </label>
                </div>
                <input
                  name="location"
                  required
                  placeholder="Location (or Online)"
                  className="h-10 rounded-2xl border border-blue-100 bg-white px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                <textarea
                  name="details"
                  rows={3}
                  placeholder="Details (optional)"
                  className="rounded-2xl border border-blue-100 bg-white p-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                <button className="h-10 rounded-2xl bg-blue-600 text-sm font-extrabold text-white hover:bg-blue-700">
                  Create shift
                </button>
              </form>
            </div>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-900">Upcoming shifts</h2>
            <div className="mt-4 grid gap-4">
              {shifts.length ? (
                shifts.map((s) => (
                  <div key={s.id} className="rounded-2xl border border-blue-100 bg-white p-4">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div className="font-extrabold text-slate-900">{s.title}</div>
                      <div className="text-xs font-extrabold text-blue-800">
                        {s.startAt.toLocaleString()}
                      </div>
                    </div>
                    <div className="mt-1 text-sm text-slate-700">
                      Location: <span className="font-semibold">{s.location}</span>
                    </div>
                    {s.details ? (
                      <div className="mt-2 text-sm text-slate-600 whitespace-pre-wrap">
                        {s.details}
                      </div>
                    ) : null}

                    <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <div className="text-xs font-extrabold text-slate-900">Assigned volunteers</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {s.assignments.length ? (
                          s.assignments.map((a) => (
                            <form key={a.id} action={unassignVolunteer}>
                              <input type="hidden" name="shiftId" value={s.id} />
                              <input type="hidden" name="userId" value={a.userId} />
                              <button className="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-extrabold text-blue-800 hover:bg-blue-50">
                                {a.user.name} (remove)
                              </button>
                            </form>
                          ))
                        ) : (
                          <div className="text-xs font-semibold text-slate-700">
                            None assigned yet.
                          </div>
                        )}
                      </div>

                      <form action={assignVolunteer} className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                        <input type="hidden" name="shiftId" value={s.id} />
                        <select
                          name="userId"
                          className="h-10 flex-1 rounded-2xl border border-blue-100 bg-white px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                          defaultValue={volunteers[0]?.id ?? ""}
                        >
                          {volunteers.map((v) => (
                            <option key={v.id} value={v.id}>
                              {v.name} ({v.email})
                            </option>
                          ))}
                        </select>
                        <button className="h-10 rounded-2xl bg-emerald-600 px-4 text-sm font-extrabold text-white hover:bg-emerald-700">
                          Assign
                        </button>
                      </form>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-slate-700">
                  No shifts created yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

