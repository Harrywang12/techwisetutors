"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "../../lib/db";

export async function toggleVolunteerStatus(id: string, newStatus: string) {
  await supabase
    .from("volunteers")
    .update({ status: newStatus })
    .eq("id", id);
  revalidatePath("/admin/volunteers");
}
