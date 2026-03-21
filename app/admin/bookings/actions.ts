"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "../../lib/db";

export async function updateBookingStatus(id: string, status: string) {
  await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id);
  revalidatePath("/admin/bookings");
}
