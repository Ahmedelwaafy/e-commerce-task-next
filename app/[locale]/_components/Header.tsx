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
import { TFunction } from "i18next";
import Image from "next/image";
import { useTranslation } from "react-i18next";

type Props = {};

function Header({}: Props) {
  const CartCount = useContextState();
  const { t } = useTranslation("");
  return (
    <header>
      <nav className="w-full items-center justify-between gap-5">
        <Sheet>
          <SheetTrigger className="flex-center size-[60px] rounded-full bg-accent relative">
            <Image
              alt="cart"
              src={"/assets/cart/cart.svg"}
              width={34}
              height={32}
            />
            <span className="absolute -top-3 -left-3 bg-[#163300] size-9 flex-center rounded-full text-white font-medium">
              {t("count_formatted", { count: CartCount })}
            </span>
          </SheetTrigger>
          <SheetContent className="w-80 ">
            <SheetHeader>
              <SheetTitle>{t("your_cart")}</SheetTitle>
              <SheetDescription className="text-foreground">
                {t("cart_items", { count: CartCount })}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}

export default Header;
