import { cn } from "@/lib/utils";

function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-xl border border-[#E2E8F0] bg-[#F8FBFF] px-4 py-3 text-sm text-[#0A1628] placeholder:text-[#94A3B8] transition-colors resize-none focus-visible:border-[#0369A1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0369A1]/15 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
