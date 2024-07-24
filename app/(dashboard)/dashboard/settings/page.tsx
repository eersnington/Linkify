import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import { prisma } from "@/lib/db";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { UserNameForm } from "@/components/forms/user-name-form";

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
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
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <UserNameForm user={userDb} />
      </div>
    </DashboardShell>
  );
}
