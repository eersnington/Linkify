"use server";

import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

import { prisma } from "@/lib/db";
import { userNameSchema } from "@/lib/validations/user";

export type FormData = {
  firstName: string;
  lastName: string;
};

export async function updateUserName(userId: string, data: FormData) {
  try {
    const session = await currentUser();

    if (!session || session?.id !== userId) {
      throw new Error("Unauthorized");
    }

    const { firstName, lastName } = userNameSchema.parse(data);

    // Update the user name.
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        firstName,
        lastName,
      },
    });

    revalidatePath("/dashboard/settings");
    return { status: "success" };
  } catch (error) {
    // console.log(error)
    return { status: "error" };
  }
}
