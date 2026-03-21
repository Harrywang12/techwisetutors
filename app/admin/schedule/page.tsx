import { requireAdmin } from "../../lib/requireAuth";
import { supabase } from "../../lib/db";
import AdminNav from "../AdminNav";
import { Calendar, MapPin, Clock, Plus, Trash2, UserPlus, X } from "lucide-react";
import { createEvent, deleteEvent, assignVolunteer, removeAssignment } from "./actions";

export default async function AdminSchedulePage() {
  await requireAdmin();

  const { data: eventsData } = await supabase
    .from("schedule_events")
    .select("*, schedule_assignments(id, volunteer_id, volunteers(id, full_name))")
    .order("date", { ascending: true });

  const { data: volunteersData } = await supabase
    .from("volunteers")
    .select("id, full_name")
    .eq("status", "active")
    .order("full_name", { ascending: true });

  const events = (eventsData || []).map((e) => ({
    ...e,
    assignments: (e.schedule_assignments || []).map((a: { id: string; volunteer_id: string; volunteers: { id: string; full_name: string } }) => ({
      id: a.id,
      volunteerId: a.volunteer_id,
      volunteer: a.volunteers,
    })),
  }));

  const volunteers = volunteersData || [];

  const today = new Date().toISOString().split("T")[0];
  const upcoming = events.filter((e) => e.date >= today);
  const past = events.filter((e) => e.date < today);

  return (
    <>
      <AdminNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">Manage Schedule</h1>
          <p className="text-gray-500 mt-1">Create events and assign volunteers to shifts.</p>
        </div>

        {/* Create Event Form */}
        <div className="card mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
            <Plus className="w-5 h-5 text-primary-600" /> Create New Event
          </h2>
          <form action={createEvent}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div>
                <label className="label">Event Title *</label>
                <input name="title" type="text" required className="input-field" placeholder="e.g. Community Workshop" />
              </div>
              <div>
                <label className="label">Date *</label>
                <input name="date" type="date" required className="input-field" />
              </div>
              <div>
                <label className="label">Start Time *</label>
                <input name="startTime" type="time" required className="input-field" />
              </div>
              <div>
                <label className="label">End Time *</label>
                <input name="endTime" type="time" required className="input-field" />
              </div>
              <div>
                <label className="label">Location *</label>
                <input name="location" type="text" required className="input-field" placeholder="e.g. Senior Sunrise Retirement Home" />
              </div>
              <div>
                <label className="label">Description</label>
                <input name="description" type="text" className="input-field" placeholder="Optional details" />
              </div>
            </div>
            <button type="submit" className="btn-primary mt-5 !py-2.5 flex items-center gap-2">
              <Plus className="w-4 h-4" /> Create Event
            </button>
          </form>
        </div>

        {/* Upcoming Events */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Upcoming Events ({upcoming.length})</h2>
          {upcoming.length === 0 ? (
            <div className="card text-center py-12">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No upcoming events.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {upcoming.map((event) => {
                const assignedIds = event.assignments.map((a: { volunteerId: string }) => a.volunteerId);
                const available = volunteers.filter((v) => !assignedIds.includes(v.id));

                return (
                  <div key={event.id} className="card border-l-4 border-primary-500">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{event.title}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mt-1">
                          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {event.date}</span>
                          <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {event.start_time} - {event.end_time}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {event.location}</span>
                        </div>
                        {event.description && <p className="text-gray-500 text-sm mt-2">{event.description}</p>}
                      </div>
                      <form action={async () => { "use server"; await deleteEvent(event.id); }}>
                        <button type="submit" className="text-xs font-medium px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1">
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </form>
                    </div>

                    {/* Assigned Volunteers */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 text-sm mb-3">
                        Assigned Volunteers ({event.assignments.length})
                      </h4>

                      {event.assignments.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {event.assignments.map((a: { id: string; volunteer: { full_name: string } }) => (
                            <div key={a.id} className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg text-sm border border-gray-200">
                              <span className="font-medium text-gray-700">{a.volunteer.full_name}</span>
                              <form action={async () => { "use server"; await removeAssignment(a.id); }}>
                                <button type="submit" className="text-gray-400 hover:text-red-500 transition-colors ml-1">
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </form>
                            </div>
                          ))}
                        </div>
                      )}

                      {available.length > 0 && (
                        <form action={async (formData: FormData) => {
                          "use server";
                          const volunteerId = formData.get("volunteerId") as string;
                          if (volunteerId) await assignVolunteer(event.id, volunteerId);
                        }} className="flex items-center gap-2">
                          <select name="volunteerId" className="input-field !py-1.5 text-sm flex-1">
                            <option value="">Assign a volunteer...</option>
                            {available.map((v) => (
                              <option key={v.id} value={v.id}>{v.full_name}</option>
                            ))}
                          </select>
                          <button type="submit" className="flex items-center gap-1 px-3 py-1.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors">
                            <UserPlus className="w-4 h-4" /> Assign
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Past Events */}
        {past.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Past Events ({past.length})</h2>
            <div className="space-y-3">
              {past.map((event) => (
                <div key={event.id} className="card !p-4 flex items-center justify-between opacity-70">
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{event.title}</div>
                    <div className="text-gray-500 text-xs">{event.date} &middot; {event.location} &middot; {event.assignments.length} volunteers</div>
                  </div>
                  <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Past</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
