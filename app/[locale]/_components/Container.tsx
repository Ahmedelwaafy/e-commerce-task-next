import { cn } from "@/lib/utils";
import React from "react";

type Props = { className: string; children: React.ReactNode };

function Container({ className, children }: Props) {
  return (
    <section
      className={cn(
        "w-[91%] 3xl:w-[1272px] 2xl:w-[1048px] xl:w-[900px] lg:w-[800px] amd:w-[650px] bmd:w-[550px] ss:w-[80%] sm:w-[90%] mx-auto",
        className
      )}
    >
      {children}
    </section>
  );
}

export default Container;
