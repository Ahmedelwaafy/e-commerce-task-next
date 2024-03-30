"use client";

import { useContextState } from "@/Providers/ContextProvider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import SearchInput from "./SearchInput";
import LanguageChanger from "./LanguageChanger";
import Container from "./Container";
type Props = {};

function Header({}: Props) {
  const CartCount = useContextState();
  const { t } = useTranslation("");
  return (
    <header className="pt-[40px] pb-5 sticky top-0 bg-white shadow-sm z-50 ">
      <Container>
        <nav className="w-full flex items-center justify-between rtl:flex-row-reverse  gap-5">
          <Sheet>
            <SheetTrigger className="flex-center size-[40px] shrink-0 rounded-full bg-accent relative">
              <Image
                alt="cart"
                src={"/assets/cart.svg"}
                width={20}
                height={18}
              />
              <span className="absolute -top-1.5 -left-1.5 text-xs bg-[#163300] size-5 flex-center rounded-full text-white font-medium pt-0.5">
                {CartCount}
                {/*               {t("count_formatted", { count: CartCount })}
                 */}{" "}
              </span>
            </SheetTrigger>
            <SheetContent className="w-80 ">
              <SheetHeader className="grow flex-col-center h-full">
                <SheetTitle>{t("your_cart")}</SheetTitle>
                <SheetDescription className="text-foreground">
                  {t("cart_items", { count: CartCount })}
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <SearchInput t={t} />
          <LanguageChanger t={t} />
        </nav>
      </Container>
    </header>
  );
}

export default Header;
