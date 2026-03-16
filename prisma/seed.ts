import "dotenv/config";
import { PrismaClient, UserRole } from "@prisma/client";
import { hashPassword } from "../app/lib/password";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail) throw new Error("ADMIN_EMAIL is not set");
  if (!adminPassword) throw new Error("ADMIN_PASSWORD is not set");

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (existing) {
    await prisma.user.update({
      where: { id: existing.id },
      data: { role: UserRole.ADMIN, isActive: true },
    });
    return;
  }

  await prisma.user.create({
    data: {
      role: UserRole.ADMIN,
      isActive: true,
      name: "Admin",
      email: adminEmail,
      passwordHash: await hashPassword(adminPassword),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

