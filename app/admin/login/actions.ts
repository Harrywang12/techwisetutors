"use server";

import { redirect } from "next/navigation";
import { supabase } from "../../lib/db";
import { verifyPassword } from "../../lib/password";
import { setSession } from "../../lib/session";

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const { data: admin } = await supabase
    .from("admins")
    .select("*")
    .eq("email", email)
    .single();

  if (!admin || !verifyPassword(password, admin.password)) {
    return { error: "Invalid email or password." };
  }

  await setSession("admin", admin.id);
  redirect("/admin");
}
