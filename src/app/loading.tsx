export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {/* Animated Thor logo/spinner */}
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-navy-700"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gold-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-navy-600 animate-spin-slow"></div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
          Loading...
        </p>
      </div>
    </div>
  );
}
