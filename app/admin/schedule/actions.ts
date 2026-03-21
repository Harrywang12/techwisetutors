"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "../../lib/db";

export async function createEvent(formData: FormData) {
  const title = formData.get("title") as string;
  const date = formData.get("date") as string;
  const startTime = formData.get("startTime") as string;
  const endTime = formData.get("endTime") as string;
  const location = formData.get("location") as string;
  const description = formData.get("description") as string;

  if (!title || !date || !startTime || !endTime || !location) {
    return;
  }

  await supabase
    .from("schedule_events")
    .insert({
      title,
      date,
      start_time: startTime,
      end_time: endTime,
      location,
      description: description || "",
    });

  revalidatePath("/admin/schedule");
}

export async function deleteEvent(id: string) {
  await supabase
    .from("schedule_events")
    .delete()
    .eq("id", id);
  revalidatePath("/admin/schedule");
}

export async function assignVolunteer(eventId: string, volunteerId: string) {
  await supabase
    .from("schedule_assignments")
    .insert({ event_id: eventId, volunteer_id: volunteerId });
  revalidatePath("/admin/schedule");
}

export async function removeAssignment(id: string) {
  await supabase
    .from("schedule_assignments")
    .delete()
    .eq("id", id);
  revalidatePath("/admin/schedule");
}
