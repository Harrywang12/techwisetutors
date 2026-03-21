import { redirect } from "next/navigation";
import { supabase } from "./db";
import { getSession } from "./session";

export async function requireVolunteer() {
  const id = await getSession("volunteer");
  if (!id) redirect("/volunteer/login");

  const { data: volunteer } = await supabase
    .from("volunteers")
    .select("*")
    .eq("id", id)
    .single();

  if (!volunteer || volunteer.status !== "active") redirect("/volunteer/login");

  return volunteer;
}

export async function requireAdmin() {
  const id = await getSession("admin");
  if (!id) redirect("/volunteer/login");

  const { data: admin } = await supabase
    .from("admins")
    .select("*")
    .eq("id", id)
    .single();

  if (!admin) redirect("/volunteer/login");

  return admin;
}
