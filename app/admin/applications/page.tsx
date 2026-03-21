import { requireAdmin } from "../../lib/requireAuth";
import { supabase } from "../../lib/db";
import AdminNav from "../AdminNav";
import { UserCheck, CheckCircle, XCircle, Clock, Mail } from "lucide-react";
import { approveApplication, rejectApplication } from "./actions";

export default async function AdminApplicationsPage() {
  await requireAdmin();

  const { data: applications } = await supabase
    .from("volunteer_applications")
    .select("*")
    .order("created_at", { ascending: false });

  const allApps = applications || [];
  const pending = allApps.filter((a) => a.status === "pending");
  const reviewed = allApps.filter((a) => a.status !== "pending");

  return (
    <>
      <AdminNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">Volunteer Applications</h1>
          <p className="text-gray-500 mt-1">Review and manage volunteer applications.</p>
        </div>

        {/* Pending */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-600" /> Pending Applications ({pending.length})
          </h2>
          {pending.length === 0 ? (
            <div className="card text-center py-12">
              <UserCheck className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No pending applications.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pending.map((app) => (
                <div key={app.id} className="card border-l-4 border-yellow-400">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-700 font-bold">{app.full_name[0]}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{app.full_name}</h3>
                          <div className="flex items-center gap-2 text-gray-500 text-xs">
                            <Mail className="w-3 h-3" /> {app.email}
                          </div>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        <div><span className="font-medium text-gray-700">School:</span> <span className="text-gray-600">{app.school}</span></div>
                        <div><span className="font-medium text-gray-700">Grade:</span> <span className="text-gray-600">{app.grade}</span></div>
                        <div><span className="font-medium text-gray-700">Availability:</span> <span className="text-gray-600">{app.availability}</span></div>
                        <div><span className="font-medium text-gray-700">Applied:</span> <span className="text-gray-600">{new Date(app.created_at).toLocaleDateString()}</span></div>
                      </div>

                      <div className="mt-3 space-y-2 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Why volunteer:</span>
                          <p className="text-gray-600 mt-0.5">{app.why_volunteer}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Tech experience:</span>
                          <p className="text-gray-600 mt-0.5">{app.tech_experience}</p>
                        </div>
                        {app.past_experience && app.past_experience !== "None" && (
                          <div>
                            <span className="font-medium text-gray-700">Past experience:</span>
                            <p className="text-gray-600 mt-0.5">{app.past_experience}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex lg:flex-col gap-2 shrink-0">
                      <form action={async () => { "use server"; await approveApplication(app.id); }}>
                        <button type="submit" className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors w-full justify-center">
                          <CheckCircle className="w-4 h-4" /> Approve
                        </button>
                      </form>
                      <form action={async () => { "use server"; await rejectApplication(app.id); }}>
                        <button type="submit" className="flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors w-full justify-center">
                          <XCircle className="w-4 h-4" /> Reject
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reviewed */}
        {reviewed.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Reviewed Applications ({reviewed.length})</h2>
            <div className="space-y-3">
              {reviewed.map((app) => (
                <div key={app.id} className="card !p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-xs">{app.full_name[0]}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{app.full_name}</div>
                      <div className="text-gray-500 text-xs">{app.email} &middot; {app.school}</div>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    app.status === "approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
