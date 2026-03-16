import { requireAdmin } from "@/app/lib/requireAuth";
import { AdminNav } from "@/app/admin/AdminNav";
import { prisma } from "@/app/lib/db";
import { UserRole } from "@prisma/client";
import { activateVolunteer, deactivateVolunteer } from "@/app/admin/volunteers/actions";

export default async function AdminVolunteersPage() {
  await requireAdmin();

  const volunteers = await prisma.user.findMany({
    where: { role: UserRole.VOLUNTEER },
    include: { profile: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="bg-gradient-to-b from-blue-50 via-white to-white">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <AdminNav />

        <div className="mt-6 rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-extrabold text-slate-900">
            Volunteer Accounts
          </h1>
          <p className="mt-2 text-slate-700">
            View approved volunteer accounts and deactivate/reactivate as needed.
          </p>

          <div className="mt-6 grid gap-3">
            {volunteers.length ? (
              volunteers.map((v) => (
                <div
                  key={v.id}
                  className="rounded-2xl border border-blue-100 bg-white p-4"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-base font-extrabold text-slate-900">
                        {v.name}
                      </div>
                      <div className="text-sm font-semibold text-slate-700">
                        {v.email}
                      </div>
                      <div className="mt-1 text-xs font-semibold text-slate-600">
                        {v.profile?.school ? `School: ${v.profile.school} • ` : ""}
                        {v.profile?.availability ? `Availability: ${v.profile.availability}` : ""}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`rounded-full border px-3 py-1 text-xs font-extrabold ${
                          v.isActive
                            ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                            : "border-rose-200 bg-rose-50 text-rose-900"
                        }`}
                      >
                        {v.isActive ? "ACTIVE" : "INACTIVE"}
                      </div>
                      {v.isActive ? (
                        <form action={deactivateVolunteer}>
                          <input type="hidden" name="id" value={v.id} />
                          <button className="h-10 rounded-2xl border border-rose-200 bg-rose-50 px-4 text-sm font-extrabold text-rose-900 hover:bg-rose-100">
                            Deactivate
                          </button>
                        </form>
                      ) : (
                        <form action={activateVolunteer}>
                          <input type="hidden" name="id" value={v.id} />
                          <button className="h-10 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 text-sm font-extrabold text-emerald-900 hover:bg-emerald-100">
                            Reactivate
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-slate-700">
                No volunteer accounts yet.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

