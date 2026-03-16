import { requireAdmin } from "@/app/lib/requireAuth";
import { AdminNav } from "@/app/admin/AdminNav";
import { prisma } from "@/app/lib/db";
import { createShiftFromBooking, updateBookingNotes } from "@/app/admin/bookings/actions";

export default async function AdminBookingsPage() {
  await requireAdmin();

  const now = new Date();
  const [upcoming, past] = await Promise.all([
    prisma.booking.findMany({
      where: { scheduledAt: { gte: now } },
      include: { shift: true },
      orderBy: { scheduledAt: "asc" },
    }),
    prisma.booking.findMany({
      where: { scheduledAt: { lt: now } },
      include: { shift: true },
      orderBy: { scheduledAt: "desc" },
    }),
  ]);

  const render = (items: typeof upcoming) => (
    <div className="mt-4 grid gap-4">
      {items.length ? (
        items.map((b) => (
          <div key={b.id} className="rounded-2xl border border-blue-100 bg-white p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-base font-extrabold text-slate-900">
                  {b.requesterName} • {b.staffMember}
                </div>
                <div className="text-sm font-semibold text-slate-700">
                  {b.requesterEmail} • {b.scheduledAt.toLocaleString()}
                </div>
              </div>
              <div className="text-xs font-extrabold text-blue-800">
                {b.shift ? "SHIFT CREATED" : "NO SHIFT"}
              </div>
            </div>

            <div className="mt-3 text-sm text-slate-700">
              <span className="font-extrabold">Help with:</span> {b.helpWith}
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <form action={updateBookingNotes} className="grid gap-2">
                <input type="hidden" name="id" value={b.id} />
                <label className="grid gap-1">
                  <span className="text-sm font-semibold text-slate-700">
                    Admin notes
                  </span>
                  <textarea
                    name="adminNotes"
                    rows={3}
                    defaultValue={b.adminNotes ?? ""}
                    className="rounded-2xl border border-blue-100 bg-white p-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </label>
                <button className="h-10 rounded-2xl border border-blue-200 bg-blue-50 text-sm font-extrabold text-blue-900 hover:bg-blue-100">
                  Save notes
                </button>
              </form>

              <form action={createShiftFromBooking} className="grid gap-2">
                <input type="hidden" name="bookingId" value={b.id} />
                <label className="grid gap-1">
                  <span className="text-sm font-semibold text-slate-700">
                    Create a shift for volunteers
                  </span>
                  <input
                    name="location"
                    defaultValue="TBD"
                    className="h-10 rounded-2xl border border-blue-100 bg-white px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </label>
                <button
                  disabled={!!b.shift}
                  className="h-10 rounded-2xl bg-emerald-600 text-sm font-extrabold text-white hover:bg-emerald-700 disabled:opacity-60"
                >
                  {b.shift ? "Shift already created" : "Create shift"}
                </button>
                <div className="text-xs font-semibold text-slate-600">
                  This creates a 1-hour shift starting at the booking time and links it to the booking.
                </div>
              </form>
            </div>
          </div>
        ))
      ) : (
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-slate-700">
          No bookings.
        </div>
      )}
    </div>
  );

  return (
    <main className="bg-gradient-to-b from-blue-50 via-white to-white">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <AdminNav />

        <div className="mt-6 grid gap-6">
          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-extrabold text-slate-900">Bookings</h1>
            <p className="mt-2 text-slate-700">
              View booked sessions, add notes, and create linked shifts for volunteer assignments.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-extrabold text-slate-900">Upcoming</h2>
            {render(upcoming)}
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-extrabold text-slate-900">Past</h2>
            {render(past)}
          </div>
        </div>
      </section>
    </main>
  );
}

