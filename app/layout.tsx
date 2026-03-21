import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "TechWiseTutors — Bridging the Digital Divide",
  description: "A youth-led nonprofit helping seniors build digital confidence through compassionate tech support.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isVolunteer = !!cookieStore.get("volunteer_session")?.value;
  const isAdmin = !!cookieStore.get("admin_session")?.value;

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-white`}>
        <NavBar isVolunteer={isVolunteer} isAdmin={isAdmin} />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
