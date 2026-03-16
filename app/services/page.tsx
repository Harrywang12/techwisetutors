import Link from "next/link";

const services = [
  "1-on-1 tech tutoring",
  "Smartphone support",
  "Computer basics",
  "Email and messaging help",
  "Internet safety and scam awareness",
  "App assistance",
  "Retirement home workshops",
  "Community outreach sessions",
];

export default function ServicesPage() {
  return (
    <main className="bg-gradient-to-b from-blue-50 via-white to-white">
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Programs & Services
          </h1>
          <p className="mt-4 text-slate-700">
            We help seniors build digital confidence with friendly, step-by-step support.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s}
                className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-slate-800"
              >
                {s}
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/book"
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-blue-600 px-5 text-base font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Book a Session
            </Link>
            <Link
              href="/partners"
              className="inline-flex h-11 items-center justify-center rounded-2xl border border-blue-200 bg-white px-5 text-base font-semibold text-blue-700 hover:bg-blue-50"
            >
              View Partners
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

