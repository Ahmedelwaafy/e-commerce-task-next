"use client";

import useCreateQueryString from "@/Hooks/useCreateQueryString";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {};

function CategoriesFilter({}: Props) {
  const { t } = useTranslation("");
  const [DeleteQuery, push] = useCreateQueryString();
  const searchParams = useSearchParams();

  const [selected, setSelected] = useState(searchParams.get("category") || "");
  const Categories = [
    { id: "Baklava", title: t("coffees.2") },
    { id: "ice-cream", title: t("coffees.3") },
    { id: "Chocolates", title: t("coffees.4") },
    { id: "oriental-sweets", title: t("coffees.5") },
    { id: "kahk-and-petit-four", title: t("coffees.6") },
  ];
  function handleClicked(id: string) {
    if (id === selected) {
      DeleteQuery("category");
      setSelected("");
    } else {
      push("category", id);
      setSelected(id);
    }
  }
  return (
    <ul className="flex flex-wrap gap-3 mt-12">
      <li
        onClick={() => {
          DeleteQuery("category");
          setSelected("");
        }}
        className={`bg-muted h-11 px-4 rounded-[100px] flex-center rtl:flex-row-reverse text-xl gap-1.5 cursor-pointer trns hover:bg-muted-foreground ${
          selected === "" ? "bg-muted-foreground" : ""
        }`}
      >
        <Image
          className={`trns active:scale-90 shrink-0 ${
            selected === ""
              ? "opacity-100 pointer-events-auto translate-y-0"
              : "opacity-0 pointer-events-none translate-y-3"
          }`}
          alt="Cancel"
          src={"/assets/cancel_solid.svg"}
          width={17}
          height={17}
        />
        {t("coffees.1")}
      </li>
      {Categories?.map((item) => (
        <li
          onClick={() => handleClicked(item.id)}
          className={`bg-muted h-11 px-4 rounded-[100px] flex-center rtl:flex-row-reverse text-xl gap-1.5 cursor-pointer trns hover:bg-muted-foreground ${
            selected === item.id ? "bg-muted-foreground" : ""
          }`}
          key={item.id}
        >
          <Image
            className={`trns active:scale-90 shrink-0 ${
              selected === item.id
                ? "opacity-100 pointer-events-auto translate-y-0"
                : "opacity-0 pointer-events-none translate-y-3"
            }`}
            alt="Cancel"
            src={"/assets/cancel_solid.svg"}
            width={17}
            height={17}
          />
          {item.title}
        </li>
      ))}
    </ul>
  );
}

export default CategoriesFilter;
