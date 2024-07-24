import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { pf_display } from "@/app/fonts";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center space-y-12 px-4 text-center">
      <div className="mx-auto max-w-2xl">
        <div
          className={cn(
            "text-5xl font-bold leading-snug text-slate-200",
            pf_display.className,
          )}
        >
          {"“I setup a portfolio in 5 minutes with Linkify."}
          <br />
          {"It was so easy!” "}
          <span className="mt-4 font-mono text-xl font-bold text-slate-900">
            - Our users
          </span>
        </div>
      </div>
      <div className="w-full max-w-md">
        <Card className="mx-auto w-full max-w-md border-2 border-slate-900 drop-shadow-xl">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>
              {" "}
              We&apos;re fetching your LinkedIn profile. Please wait...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mx-auto my-4 flex w-full flex-col items-center gap-5">
              <Skeleton className="mb-2 h-4 w-1/12" />
              <Skeleton className="h-10 w-2/6" />
              <Skeleton className="mb-3 mt-5 h-8 w-1/5" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
