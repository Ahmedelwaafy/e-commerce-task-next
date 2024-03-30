"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { i18nRouterConfig } from "@/i18nRouterConfig";
import { TFunction } from "i18next";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
export default function LanguageChanger({ t }: { t: TFunction }) {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (newLocale: string) => {
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    if (
      currentLocale === i18nRouterConfig.defaultLocale &&
      !i18nRouterConfig.prefixDefault
    ) {
      router.push("/" + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  return (
    <Select
      onValueChange={(value) => handleChange(value)}
      defaultValue={i18n.language === "ar" ? "ar" : "en"}
    >
      <SelectTrigger className="w-[100px] rounded-full h-12">
        <SelectValue placeholder={t("language")} />
      </SelectTrigger>
      <SelectContent  position="popper" sideOffset={5}>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="ar">العربية</SelectItem>
      </SelectContent>
    </Select>
  );
}
