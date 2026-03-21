import { createClient } from "@supabase/supabase-js";
import { hashSync } from "bcryptjs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  // Create default admin
  const { data: existing } = await supabase
    .from("admins")
    .select("id")
    .eq("email", "admin@techwisetutors.org")
    .single();

  if (!existing) {
    await supabase.from("admins").insert({
      email: "admin@techwisetutors.org",
      password: hashSync("admin123", 10),
      name: "TechWiseTutors Admin",
    });
  }

  // Create sample schedule events
  await supabase.from("schedule_events").insert([
    {
      title: "Senior Sunrise Workshop",
      date: "2026-03-25",
      start_time: "14:00",
      end_time: "16:00",
      location: "Senior Sunrise Retirement Home",
      description: "Smartphone basics workshop for residents",
    },
    {
      title: "Community Drop-in Session",
      date: "2026-03-28",
      start_time: "12:00",
      end_time: "15:00",
      location: "Richmond Hill Community Centre",
      description: "Open tech help session for community members",
    },
  ]);

  console.log("Database seeded successfully!");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
