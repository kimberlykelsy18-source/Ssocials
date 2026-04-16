import { Link, useLocation } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { useContentStore } from "../store/contentStore";

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { navItems } = useContentStore();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      {/* Mobile & Desktop Container */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-48 md:h-56">
          {/* Logo - Far Left */}
          <Link to="/" className="flex-shrink-0 mr-8">
            <Logo className="text-primary" />
          </Link>

          {/* Desktop Navigation - Far Right */}
          <nav className="hidden lg:flex items-center gap-16 xl:gap-20 ml-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[12px] tracking-[0.05em] transition-colors duration-200 whitespace-nowrap ${
                  isActive(item.path)
                    ? "text-primary"
                    : "text-primary/60 hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button - Smaller Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -mr-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-20 h-20 text-primary" />
            ) : (
              <Menu className="w-20 h-20 text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Compact with Safe Scrolling */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-48 bg-background z-40 overflow-y-auto">
          <nav className="min-h-full flex flex-col justify-center py-12 px-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-12 px-4 text-[14px] tracking-[0.05em] transition-colors duration-200 text-center flex-shrink-0 ${
                  isActive(item.path)
                    ? "text-primary bg-primary/5"
                    : "text-primary/60 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}