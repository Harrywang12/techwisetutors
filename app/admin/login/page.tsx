import { AdminLoginForm } from "@/app/admin/login/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <main className="bg-gradient-to-b from-blue-50 via-white to-white">
      <section className="mx-auto max-w-lg px-4 py-12">
        <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Admin Login
          </h1>
          <p className="mt-3 text-slate-700">
            Sign in to review applications, approve hours, manage bookings, and
            create schedules.
          </p>
          <div className="mt-6">
            <AdminLoginForm />
          </div>
        </div>
      </section>
    </main>
  );
}

