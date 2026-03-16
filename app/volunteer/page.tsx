import Link from "next/link";
import { VolunteerApplicationForm } from "@/app/volunteer/VolunteerApplicationForm";

export default function VolunteerPage() {
  return (
    <main className="bg-gradient-to-b from-blue-50 via-white to-white">
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2 md:items-start">
          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Join Our Volunteer Team
            </h1>
            <p className="mt-3 text-slate-700">
              Help seniors and community members learn technology through
              compassionate 1-on-1 support and community-based outreach.
            </p>

            <div className="mt-6 grid gap-3">
              {[
                "Gain community service hours",
                "Develop leadership and communication skills",
                "Make a meaningful impact",
                "Support seniors with technology",
              ].map((x) => (
                <div
                  key={x}
                  className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-slate-800"
                >
                  {x}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-900">
              Submitting this form does <span className="font-extrabold">not</span>{" "}
              create an active volunteer account. An administrator must approve
              your application first.
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Link
                href="/volunteer/login"
                className="inline-flex h-11 items-center justify-center rounded-2xl border border-blue-200 bg-white px-5 text-base font-semibold text-blue-700 hover:bg-blue-50"
              >
                Volunteer Login
              </Link>
              <Link
                href="/volunteer/register"
                className="inline-flex h-11 items-center justify-center rounded-2xl bg-blue-600 px-5 text-base font-semibold text-white hover:bg-blue-700"
              >
                Create Account (after approval)
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Volunteer Sign Up / Application
            </h2>
            <p className="mt-2 text-slate-700">
              Tell us a bit about you. We’ll review your application and follow
              up by email.
            </p>
            <div className="mt-6">
              <VolunteerApplicationForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

