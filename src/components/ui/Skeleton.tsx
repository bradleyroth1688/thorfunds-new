// Skeleton loading components for smooth loading states

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div 
      className={`skeleton animate-pulse bg-gray-200 dark:bg-navy-700 rounded ${className}`}
      aria-hidden="true"
    />
  );
}

export function SkeletonText({ className = "" }: SkeletonProps) {
  return <Skeleton className={`h-4 w-full ${className}`} />;
}

export function SkeletonTitle({ className = "" }: SkeletonProps) {
  return <Skeleton className={`h-8 w-3/4 ${className}`} />;
}

export function SkeletonParagraph({ lines = 3, className = "" }: SkeletonProps & { lines?: number }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonText 
          key={i} 
          className={i === lines - 1 ? "w-2/3" : "w-full"} 
        />
      ))}
    </div>
  );
}

export function SkeletonAvatar({ size = "md", className = "" }: SkeletonProps & { size?: "sm" | "md" | "lg" | "xl" }) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  };
  
  return <Skeleton className={`rounded-full ${sizeClasses[size]} ${className}`} />;
}

export function SkeletonCard({ className = "" }: SkeletonProps) {
  return (
    <div className={`card space-y-4 ${className}`}>
      <Skeleton className="h-48 w-full rounded-lg" />
      <SkeletonTitle />
      <SkeletonParagraph lines={2} />
    </div>
  );
}

export function SkeletonFundCard({ className = "" }: SkeletonProps) {
  return (
    <div className={`card space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <SkeletonParagraph lines={2} />
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="text-center space-y-2">
            <Skeleton className="h-8 w-16 mx-auto" />
            <Skeleton className="h-3 w-12 mx-auto" />
          </div>
        ))}
      </div>
      <div className="flex gap-4 pt-4">
        <Skeleton className="h-10 flex-1 rounded-lg" />
        <Skeleton className="h-10 flex-1 rounded-lg" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 4, className = "" }: SkeletonProps & { rows?: number; cols?: number }) {
  return (
    <div className={`overflow-hidden rounded-lg border border-gray-200 dark:border-navy-700 ${className}`}>
      {/* Header */}
      <div className="bg-gray-50 dark:bg-navy-800 px-4 py-3 border-b border-gray-200 dark:border-navy-700">
        <div className="flex gap-4">
          {Array.from({ length: cols }).map((_, i) => (
            <Skeleton key={i} className="h-4 flex-1" />
          ))}
        </div>
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div 
          key={rowIndex}
          className="px-4 py-4 border-b border-gray-100 dark:border-navy-700 last:border-b-0"
        >
          <div className="flex gap-4">
            {Array.from({ length: cols }).map((_, colIndex) => (
              <Skeleton key={colIndex} className="h-4 flex-1" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonPodcastCard({ className = "" }: SkeletonProps) {
  return (
    <div className={`card flex gap-4 ${className}`}>
      <Skeleton className="h-24 w-24 rounded-lg flex-shrink-0" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <SkeletonParagraph lines={2} />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default Skeleton;
