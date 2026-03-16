import { ContactForm } from "@/app/contact/ContactForm";

export default function ContactPage() {
  return (
    <main className="bg-gradient-to-b from-blue-50 via-white to-white">
      <section className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Contact
          </h1>
          <p className="mt-4 text-slate-700">
            For general inquiries, partnerships, or session support:
          </p>
          <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-slate-800">
            Email:{" "}
            <a
              className="font-extrabold text-blue-700 hover:underline"
              href="mailto:matthewsingh291@gmail.com"
            >
              matthewsingh291@gmail.com
            </a>
          </div>

          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}

