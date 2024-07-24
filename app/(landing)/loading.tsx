import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex w-full flex-col gap-16 py-8 md:py-8">
      <section className="container flex flex-col items-center">
        <div className="mx-auto flex w-full flex-col items-center gap-5">
          <Skeleton className="mb-2 h-4 w-1/12" />
          <Skeleton className="h-10 w-2/6" />
          <Skeleton className="mb-3 mt-5 h-8 w-1/5" />
        </div>
      </section>
      <section className="container flex flex-col items-center">
        <div className="mx-auto flex w-full flex-col items-center gap-5">
          <Skeleton className="mb-2 h-4 w-1/12" />
          <Skeleton className="h-10 w-2/6" />
          <Skeleton className="mb-3 mt-5 h-8 w-1/5" />
        </div>
      </section>
      <section className="container flex flex-col items-center">
        <div className="mx-auto flex w-full flex-col items-center gap-5">
          <Skeleton className="mb-2 h-4 w-1/12" />
          <Skeleton className="h-10 w-2/6" />
          <Skeleton className="mb-3 mt-5 h-8 w-1/5" />
        </div>
      </section>
      <hr className="container" />
    </div>
  );
}
