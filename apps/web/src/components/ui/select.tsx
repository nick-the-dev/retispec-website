import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={cn(
          "flex h-11 w-full appearance-none items-center rounded-xl border border-[#E2E8F0] bg-[#F8FBFF] px-4 py-2.5 pr-10 text-sm text-[#0A1628] transition-colors focus:border-[#0369A1] focus:outline-none focus:ring-2 focus:ring-[#0369A1]/15 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
    </div>
  );
}

export { Select };
