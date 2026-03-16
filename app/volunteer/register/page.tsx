import Link from "next/link";
import { RegisterForm } from "@/app/volunteer/register/RegisterForm";

export default function VolunteerRegisterPage() {
  return (
    <main className="bg-gradient-to-b from-blue-50 via-white to-white">
      <section className="mx-auto max-w-lg px-4 py-12">
        <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Create Volunteer Account
          </h1>
          <p className="mt-3 text-slate-700">
            You can create an account only after your volunteer application is
            approved.
          </p>

          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-900">
            Not approved yet?{" "}
            <Link className="underline" href="/volunteer">
              Submit an application
            </Link>{" "}
            first.
          </div>

          <div className="mt-6">
            <RegisterForm />
          </div>

          <div className="mt-6 text-sm text-slate-700">
            Already have an account?{" "}
            <Link className="font-semibold text-blue-700 hover:underline" href="/volunteer/login">
              Sign in
            </Link>
            .
          </div>
        </div>
      </section>
    </main>
  );
}

