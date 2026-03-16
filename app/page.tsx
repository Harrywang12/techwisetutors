import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-blue-50 via-white to-white">
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1 text-sm font-semibold text-blue-700">
              Youth-led • Senior-focused • Community-based
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              TechWiseTutors
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-700">
              A youth-led nonprofit helping seniors build digital confidence
              through compassionate tech support.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book"
                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                Book a Session
              </Link>
              <Link
                href="/volunteer"
                className="inline-flex items-center justify-center rounded-2xl border border-blue-200 bg-white px-5 py-3 text-base font-semibold text-blue-700 hover:bg-blue-50"
              >
                Become a Volunteer
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { k: "50+", v: "Volunteers" },
                { k: "Community", v: "Partnerships" },
                { k: "Senior-first", v: "Digital literacy support" },
              ].map((s) => (
                <div
                  key={s.v}
                  className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm"
                >
                  <div className="text-2xl font-extrabold text-blue-700">
                    {s.k}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-700">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="rounded-2xl bg-blue-50 p-6">
              <h2 className="text-xl font-bold text-slate-900">
                What we help with
              </h2>
              <ul className="mt-4 grid gap-2 text-slate-700 sm:grid-cols-2">
                {[
                  "Phones & tablets",
                  "Laptops & computers",
                  "Email & messaging",
                  "Apps & digital tools",
                  "Online safety",
                  "Scam awareness",
                ].map((x) => (
                  <li
                    key={x}
                    className="rounded-xl border border-blue-100 bg-white px-3 py-2 text-sm font-semibold"
                  >
                    {x}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                Patient, accessible, and senior-friendly—available in-person and
                through community partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm md:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900">Our impact</h2>
            <p className="mt-2 text-slate-700">
              Growing support across local communities through tutoring, senior
              workshops, and outreach.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { k: "50+ volunteers", v: "Youth-led, service-driven team" },
                {
                  k: "Community partnerships",
                  v: "Cities, schools, nonprofits & care homes",
                },
                { k: "Senior tech tutoring", v: "1-on-1 compassionate support" },
                { k: "Workshops & outreach", v: "Hands-on learning events" },
              ].map((x) => (
                <div
                  key={x.k}
                  className="rounded-2xl border border-blue-100 bg-blue-50 p-4"
                >
                  <div className="font-extrabold text-blue-800">{x.k}</div>
                  <div className="mt-1 text-sm font-semibold text-slate-700">
                    {x.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Testimonials</h2>
            <div className="mt-4 rounded-2xl border border-blue-100 bg-white p-4">
              <p className="text-slate-700">
                “The residents loved it.”
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-600">
                — Tara Singh, Mackenzie Long Term Care Home
              </p>
            </div>
            <div className="mt-3 rounded-2xl border border-blue-100 bg-white p-4">
              <p className="text-slate-700">“Placeholder testimonial.”</p>
              <p className="mt-2 text-sm font-semibold text-slate-600">
                — Community Partner
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-blue-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm font-semibold text-slate-700">
              © {new Date().getFullYear()} TechWiseTutors
            </div>
            <div className="text-sm text-slate-600">
              Contact:{" "}
              <a
                className="font-semibold text-blue-700 hover:underline"
                href="mailto:matthewsingh291@gmail.com"
              >
                matthewsingh291@gmail.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
