export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-[#0e0f17] border border-white/5 rounded-2xl h-80 flex flex-col justify-between p-4"
        >
          <div className="w-full h-44 bg-white/5 rounded-xl mb-4" />
          <div className="space-y-2">
            <div className="h-5 bg-white/10 rounded w-3/4" />
            <div className="h-4 bg-white/5 rounded w-1/2" />
          </div>
          <div className="flex justify-between items-center mt-4 pt-2 border-t border-white/5">
            <div className="h-4 bg-white/5 rounded w-1/3" />
            <div className="h-8 bg-white/10 rounded-xl w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}