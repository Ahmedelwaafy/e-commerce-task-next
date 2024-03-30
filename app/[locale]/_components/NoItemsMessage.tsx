import { cn } from "@/lib/utils";

function NoItemsMessage({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <section className={cn(`w-full grow flex-center`, className)}>
      <p> {message}</p>
    </section>
  );
}

export default NoItemsMessage;
