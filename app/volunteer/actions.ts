"use server";

import { supabase } from "../lib/db";

export async function submitVolunteerApplication(formData: FormData) {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const school = formData.get("school") as string;
  const grade = formData.get("grade") as string;
  const whyVolunteer = formData.get("whyVolunteer") as string;
  const techExperience = formData.get("techExperience") as string;
  const availability = formData.get("availability") as string;
  const pastExperience = formData.get("pastExperience") as string;

  if (!fullName || !email || !school || !grade || !whyVolunteer || !techExperience || !availability) {
    return { error: "Please fill in all required fields." };
  }

  // Check if already applied
  const { data: existing } = await supabase
    .from("volunteer_applications")
    .select("id")
    .eq("email", email)
    .in("status", ["pending", "approved"])
    .limit(1)
    .maybeSingle();

  if (existing) {
    return { error: "An application with this email already exists." };
  }

  const { error } = await supabase
    .from("volunteer_applications")
    .insert({
      full_name: fullName,
      email,
      school,
      grade,
      why_volunteer: whyVolunteer,
      tech_experience: techExperience,
      availability,
      past_experience: pastExperience || "None",
    });

  if (error) return { error: "Failed to submit application. Please try again." };

  return { success: true };
}
