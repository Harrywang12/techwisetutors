import { Calendar, MapPin, Clock } from "lucide-react";
import { requireVolunteer } from "../../lib/requireAuth";
import { supabase } from "../../lib/db";
import VolunteerPortalNav from "../portal/VolunteerPortalNav";

export default async function VolunteerSchedulePage() {
  const volunteer = await requireVolunteer();

  const { data: assignments } = await supabase
    .from("schedule_assignments")
    .select("id, event_id, schedule_events(*)")
    .eq("volunteer_id", volunteer.id);

  type EventData = { title: string; date: string; start_time: string; end_time: string; location: string; description: string };

  const mapped = (assignments || [])
    .filter((a) => a.schedule_events)
    .map((a) => ({ ...a, event: a.schedule_events as unknown as EventData }));

  const sorted = mapped.sort((a, b) => a.event.date.localeCompare(b.event.date));

  const today = new Date().toISOString().split("T")[0];
  const upcoming = sorted.filter((a) => a.event.date >= today);
  const past = sorted.filter((a) => a.event.date < today);

  return (
    <>
      <VolunteerPortalNav volunteerName={volunteer.full_name} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">My Schedule</h1>
          <p className="text-gray-500 mt-1">View your assigned tutoring sessions and events.</p>
        </div>

        {/* Upcoming */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Upcoming Sessions</h2>
          {upcoming.length === 0 ? (
            <div className="card text-center py-12">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No upcoming sessions assigned yet.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((a) => (
                  <div key={a.id} className="card border-l-4 border-primary-500">
                    <h3 className="font-bold text-gray-900 text-lg mb-3">{a.event.title}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {a.event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {a.event.start_time} - {a.event.end_time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {a.event.location}
                      </div>
                    </div>
                    {a.event.description && (
                      <p className="text-gray-500 text-sm mt-3 pt-3 border-t border-gray-100">
                        {a.event.description}
                      </p>
                    )}
                  </div>
              ))}
            </div>
          )}
        </div>

        {/* Past */}
        {past.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Past Sessions</h2>
            <div className="space-y-3">
              {past.map((a) => (
                  <div key={a.id} className="card !p-4 flex items-center justify-between opacity-70">
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{a.event.title}</div>
                      <div className="text-gray-500 text-xs">
                        {a.event.date} &middot; {a.event.location}
                      </div>
                    </div>
                    <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      Completed
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
