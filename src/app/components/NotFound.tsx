import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-16">
      <div className="text-center">
        <h1 className="mb-16 text-[48px] tracking-[0.05em]">404</h1>
        <p className="mb-32 text-[18px] opacity-60">Page not found</p>
        <Link
          to="/"
          className="inline-block px-32 py-16 bg-primary text-primary-foreground text-[14px] tracking-[0.05em] transition-opacity duration-200 hover:opacity-90"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
