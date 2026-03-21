import { requireAdmin } from "../../lib/requireAuth";
import { supabase } from "../../lib/db";
import AdminNav from "../AdminNav";
import { BookOpen, Calendar, Clock, User, Mail, HelpCircle } from "lucide-react";
import { updateBookingStatus } from "./actions";

export default async function AdminBookingsPage() {
  await requireAdmin();

  const { data: bookingsData } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  const bookings = bookingsData || [];

  return (
    <>
      <AdminNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">Manage Bookings</h1>
          <p className="text-gray-500 mt-1">{bookings.length} total booking{bookings.length !== 1 ? "s" : ""}.</p>
        </div>

        {bookings.length === 0 ? (
          <div className="card text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No bookings yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div key={b.id} className="card">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{b.name}</h3>
                        <div className="text-gray-500 text-xs flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {b.email}
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gray-400" /><span className="text-gray-600">{b.date}</span></div>
                      <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-gray-400" /><span className="text-gray-600">{b.time_slot}</span></div>
                      <div className="flex items-center gap-2"><User className="w-4 h-4 text-gray-400" /><span className="text-gray-600">Tutor: {b.staff_member}</span></div>
                    </div>

                    <div className="mt-3 flex items-start gap-2 text-sm">
                      <HelpCircle className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                      <span className="text-gray-600">{b.help_needed}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      b.status === "confirmed" ? "bg-green-100 text-green-700" :
                      b.status === "completed" ? "bg-blue-100 text-blue-700" :
                      b.status === "cancelled" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {b.status}
                    </span>

                    <form action={async () => { "use server"; await updateBookingStatus(b.id, "confirmed"); }}>
                      <button type="submit" className="text-xs font-medium px-3 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                        Confirm
                      </button>
                    </form>
                    <form action={async () => { "use server"; await updateBookingStatus(b.id, "completed"); }}>
                      <button type="submit" className="text-xs font-medium px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                        Complete
                      </button>
                    </form>
                    <form action={async () => { "use server"; await updateBookingStatus(b.id, "cancelled"); }}>
                      <button type="submit" className="text-xs font-medium px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
                        Cancel
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
