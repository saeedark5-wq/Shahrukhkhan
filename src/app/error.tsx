"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500/20 to-red-800/20 flex items-center justify-center mx-auto mb-6">
          <span className="text-red-400 text-4xl font-bold font-heading">!</span>
        </div>
        <h1 className="font-heading text-3xl font-bold text-white mb-3">
          Something went wrong
        </h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          An unexpected error occurred. Please try again or contact us if the
          problem persists.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-black font-semibold rounded-sm hover:bg-gold-light transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
