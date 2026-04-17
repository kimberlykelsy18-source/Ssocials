import { Link } from "react-router";

interface ButtonProps {
  to?: string;
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export function Button({ to, href, children, variant = "primary", className = "", onClick, type = "button" }: ButtonProps) {
  const baseStyles = "inline-block px-6 md:px-8 py-3 md:py-4 text-[13px] md:text-[14px] tracking-[0.05em] transition-opacity duration-200 hover:opacity-90 text-center whitespace-nowrap";
  const variantStyles = {
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
  };

  const fullClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={fullClassName}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={fullClassName} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={fullClassName}>
      {children}
    </button>
  );
}