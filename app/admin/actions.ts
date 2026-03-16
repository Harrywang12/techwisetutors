"use server";

import { clearSession } from "@/app/lib/session";

export async function adminLogout() {
  await clearSession();
}

