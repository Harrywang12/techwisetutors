"use server";

import { redirect } from "next/navigation";
import { supabase } from "../../lib/db";
import { hashPassword } from "../../lib/password";
import { setSession } from "../../lib/session";

export async function registerVolunteer(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!email || !password || !confirmPassword) {
    return { error: "All fields are required." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  // Check if email has an approved application
  const { data: application } = await supabase
    .from("volunteer_applications")
    .select("*")
    .eq("email", email)
    .eq("status", "approved")
    .limit(1)
    .maybeSingle();

  if (!application) {
    return { error: "No approved application found for this email. Please apply first and wait for approval." };
  }

  // Check if account already exists
  const { data: existing } = await supabase
    .from("volunteers")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existing) {
    return { error: "An account with this email already exists. Please log in instead." };
  }

  const { data: volunteer, error } = await supabase
    .from("volunteers")
    .insert({
      email,
      password: hashPassword(password),
      full_name: application.full_name,
      school: application.school,
      grade: application.grade,
      availability: application.availability,
      application_id: application.id,
    })
    .select("id")
    .single();

  if (error || !volunteer) {
    return { error: "Failed to create account. Please try again." };
  }

  await setSession("volunteer", volunteer.id);
  redirect("/volunteer/dashboard");
}
