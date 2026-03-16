import { prisma } from "@/app/lib/db";
import { requireSession } from "@/app/lib/requireAuth";
import { VolunteerPortalNav } from "@/app/volunteer/portal/VolunteerPortalNav";
import { ProfileForm } from "@/app/volunteer/profile/ProfileForm";

export default async function VolunteerProfilePage() {
  const session = await requireSession();

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: { profile: true },
  });
  if (!user) return null;

  return (
    <main className="bg-gradient-to-b from-blue-50 via-white to-white">
      <section className="mx-auto max-w-3xl px-4 py-10">
        <VolunteerPortalNav role={session.role} />

        <div className="mt-6 rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-extrabold text-slate-900">My Profile</h1>
          <p className="mt-2 text-slate-700">
            Update your basic information. (Email changes require an admin.)
          </p>

          <div className="mt-6">
            <ProfileForm
              name={user.name}
              email={user.email}
              school={user.profile?.school ?? ""}
              availability={user.profile?.availability ?? ""}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

