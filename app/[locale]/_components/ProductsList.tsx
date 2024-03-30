"use client";
import { fetcherFunction } from "@/actions/fetchData";
import { IProductCardData } from "@/types";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import ErrorMessage from "./ErrorMessage";
import NoItemsMessage from "./NoItemsMessage";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

function ProductsList() {
  const searchParams = useSearchParams();
  const { t, i18n } = useTranslation("");
  const queryClient = useQueryClient();
  const isInitialMount = useRef(true);

  const {
    data,
    isError,
    isPaused,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    isPending,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["Products"],
    queryFn: ({ pageParam }) =>
      fetcherFunction({
        pageParam,
        category: searchParams.get("category") || "",
        keyword: searchParams.get("q")?.replace(/-/g, " ") || "",
      }),
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      queryClient.clear();
      refetch();
    }
  }, [queryClient, refetch, searchParams]);

  return (
    <section className="w-full flex-col-center mt-9">
      <div className="w-full grid grid-cols-auto_repeat gap-x-6 gap-y-12">
        {isError || isPaused ? (
          <ErrorMessage message={t("ErrorMessage")} />
        ) : isPending || isRefetching ? (
          Array(12)
            .fill("")
            .map((_, i) => <ProductCardSkeleton key={i} />)
        ) : data?.pages?.length === 0 ? (
          <NoItemsMessage message={t("NoItemsMessage")} />
        ) : (
          data?.pages?.map((group, i) => (
            <React.Fragment key={i}>
              {group?.map(
                (card: IProductCardData, index: number) =>
                  card?.status === "publish" && (
                    <ProductCard
                      key={card?.id}
                      card={card}
                      lng={i18n.language}
                      index={index}
                    />
                  )
              )}
            </React.Fragment>
          ))
        )}
      </div>

      {isFetchingNextPage && (
        <div className="w-full grid grid-cols-auto_repeat gap-x-6 gap-y-12 mt-12">
          {Array(Number(4))
            .fill("")
            .map((_, i) => (
              <ProductCardSkeleton className="" key={i} />
            ))}
        </div>
      )}

      <button
        disabled={isFetchingNextPage}
        className={`mx-auto my-[84px] h-12 w-[136px] bg-transparent text-[#163300] border-[#868685] hover:text-white hover:bg-[#163300] disabled:opacity-50 border-2 trns disabled:cursor-not-allowed  text-xl font-medium rounded-full ${
          isError || isPaused || !hasNextPage || data?.pages?.length === 0
            ? "hidden"
            : "flex-center"
        }`}
        onClick={() => fetchNextPage()}
      >
        {t("CTA_text")}
      </button>
    </section>
  );
}

export default ProductsList;
