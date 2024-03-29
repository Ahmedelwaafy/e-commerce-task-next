"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

function useCreateQueryString() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  function push(name: string, value: string) {
    router.push(pathname + "?" + createQueryString(name, value));
  }
  function replace(name: string, value: string) {
    router.replace(pathname + "?" + createQueryString(name, value));
  }
  return [push, replace];
}

export default useCreateQueryString;
