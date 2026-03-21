import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "../../../lib/db";

export async function GET() {
  const cookieStore = await cookies();
  const volunteerId = cookieStore.get("volunteer_session")?.value;

  if (!volunteerId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data: volunteer } = await supabase
    .from("volunteers")
    .select("full_name")
    .eq("id", volunteerId)
    .single();

  if (!volunteer) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { data: hourLogs } = await supabase
    .from("hour_logs")
    .select("*")
    .eq("volunteer_id", volunteerId)
    .order("created_at", { ascending: false });

  const logs = hourLogs || [];
  const approved = logs.filter((h) => h.status === "approved").reduce((sum, h) => sum + h.hours, 0);
  const pending = logs.filter((h) => h.status === "pending").reduce((sum, h) => sum + h.hours, 0);
  const rejected = logs.filter((h) => h.status === "rejected").reduce((sum, h) => sum + h.hours, 0);

  return NextResponse.json({
    fullName: volunteer.full_name,
    hourLogs: logs.map((h) => ({
      id: h.id,
      date: h.date,
      hours: h.hours,
      activityType: h.activity_type,
      location: h.location,
      notes: h.notes,
      status: h.status,
      adminNotes: h.admin_notes,
    })),
    totalApproved: approved,
    totalPending: pending,
    totalRejected: rejected,
  });
}
