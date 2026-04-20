import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "brand" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, variant = "default", size = "md", className }: BadgeProps) {
  const base = "inline-flex items-center gap-1 font-semibold rounded-full";

  const variants = {
    default:  "bg-gray-100 text-gray-600",
    success:  "bg-green-100 text-green-700",
    warning:  "bg-amber-100 text-amber-700",
    error:    "bg-red-100 text-red-600",
    brand:    "bg-brand-100 text-brand-700",
    outline:  "border border-gray-200 text-gray-600 bg-white",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span className={cn(base, variants[variant], sizes[size], className)}>
      {children}
    </span>
  );
}
