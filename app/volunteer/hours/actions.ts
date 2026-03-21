"use server";

import { supabase } from "../../lib/db";
import { getSession } from "../../lib/session";

export async function submitHourLog(formData: FormData) {
  const volunteerId = await getSession("volunteer");
  if (!volunteerId) return { error: "Not authenticated." };

  const date = formData.get("date") as string;
  const hours = parseFloat(formData.get("hours") as string);
  const activityType = formData.get("activityType") as string;
  const location = formData.get("location") as string;
  const notes = formData.get("notes") as string;

  if (!date || !hours || !activityType || !location) {
    return { error: "Please fill in all required fields." };
  }

  if (hours <= 0 || hours > 24) {
    return { error: "Hours must be between 0 and 24." };
  }

  const { error } = await supabase
    .from("hour_logs")
    .insert({
      volunteer_id: volunteerId,
      date,
      hours,
      activity_type: activityType,
      location,
      notes: notes || "",
    });

  if (error) return { error: "Failed to log hours. Please try again." };

  return { success: true };
}
