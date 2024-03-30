"use client";

import { useContextDispatch } from "@/Providers/ContextProvider";
import { toast } from "sonner";

type Props = { disabled: boolean; lng: string };

function AddToCartBtn({ disabled, lng }: Props) {
  const Dispatch = useContextDispatch();

  return (
    <button
      className="grow bg-[#163300] rounded-full h-12 disabled:opacity-70  disabled:!cursor-not-allowed text-xl text-white font-medium text-start px-5"
      disabled={disabled}
      onClick={() => {
        toast.success("Added to cart");
        Dispatch((prev) => prev + 1);
      }}
    >
      {lng == "ar" ? "اضف الى السلة" : "Add to cart"}
    </button>
  );
}

export default AddToCartBtn;
