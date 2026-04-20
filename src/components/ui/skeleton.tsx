import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%]",
        className
      )}
    />
  );
}

export function QuoteCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 flex flex-col gap-4">
      <Skeleton className="h-6 w-24 rounded-full" />
      <Skeleton className="h-10 w-36" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <div className="flex flex-col gap-2 mt-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-10 rounded-xl mt-2" />
      <Skeleton className="h-10 rounded-xl" />
    </div>
  );
}
