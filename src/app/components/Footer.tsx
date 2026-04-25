import { Link } from "react-router";
import { Logo } from "./Logo";
import { useContentStore } from "../store/contentStore";
import { CONTAINER } from "../lib/styles";
import footerBg from "../../assests/footer-bg.jpg";

export function Footer() {
  const { footerLinks, footerText } = useContentStore();

  const mainLinks = footerLinks.slice(0, 4);
  const secondaryLinks = footerLinks.slice(4);

  return (
    <footer
      className="text-primary-foreground relative"
      style={{
        backgroundImage: `url(${footerBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay so content stays readable */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(3,35,77,0.88) 0%, rgba(1,21,40,0.95) 100%)" }} />

      {/* All content sits above the overlay */}
      <div className="relative">
      {/* Top statement bar */}
      <div className="border-b border-primary-foreground/10">
        <div className={`${CONTAINER} py-8 md:py-10`}>
          <p className="text-[10px] md:text-[11px] tracking-[0.2em] opacity-40 text-center">
            HEALTH · BEAUTY · WELLNESS · PRIVATE HEALTHCARE
          </p>
        </div>
      </div>

      {/* Main footer body */}
      <div className={`${CONTAINER} py-10 md:py-14`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">

          {/* Brand column */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="mb-5">
              <Logo variant="white" />
            </div>
            <p className="text-[12px] md:text-[13px] leading-[1.8] opacity-60 max-w-full md:max-w-[280px]">
              Building premium brand experiences that elevate perception, attract quality clients, and drive sustainable growth.
            </p>
            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-block text-[11px] tracking-[0.12em] border border-primary-foreground/30 px-5 py-3 hover:bg-primary-foreground hover:text-primary transition-all duration-300"
              >
                BOOK A CONSULTATION
              </Link>
            </div>
          </div>

          {/* Spacer on desktop */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Navigation */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="mb-5 text-[10px] tracking-[0.2em] opacity-40">NAVIGATE</h4>
            <nav className="flex flex-col gap-3">
              {mainLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-[12px] md:text-[13px] tracking-[0.03em] opacity-70 hover:opacity-100 transition-opacity duration-200"
                >
                  {link.name}
                </Link>
              ))}
              {secondaryLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-[12px] md:text-[13px] tracking-[0.03em] opacity-70 hover:opacity-100 transition-opacity duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="mb-5 text-[10px] tracking-[0.2em] opacity-40">REACH US</h4>
            <div className="flex flex-col gap-3 text-[12px] md:text-[13px] opacity-70">
              <p className="leading-relaxed">Available worldwide.<br />Remote &amp; in-person.</p>
              <Link
                to="/contact"
                className="hover:opacity-100 transition-opacity duration-200 underline underline-offset-4 decoration-primary-foreground/30"
              >
                Start a project
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className={`${CONTAINER} py-5`}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] md:text-[11px] opacity-40 tracking-[0.05em]">
            <p>{footerText}</p>
            <p className="hidden sm:block">S.SOCIALS — PREMIUM BRAND GROWTH</p>
          </div>
        </div>
      </div>
      </div>{/* end relative wrapper */}
    </footer>
  );
}
