import { requireAdmin } from "@/app/lib/requireAuth";
import { AdminNav } from "@/app/admin/AdminNav";
import { prisma } from "@/app/lib/db";
import { ReviewStatus } from "@prisma/client";
import { approveApplication, rejectApplication } from "@/app/admin/applications/actions";

export default async function AdminApplicationsPage() {
  await requireAdmin();

  const apps = await prisma.volunteerApplication.findMany({
    orderBy: { createdAt: "desc" },
  });

  const section = (title: string, status: ReviewStatus) => {
    const items = apps.filter((a) => a.status === status);
    return (
      <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-extrabold text-slate-900">{title}</h2>
          <div className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-extrabold text-blue-800">
            {items.length}
          </div>
        </div>
        <div className="mt-4 grid gap-4">
          {items.length ? (
            items.map((a) => (
              <div key={a.id} className="rounded-2xl border border-blue-100 bg-white p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-base font-extrabold text-slate-900">
                      {a.fullName}
                    </div>
                    <div className="text-sm font-semibold text-slate-700">
                      {a.email} • {a.school} • Grade {a.grade}
                    </div>
                    <div className="mt-1 text-xs font-semibold text-slate-600">
                      Submitted {a.createdAt.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-xs font-extrabold text-blue-800">{a.status}</div>
                </div>

                <div className="mt-3 grid gap-2 text-sm text-slate-700">
                  <div>
                    <span className="font-extrabold">Why volunteer:</span> {a.whyVolunteer}
                  </div>
                  <div>
                    <span className="font-extrabold">Tech experience:</span> {a.techExperience}
                  </div>
                  <div>
                    <span className="font-extrabold">Availability:</span> {a.availability}
                  </div>
                  <div>
                    <span className="font-extrabold">Past volunteering:</span>{" "}
                    {a.pastVolunteerExperience}
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <form action={approveApplication} className="grid gap-2 sm:col-span-1">
                    <input type="hidden" name="id" value={a.id} />
                    <input
                      name="note"
                      placeholder="Optional note"
                      className="h-10 rounded-2xl border border-blue-100 bg-white px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                      defaultValue={a.reviewNotes ?? ""}
                    />
                    <button className="h-10 rounded-2xl bg-emerald-600 text-sm font-extrabold text-white hover:bg-emerald-700">
                      Approve
                    </button>
                  </form>

                  <form action={rejectApplication} className="grid gap-2 sm:col-span-1">
                    <input type="hidden" name="id" value={a.id} />
                    <input
                      name="note"
                      placeholder="Optional note"
                      className="h-10 rounded-2xl border border-blue-100 bg-white px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                      defaultValue={a.reviewNotes ?? ""}
                    />
                    <button className="h-10 rounded-2xl bg-rose-600 text-sm font-extrabold text-white hover:bg-rose-700">
                      Reject
                    </button>
                  </form>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs font-semibold text-slate-700 sm:col-span-1">
                    <div className="font-extrabold">Account rule</div>
                    <div className="mt-1">
                      Volunteer can create/login only after approval.
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-slate-700">
              No items.
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <main className="bg-gradient-to-b from-blue-50 via-white to-white">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <AdminNav />

        <div className="mt-6 grid gap-6">
          {section("Pending volunteer applications", ReviewStatus.PENDING)}
          <div className="grid gap-6 md:grid-cols-2">
            {section("Approved", ReviewStatus.APPROVED)}
            {section("Rejected", ReviewStatus.REJECTED)}
          </div>
        </div>
      </section>
    </main>
  );
}

