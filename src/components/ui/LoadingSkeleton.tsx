export function PropertyCardSkeleton() {
  return (
    <div className="bg-card border border-card-border rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-gray-800" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-800 rounded w-3/4" />
        <div className="h-3 bg-gray-800 rounded w-1/2" />
        <div className="h-6 bg-gray-800 rounded w-1/3" />
        <div className="h-3 bg-gray-800 rounded w-full" />
      </div>
    </div>
  );
}

export function PropertyDetailsSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="aspect-[16/9] bg-gray-800 rounded-xl" />
      <div className="space-y-3">
        <div className="h-8 bg-gray-800 rounded w-2/3" />
        <div className="h-4 bg-gray-800 rounded w-1/3" />
        <div className="h-6 bg-gray-800 rounded w-1/4" />
        <div className="h-4 bg-gray-800 rounded w-full" />
        <div className="h-4 bg-gray-800 rounded w-full" />
        <div className="h-4 bg-gray-800 rounded w-3/4" />
      </div>
    </div>
  );
}
