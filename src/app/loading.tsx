import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="h-10 bg-white/5 rounded-xl w-48 animate-pulse" />
      <LoadingSkeleton />
    </div>
  );
}