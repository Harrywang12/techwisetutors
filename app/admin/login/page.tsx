import { Shield } from "lucide-react";
import AdminLoginForm from "./AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <section className="min-h-[80vh] flex items-center bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-black text-gray-900">Admin Portal</h1>
          <p className="text-gray-500 mt-1">TechWiseTutors administration</p>
        </div>
        <AdminLoginForm />
      </div>
    </section>
  );
}
