"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { Badge } from "./ui/badge";

const OnboardCard = ({
  email,
  name,
  imageUrl,
}: {
  email: string;
  name: string;
  imageUrl: string;
}) => {
  const router = useRouter();
  return (
    <Card className="mx-auto w-full max-w-md border-2 border-slate-900 drop-shadow-xl">
      <CardHeader>
        <CardTitle>User Information</CardTitle>
        <CardDescription>
          Please verify the following information to continue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center space-y-4 ">
          <Image
            src={imageUrl}
            alt={name}
            width={64}
            height={64}
            className="rounded-full ring-2"
          />
          <Badge>{name}</Badge>
          <Label>{email}</Label>
          <div className="space-y-2">
            <Label className="text-lg">Is this your LinkedIn account?</Label>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-center gap-14">
          <Button
            variant="outline"
            onClick={() => {
              router.push("/");
            }}
          >
            No that&apos;s not me
          </Button>
          <Button
            onClick={() => {
              router.push("/onboard/mypage?email=" + email);
            }}
          >
            Yes
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OnboardCard;
