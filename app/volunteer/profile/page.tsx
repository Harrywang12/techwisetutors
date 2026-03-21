import { User } from "lucide-react";
import { requireVolunteer } from "../../lib/requireAuth";
import VolunteerPortalNav from "../portal/VolunteerPortalNav";
import ProfileForm from "./ProfileForm";

export default async function VolunteerProfilePage() {
  const volunteer = await requireVolunteer();

  return (
    <>
      <VolunteerPortalNav volunteerName={volunteer.full_name} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">My Profile</h1>
          <p className="text-gray-500 mt-1">Update your personal information.</p>
        </div>

        {/* Profile Card */}
        <div className="card mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center">
            <User className="w-8 h-8 text-primary-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{volunteer.full_name}</h2>
            <p className="text-gray-500 text-sm">{volunteer.email}</p>
            <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              {volunteer.status}
            </span>
          </div>
        </div>

        <ProfileForm
          profile={{
            fullName: volunteer.full_name,
            email: volunteer.email,
            school: volunteer.school,
            grade: volunteer.grade,
            availability: volunteer.availability,
          }}
        />
      </div>
    </>
  );
}
