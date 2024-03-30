import { cn } from "@/lib/utils";

function ErrorMessage({
  h,
  message,
  className,
}: {
  message: string;
  h?: string;
  className?: string;
}) {
  return (
    <section
      className={cn(
        `w-full grow flex-center`,
        className
      )}
    >
      <p>{message}</p>
    </section>
  );
}

export default ErrorMessage;
