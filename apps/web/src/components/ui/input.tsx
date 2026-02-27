import { cn } from "@/lib/utils";

function Input({
  className,
  type,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FBFF] px-4 py-2.5 text-sm text-[#0A1628] placeholder:text-[#94A3B8] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:border-[#0369A1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0369A1]/15 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input };
