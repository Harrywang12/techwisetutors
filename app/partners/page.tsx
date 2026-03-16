const partners = [
  "Senior Sunrise Retirement Home",
  "Annex Retirement Home",
  "City of Richmond Hill",
  "City of Markham",
  "Mackenzie Long Term Care Home",
  "Hand in Hand NGO",
  "Holy Trinity School (HTS)",
  "L'Arche Daybreak",
  "More coming soon",
];

export default function PartnersPage() {
  return (
    <main className="bg-gradient-to-b from-blue-50 via-white to-white">
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Our Partners
          </h1>
          <p className="mt-4 text-slate-700">
            We work alongside schools, nonprofits, cities, and care homes to bring
            technology education directly to the community.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((p) => (
              <div
                key={p}
                className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm"
              >
                <div className="text-base font-extrabold text-slate-900">{p}</div>
                <div className="mt-2 text-sm font-semibold text-slate-600">
                  Community partner
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

