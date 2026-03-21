"use server";

import { redirect } from "next/navigation";
import { clearSession } from "../../lib/session";

export async function logoutVolunteer() {
  await clearSession("volunteer");
  redirect("/volunteer/login");
}
