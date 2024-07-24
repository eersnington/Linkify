// app/[userDomain]/page.tsx

import { notFound } from "next/navigation";
import { getStoredProfile } from "@/actions/get-linkedin-profile";

import { prisma } from "@/lib/db";

import UserPageContent from "./_component/user-page-content";
import { ThemeTemplateProvider } from "@/context/editor-sidebar-context";

export async function generateMetadata({
  params,
}: {
  params: { userDomain: string };
}) {
  const website = await prisma.website.findUnique({
    where: { domainName: params.userDomain },
    include: { user: true },
  });

  if (!website) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: `${website.user.firstName}'s Page`,
    description: `Welcome to ${website.user.firstName}'s personal page`,
  };
}

export default async function UserPage({
  params,
}: {
  params: { userDomain: string };
}) {
  const website = await prisma.website.findUnique({
    where: { domainName: params.userDomain },
    include: { user: true },
  });

  if (!website) {
    notFound();
  }

  const { data: profile } = await getStoredProfile(website.user.email);

  if (!profile) {
    notFound();
  }

  return <ThemeTemplateProvider>
    <UserPageContent profile={profile} templateId={website.template} />
  </ThemeTemplateProvider>;
}
