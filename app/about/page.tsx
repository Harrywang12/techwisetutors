export default function AboutPage() {
  return (
    <main className="bg-gradient-to-b from-blue-50 via-white to-white">
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            About TechWiseTutors
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-700">
            TechWiseTutors is a <span className="font-extrabold">youth-led nonprofit</span>{" "}
            focused on bridging the digital divide for seniors through compassionate,
            patient, and accessible technology support. We’re supported by{" "}
            <span className="font-extrabold">50+ volunteers</span>.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              "1-on-1 tech support",
              "Help with phones, tablets, laptops, apps, email, and digital tools",
              "Online safety and scam awareness",
              "In-person and community-based support",
              "A compassionate, patient, and accessible approach",
            ].map((x) => (
              <div
                key={x}
                className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-slate-800"
              >
                {x}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

