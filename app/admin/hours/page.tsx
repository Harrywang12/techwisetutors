import { requireAdmin } from "../../lib/requireAuth";
import { supabase } from "../../lib/db";
import AdminNav from "../AdminNav";
import { Clock, CheckCircle, XCircle, User } from "lucide-react";
import { approveHours, rejectHours } from "./actions";

export default async function AdminHoursPage() {
  await requireAdmin();

  const { data: hourLogsData } = await supabase
    .from("hour_logs")
    .select("*, volunteers(full_name, email)")
    .order("created_at", { ascending: false });

  const hourLogs = (hourLogsData || []).map((log) => ({
    ...log,
    volunteer: log.volunteers as { full_name: string; email: string },
  }));

  const pending = hourLogs.filter((h) => h.status === "pending");
  const reviewed = hourLogs.filter((h) => h.status !== "pending");

  return (
    <>
      <AdminNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">Approve Volunteer Hours</h1>
          <p className="text-gray-500 mt-1">Review and approve submitted volunteer hour logs.</p>
        </div>

        {/* Pending */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-600" /> Pending Hours ({pending.length})
          </h2>
          {pending.length === 0 ? (
            <div className="card text-center py-12">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No pending hour logs.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pending.map((log) => (
                <div key={log.id} className="card border-l-4 border-yellow-400">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-primary-600" />
                        </div>
                        <div>
                          <span className="font-bold text-gray-900">{log.volunteer.full_name}</span>
                          <span className="text-gray-500 text-xs ml-2">{log.volunteer.email}</span>
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2 text-sm">
                        <div><span className="font-medium text-gray-700">Date:</span> <span className="text-gray-600">{log.date}</span></div>
                        <div><span className="font-medium text-gray-700">Hours:</span> <span className="text-gray-600 font-bold">{log.hours}h</span></div>
                        <div><span className="font-medium text-gray-700">Activity:</span> <span className="text-gray-600">{log.activity_type}</span></div>
                        <div><span className="font-medium text-gray-700">Location:</span> <span className="text-gray-600">{log.location}</span></div>
                      </div>
                      {log.notes && <p className="text-gray-500 text-sm mt-2">{log.notes}</p>}
                    </div>

                    <div className="flex lg:flex-col gap-2 shrink-0">
                      <form action={async () => { "use server"; await approveHours(log.id); }}>
                        <button type="submit" className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors w-full justify-center">
                          <CheckCircle className="w-4 h-4" /> Approve
                        </button>
                      </form>
                      <form action={async () => { "use server"; await rejectHours(log.id); }}>
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
            <h2 className="text-lg font-bold text-gray-900 mb-4">Reviewed Hour Logs ({reviewed.length})</h2>
            <div className="space-y-3">
              {reviewed.map((log) => (
                <div key={log.id} className="card !p-4 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{log.volunteer.full_name}</div>
                    <div className="text-gray-500 text-xs">{log.date} &middot; {log.hours}h &middot; {log.activity_type}</div>
                    {log.admin_notes && <div className="text-xs text-primary-600 mt-1">Note: {log.admin_notes}</div>}
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    log.status === "approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {log.status}
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
