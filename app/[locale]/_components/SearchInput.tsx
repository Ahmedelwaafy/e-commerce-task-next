"use client";

import useCreateQueryString from "@/Hooks/useCreateQueryString";
import useDebounce from "@/Hooks/useDebounce";
import { TFunction } from "i18next";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = { t: TFunction };

function SearchInput({ t }: Props) {
  const searchParams = useSearchParams();
  const [value, setValue] = useState(
    searchParams.get("q")?.replace(/-/g, " ") || ""
  );
  const debouncedValue = useDebounce(value);
  const [DeleteQuery, push] = useCreateQueryString();

  useEffect(() => {
    if (debouncedValue) {
      push("q", debouncedValue?.replace(/\s/g, "-"));
    } else {
      if (searchParams.get("q")) {
        DeleteQuery("q");
      }
    }
  }, [debouncedValue]);

  return (
    <div className="relative group">
      <Image
        onClick={() => setValue("")}
        className="absolute top-1/2 translate-y-1/2 rtl:left-7 right-7 rtl:right-auto cursor-pointer transition-all duration-500 ease-in-out active:scale-90 shrink-0 opacity-0 pointer-events-none  group-hover:opacity-100 group-hover:pointer-events-auto group-hover:-translate-y-1/2"
        alt="Cancel"
        src={"/assets/Cancel.svg"}
        width={21}
        height={21}
      />
      <input
        type="text"
        placeholder={t("placeholder")}
        className="w-[650px] lg:w-[350px] md:w-[250px]  h-12 rounded-[100px]  border-none outline-none shadow-[0_0_0_1px] shadow-[#163300]  focus:shadow-[0_0_0_2px]  trns px-[72px]"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />{" "}
      <Image
        onClick={() => setValue("")}
        className="absolute top-1/2 -translate-y-1/2 rtl:right-7 left-7 rtl:left-auto cursor-pointer trns active:scale-90"
        alt="search"
        src={"/assets/search.svg"}
        width={18}
        height={18}
      />
    </div>
  );
}

export default SearchInput;
