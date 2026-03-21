"use server";

import { supabase } from "../../lib/db";
import { getSession } from "../../lib/session";

export async function updateVolunteerProfile(formData: FormData) {
  const volunteerId = await getSession("volunteer");
  if (!volunteerId) return { error: "Not authenticated." };

  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const school = formData.get("school") as string;
  const availability = formData.get("availability") as string;

  if (!fullName || !email || !school || !availability) {
    return { error: "All fields are required." };
  }

  // Check if email is taken by another volunteer
  const { data: existing } = await supabase
    .from("volunteers")
    .select("id")
    .eq("email", email)
    .neq("id", volunteerId)
    .maybeSingle();

  if (existing) {
    return { error: "This email is already in use by another account." };
  }

  const { error } = await supabase
    .from("volunteers")
    .update({
      full_name: fullName,
      email,
      school,
      availability,
    })
    .eq("id", volunteerId);

  if (error) return { error: "Failed to update profile. Please try again." };

  return { success: true };
}
