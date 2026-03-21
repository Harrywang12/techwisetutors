import { requireAdmin } from "../../lib/requireAuth";
import { supabase } from "../../lib/db";
import AdminNav from "../AdminNav";
import { Users, Mail, GraduationCap, Clock } from "lucide-react";
import { toggleVolunteerStatus } from "./actions";

export default async function AdminVolunteersPage() {
  await requireAdmin();

  const { data: volunteersData } = await supabase
    .from("volunteers")
    .select("*")
    .order("created_at", { ascending: false });

  // For each volunteer, get their hour logs and assignment counts
  const volunteers = await Promise.all(
    (volunteersData || []).map(async (v) => {
      const [{ data: approvedHours }, { count: logCount }, { count: assignmentCount }] = await Promise.all([
        supabase.from("hour_logs").select("hours").eq("volunteer_id", v.id).eq("status", "approved"),
        supabase.from("hour_logs").select("*", { count: "exact", head: true }).eq("volunteer_id", v.id),
        supabase.from("schedule_assignments").select("*", { count: "exact", head: true }).eq("volunteer_id", v.id),
      ]);

      return {
        ...v,
        approvedHoursTotal: (approvedHours || []).reduce((sum, h) => sum + h.hours, 0),
        logCount: logCount || 0,
        assignmentCount: assignmentCount || 0,
      };
    })
  );

  return (
    <>
      <AdminNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">Manage Volunteers</h1>
          <p className="text-gray-500 mt-1">{volunteers.length} registered volunteer{volunteers.length !== 1 ? "s" : ""}.</p>
        </div>

        {volunteers.length === 0 ? (
          <div className="card text-center py-12">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No registered volunteers yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {volunteers.map((v) => (
              <div key={v.id} className="card">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-primary-700 font-bold text-lg">{v.full_name[0]}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{v.full_name}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mt-1">
                        <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {v.email}</span>
                        <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5" /> {v.school} — {v.grade}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {v.availability}</span>
                      </div>
                      <div className="flex gap-4 mt-2 text-xs">
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">{v.approvedHoursTotal}h approved</span>
                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">{v.logCount} logs</span>
                        <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full font-medium">{v.assignmentCount} assignments</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      v.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {v.status}
                    </span>
                    <form action={async () => { "use server"; await toggleVolunteerStatus(v.id, v.status === "active" ? "inactive" : "active"); }}>
                      <button type="submit" className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                        v.status === "active"
                          ? "bg-red-50 text-red-600 hover:bg-red-100"
                          : "bg-green-50 text-green-600 hover:bg-green-100"
                      }`}>
                        {v.status === "active" ? "Deactivate" : "Activate"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
