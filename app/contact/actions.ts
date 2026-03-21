"use server";

import { supabase } from "../lib/db";

export async function submitContactMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "All fields are required." };
  }

  const { error } = await supabase
    .from("contact_messages")
    .insert({ name, email, message });

  if (error) return { error: "Failed to send message. Please try again." };

  return { success: true };
}
