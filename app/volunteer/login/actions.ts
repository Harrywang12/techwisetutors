"use server";

import { redirect } from "next/navigation";
import { supabase } from "../../lib/db";
import { verifyPassword } from "../../lib/password";
import { setSession } from "../../lib/session";

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  // Try volunteer login first
  const { data: volunteer } = await supabase
    .from("volunteers")
    .select("*")
    .eq("email", email)
    .single();

  if (volunteer) {
    if (volunteer.status !== "active") {
      return { error: "Your account has been deactivated. Please contact an administrator." };
    }

    if (!verifyPassword(password, volunteer.password)) {
      return { error: "Invalid email or password." };
    }

    await setSession("volunteer", volunteer.id);
    redirect("/volunteer/dashboard");
  }

  // Try admin login
  const { data: admin } = await supabase
    .from("admins")
    .select("*")
    .eq("email", email)
    .single();

  if (admin && verifyPassword(password, admin.password)) {
    await setSession("admin", admin.id);
    redirect("/admin");
  }

  return { error: "Invalid email or password." };
}
