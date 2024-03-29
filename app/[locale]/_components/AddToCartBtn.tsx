"use client";

import { useContextDispatch } from "@/Providers/ContextProvider";

type Props = {};

function AddToCartBtn({}: Props) {
  const Dispatch = useContextDispatch();

  return (
    <button onClick={() => Dispatch((prev) => prev + 1)}>AddToCartBtn</button>
  );
}

export default AddToCartBtn;
