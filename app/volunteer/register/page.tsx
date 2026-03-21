import { Monitor } from "lucide-react";
import RegisterForm from "./RegisterForm";

export default function VolunteerRegisterPage() {
  return (
    <section className="min-h-[80vh] flex items-center bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Monitor className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-black text-gray-900">Create Volunteer Account</h1>
          <p className="text-gray-500 mt-1">Only available for approved volunteers</p>
        </div>
        <RegisterForm />
      </div>
    </section>
  );
}
