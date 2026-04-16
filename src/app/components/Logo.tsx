import { useContentStore } from "../store/contentStore";

export function Logo({ className = "" }: { className?: string }) {
  const { logoUrl } = useContentStore();

  if (logoUrl) {
    return (
      <div className={className}>
        <img src={logoUrl} alt="Logo" className="h-24 md:h-32 lg:h-36 w-auto object-contain" />
      </div>
    );
  }

  // Default fallback text logo - Mobile First
  return (
    <div className={className}>
      <span className="text-[15px] md:text-[17px] lg:text-[18px] tracking-[0.15em] font-medium">
        S.SOCIALS
      </span>
    </div>
  );
}
