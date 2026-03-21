"use server";

import { redirect } from "next/navigation";
import { clearSession } from "../lib/session";

export async function logoutAdmin() {
  await clearSession("admin");
  redirect("/volunteer/login");
}
