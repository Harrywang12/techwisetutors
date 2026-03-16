import { BookingForm } from "@/app/book/BookingForm";
import { getStaffMembers } from "@/app/book/actions";

function formatSlotLabel(d: Date) {
  const weekday = d.toLocaleDateString(undefined, { weekday: "long" });
  const date = d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  const time = d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  return `${weekday} • ${date} • ${time}`;
}

function generateSlots() {
  const slots: { value: string; label: string }[] = [];
  const now = new Date();

  const daysToGenerate = 21;
  const slotHours = (d: Date) => {
    const day = d.getDay(); // 0 Sun ... 6 Sat
    const isWeekend = day === 0 || day === 6;
    if (isWeekend) {
      // 12pm to 7pm
      return [12, 13, 14, 15, 16, 17, 18];
    }
    // Mon-Fri after 5pm
    return [17, 18, 19, 20];
  };

  for (let i = 0; i < daysToGenerate; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    d.setMinutes(0, 0, 0);

    for (const hour of slotHours(d)) {
      const slot = new Date(d);
      slot.setHours(hour, 0, 0, 0);
      if (slot.getTime() < now.getTime() + 60 * 60 * 1000) continue; // at least 1 hour from now
      slots.push({ value: slot.toISOString(), label: formatSlotLabel(slot) });
    }
  }
  return slots;
}

export default async function BookPage() {
  const staffMembers = await getStaffMembers();
  const slots = generateSlots();

  return (
    <main className="bg-gradient-to-b from-blue-50 via-white to-white">
      <section className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Book a Session
          </h1>
          <p className="mt-3 text-slate-700">
            Schedule a tech support session with TechWiseTutors. We offer
            senior-friendly help with phones, tablets, laptops, apps, email, and
            online safety.
          </p>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-slate-700">
            Availability: Monday–Friday after 5:00 PM • Saturday–Sunday 12:00 PM
            to 7:00 PM
          </div>

          <div className="mt-6">
            <BookingForm staffMembers={staffMembers} slots={slots} />
          </div>
        </div>
      </section>
    </main>
  );
}

