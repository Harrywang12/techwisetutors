"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "../../lib/db";

export async function approveHours(id: string, adminNotes?: string) {
  await supabase
    .from("hour_logs")
    .update({ status: "approved", admin_notes: adminNotes || null })
    .eq("id", id);
  revalidatePath("/admin/hours");
}

export async function rejectHours(id: string, adminNotes?: string) {
  await supabase
    .from("hour_logs")
    .update({ status: "rejected", admin_notes: adminNotes || null })
    .eq("id", id);
  revalidatePath("/admin/hours");
}
