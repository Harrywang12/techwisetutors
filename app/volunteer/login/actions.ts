"use server";

import { redirect } from "next/navigation";
import { supabase } from "../../lib/db";
import { verifyPassword } from "../../lib/password";
import { setSession } from "../../lib/session";

export async function loginVolunteer(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const { data: volunteer } = await supabase
    .from("volunteers")
    .select("*")
    .eq("email", email)
    .single();

  if (!volunteer) {
    return { error: "Invalid email or password." };
  }

  if (volunteer.status !== "active") {
    return { error: "Your account has been deactivated. Please contact an administrator." };
  }

  const valid = verifyPassword(password, volunteer.password);
  if (!valid) {
    return { error: "Invalid email or password." };
  }

  await setSession("volunteer", volunteer.id);
  redirect("/volunteer/dashboard");
}
