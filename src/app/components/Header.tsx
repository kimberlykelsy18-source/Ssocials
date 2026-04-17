import { Link, useLocation } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { useContentStore } from "../store/contentStore";
import headerBg from "../../assests/header-nav-bg.jpg";

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { navItems } = useContentStore();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className="sticky top-0 z-50 border-b border-primary-foreground/10"
      style={{
        backgroundImage: `url(${headerBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay to keep header dark and readable */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(3,35,77,0.92) 0%, rgba(2,29,64,0.90) 60%, rgba(1,21,40,0.95) 100%)" }} />

      {/* Subtle top accent line */}
      <div className="relative h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(196,203,214,0.4), transparent)" }} />

      <div className="relative max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 mr-8">
            <Logo className="text-primary-foreground" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 ml-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[11px] tracking-[0.1em] transition-all duration-200 whitespace-nowrap pb-0.5 ${
                  isActive(item.path)
                    ? "text-primary-foreground border-b border-primary-foreground/60"
                    : "text-primary-foreground/55 hover:text-primary-foreground"
                }`}
              >
                {item.name.toUpperCase()}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -mr-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-primary-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-primary-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 md:top-20 z-40 overflow-y-auto" style={{ background: "linear-gradient(180deg, #03234d 0%, #021d40 100%)" }}>
          {/* Decorative divider */}
          <div className="h-[1px] opacity-20" style={{ background: "linear-gradient(90deg, transparent, #c4cbd6, transparent)" }} />
          <nav className="min-h-full flex flex-col justify-center py-6 px-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-4 px-4 text-[13px] tracking-[0.12em] transition-all duration-200 text-center flex-shrink-0 border-b border-primary-foreground/10 ${
                  isActive(item.path)
                    ? "text-primary-foreground"
                    : "text-primary-foreground/50 hover:text-primary-foreground"
                }`}
              >
                {item.name.toUpperCase()}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
