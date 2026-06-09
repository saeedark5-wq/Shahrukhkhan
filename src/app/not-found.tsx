import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold/30 to-gold-dark/30 flex items-center justify-center mx-auto mb-6">
          <span className="text-gold text-4xl font-bold font-heading">404</span>
        </div>
        <h1 className="font-heading text-3xl font-bold text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          The page you are looking for does not exist or has been moved. Let us
          help you find your dream property instead.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-black font-semibold rounded-sm hover:bg-gold-light transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
