"use server";

import { supabase } from "../lib/db";

export async function submitBooking(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const staffMember = formData.get("staffMember") as string;
  const date = formData.get("date") as string;
  const timeSlot = formData.get("timeSlot") as string;
  const helpNeeded = formData.get("helpNeeded") as string;

  if (!name || !email || !staffMember || !date || !timeSlot || !helpNeeded) {
    return { error: "All fields are required." };
  }

  const { error } = await supabase
    .from("bookings")
    .insert({
      name,
      email,
      staff_member: staffMember,
      date,
      time_slot: timeSlot,
      help_needed: helpNeeded,
    });

  if (error) return { error: "Failed to submit booking. Please try again." };

  return { success: true };
}
