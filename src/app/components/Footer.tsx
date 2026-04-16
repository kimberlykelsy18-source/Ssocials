import { Link } from "react-router";
import { Logo } from "./Logo";
import { useContentStore } from "../store/contentStore";

export function Footer() {
  const { footerLinks, footerText } = useContentStore();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-32 md:py-40 lg:py-48">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-24 md:gap-32">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-12 md:mb-16">
              <Logo className="text-primary-foreground" />
            </div>
            <p className="text-[12px] md:text-[13px] lg:text-[14px] leading-relaxed opacity-80 max-w-[300px]">
              Building high-converting, premium brand experiences for health, beauty, wellness, and private healthcare brands.
            </p>
          </div>

          {/* Footer Links */}
          <div className="sm:col-span-1">
            <h4 className="mb-12 md:mb-14 text-[12px] md:text-[13px] tracking-[0.1em]">LINKS</h4>
            <nav className="flex flex-col gap-8 md:gap-10">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-[12px] md:text-[13px] opacity-80 hover:opacity-100 transition-opacity duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="sm:col-span-1">
            <h4 className="mb-12 md:mb-14 text-[12px] md:text-[13px] tracking-[0.1em]">CONTACT</h4>
            <div className="flex flex-col gap-8 md:gap-10 text-[12px] md:text-[13px] opacity-80">
              <p>Worldwide</p>
              <Link to="/contact" className="hover:opacity-100 transition-opacity duration-200">
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-32 md:mt-40 lg:mt-48 pt-20 md:pt-24 border-t border-primary-foreground/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-8 md:gap-12 text-[10px] md:text-[11px] lg:text-[12px] opacity-60">
            <p>{footerText}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
