// app/[userDomain]/page.tsx

import { notFound } from "next/navigation";

import UserPageContent from "./_component/user-page-content";
import { prisma } from "@/lib/db";
import { getStoredProfile } from "@/actions/get-linkedin-profile";
import { ThemeTemplateProvider } from "@/context/editor-sidebar-context";

export async function generateMetadata({
  params,
}: {
  params: { userDomain: string };
}) {
  const website = await prisma.website.findUnique({
    where: { domainName: params.userDomain },
  });

  console.log(website)

  if (!website) {
    return {
      title: "Page Not Found",
    };
  }

  if (website.firstName?.length == 0 || website.firstName == null) {
    return {
      title: `${website.domainName}'s Page`,
      description: `Welcome to ${website.domainName}'s personal page`,
    };
  }

  return {
    title: `${website.firstName}'s Page`,
    description: `Welcome to ${website.firstName}'s personal page`,
  };
}

export default async function UserPage({
  params,
}: {
  params: { userDomain: string };
}) {
  const website = await prisma.website.findUnique({
    where: { domainName: params.userDomain },
  });

  if (!website) {
    notFound();
  }

  const { data: profile } = await getStoredProfile(website.userEmail);

  if (!profile) {
    notFound();
  }

  return <ThemeTemplateProvider>
    <UserPageContent profile={profile} templateId={website.template} />
  </ThemeTemplateProvider>;
}
