import { useContentStore } from "../store/contentStore";
import ssocialsWhite from "../../assests/ssocials-white-transparent.svg";
import ssocialsNavy from "../../assests/ssocials-navy-transparent.svg";

interface LogoProps {
  className?: string;
  /** "white" = white PNG (for dark backgrounds), "navy" = navy PNG (for light backgrounds). Defaults to "white". */
  variant?: "white" | "navy";
}

export function Logo({ className = "", variant = "white" }: LogoProps) {
  const { logoUrl } = useContentStore();

  // Uploaded logo always takes priority
  if (logoUrl) {
    return (
      <div className={className}>
        <img src={logoUrl} alt="S.Socials" className="h-8 md:h-10 w-auto object-contain" />
      </div>
    );
  }

  const src = variant === "navy" ? ssocialsNavy : ssocialsWhite;

  return (
    <div className={className}>
      <img src={src} alt="S.Socials" className="h-16 md:h-20 lg:h-24 w-auto object-contain" />
    </div>
  );
}
