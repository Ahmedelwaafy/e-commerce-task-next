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
  const AuthState = useContextState();
  const { t } = useTranslation("");
  return (
    <header>
      <nav className="w-full items-center justify-between gap-5">
        <Sheet>
          <SheetTrigger className="flex-center size-[60px] rounded-full bg-accent relative">
            <Image
              alt="cart"
              src={"/assets/cart/cart.svg"}
              className=" "
              width={34}
              height={32}
            />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{t("your_cart")}</SheetTitle>
              <SheetDescription>
                {t("cart_items", { count: 14586 })}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}

export default Header;
