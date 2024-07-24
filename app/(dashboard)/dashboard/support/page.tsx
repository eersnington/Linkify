import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import { prisma } from "@/lib/db";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";

export const metadata = {
  title: "Support",
  description: "Get help with your account.",
};

export default async function SettingsPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/login");
  }

  const userDb = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });

  if (!userDb) {
    redirect("/login");
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Support" text="Get help with your account." />
    </DashboardShell>
  );
}
