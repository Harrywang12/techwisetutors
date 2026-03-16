import Link from "next/link";
import { LoginForm } from "@/app/volunteer/login/LoginForm";

export default function VolunteerLoginPage() {
  return (
    <main className="bg-gradient-to-b from-blue-50 via-white to-white">
      <section className="mx-auto max-w-lg px-4 py-12">
        <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Volunteer Login
          </h1>
          <p className="mt-3 text-slate-700">
            Approved volunteers can sign in to view schedules and log hours.
          </p>

          <div className="mt-6">
            <LoginForm />
          </div>

          <div className="mt-6 text-sm text-slate-700">
            Need an account?{" "}
            <Link className="font-semibold text-blue-700 hover:underline" href="/volunteer/register">
              Create one (after approval)
            </Link>
            .
          </div>
        </div>
      </section>
    </main>
  );
}

