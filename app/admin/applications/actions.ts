"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "../../lib/db";

export async function approveApplication(id: string) {
  await supabase
    .from("volunteer_applications")
    .update({ status: "approved" })
    .eq("id", id);
  revalidatePath("/admin/applications");
}

export async function rejectApplication(id: string) {
  await supabase
    .from("volunteer_applications")
    .update({ status: "rejected" })
    .eq("id", id);
  revalidatePath("/admin/applications");
}
