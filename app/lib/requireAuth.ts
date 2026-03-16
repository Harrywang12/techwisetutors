import { redirect } from "next/navigation";
import { getSession } from "@/app/lib/session";

export async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/volunteer/login");
  return session;
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") redirect("/admin/login");
  return session;
}

