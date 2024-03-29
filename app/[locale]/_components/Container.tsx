import { cn } from "@/lib/utils";
import React from "react";

type Props = { className: string; children: React.ReactNode };

function Container({ className, children }: Props) {
  return (
    <section className={cn("w-[min(1372px,_90%)] mx-auto", className)}>{children}</section>
  );
}

export default Container;
