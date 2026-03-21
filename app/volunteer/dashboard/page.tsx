import { Clock, CheckCircle2, Calendar, Activity } from "lucide-react";
import { requireVolunteer } from "../../lib/requireAuth";
import { supabase } from "../../lib/db";
import VolunteerPortalNav from "../portal/VolunteerPortalNav";

export default async function VolunteerDashboardPage() {
  const volunteer = await requireVolunteer();

  const { data: hourLogs } = await supabase
    .from("hour_logs")
    .select("*")
    .eq("volunteer_id", volunteer.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const { data: allHours } = await supabase
    .from("hour_logs")
    .select("hours")
    .eq("volunteer_id", volunteer.id);

  const { data: approvedHoursData } = await supabase
    .from("hour_logs")
    .select("hours")
    .eq("volunteer_id", volunteer.id)
    .eq("status", "approved");

  const totalLogged = (allHours || []).reduce((sum, h) => sum + h.hours, 0);
  const totalApproved = (approvedHoursData || []).reduce((sum, h) => sum + h.hours, 0);

  const { data: assignments } = await supabase
    .from("schedule_assignments")
    .select("id, event_id, schedule_events(*)")
    .eq("volunteer_id", volunteer.id);

  type EventData = { title: string; date: string; start_time: string; end_time: string; location: string };

  const mapped = (assignments || [])
    .filter((a) => a.schedule_events)
    .map((a) => ({ ...a, event: a.schedule_events as unknown as EventData }));

  const sortedAssignments = mapped.sort((a, b) => a.event.date.localeCompare(b.event.date));

  const upcomingEvents = sortedAssignments
    .filter((a) => a.event.date >= new Date().toISOString().split("T")[0])
    .slice(0, 5);

  return (
    <>
      <VolunteerPortalNav volunteerName={volunteer.full_name} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">
            Welcome back, {volunteer.full_name.split(" ")[0]}!
          </h1>
          <p className="text-gray-500 mt-1">Here&apos;s your volunteer overview.</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{totalLogged}</div>
                <div className="text-sm text-gray-500">Total Hours Logged</div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{totalApproved}</div>
                <div className="text-sm text-gray-500">Approved Hours</div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{upcomingEvents.length}</div>
                <div className="text-sm text-gray-500">Upcoming Shifts</div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{(hourLogs || []).length}</div>
                <div className="text-sm text-gray-500">Recent Activities</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upcoming Sessions */}
          <div className="card">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary-600" /> Upcoming Sessions
            </h2>
            {upcomingEvents.length === 0 ? (
              <p className="text-gray-500 text-sm py-4">No upcoming sessions assigned.</p>
            ) : (
              <div className="space-y-3">
                {upcomingEvents.map((a) => (
                    <div key={a.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                        <Calendar className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{a.event.title}</div>
                        <div className="text-gray-500 text-xs">
                          {a.event.date} &middot; {a.event.start_time} - {a.event.end_time}
                        </div>
                        <div className="text-gray-500 text-xs">{a.event.location}</div>
                      </div>
                    </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary-600" /> Recent Hour Logs
            </h2>
            {(hourLogs || []).length === 0 ? (
              <p className="text-gray-500 text-sm py-4">No hours logged yet.</p>
            ) : (
              <div className="space-y-3">
                {(hourLogs || []).map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{log.activity_type}</div>
                      <div className="text-gray-500 text-xs">{log.date} &middot; {log.location}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900 text-sm">{log.hours}h</div>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        log.status === "approved" ? "bg-green-100 text-green-700" :
                        log.status === "rejected" ? "bg-red-100 text-red-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {log.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
