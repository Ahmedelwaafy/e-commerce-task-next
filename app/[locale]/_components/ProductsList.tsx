"use client";
import { IProductCardData } from "@/types";
import ProductCard from "./ProductCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import ErrorMessage from "./ErrorMessage";
import NoItemsMessage from "./NoItemsMessage";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useTranslation } from "react-i18next";

type Props = {};

function ProductsList({}: Props) {
  const searchParams = useSearchParams();
  const { t, i18n } = useTranslation("");

  const fetcherFunction = async ({ pageParam }: { pageParam: number }) => {
    const options = {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        category: searchParams.get("category") || "",
        price_range: [0, 100000000],
        products_per_page: 12,
        page: pageParam,
        sort: {
          criteria: "date",
          arrangement: "DESC",
        },
        keyword: searchParams.get("q") || "",
      },
    };

    const res = await axios(options);
    console.log("data", data);

    return res.data;
  };
  const {
    data,
    isError,
    isPaused,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isPending,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["Products"],
    queryFn: ({ pageParam }) =>
      fetcherFunction({
        pageParam,
      }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.length > 11) {
        return pages?.length + 1;
      } else return undefined;
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    refetch();
  }, [refetch, searchParams]);
  const ProductsData: IProductCardData[] = useMemo(() => {
    return data?.pages.reduce(
      (acc: IProductCardData[], page: IProductCardData[]) => {
        return [...acc, ...page];
      },
      []
    );
  }, [data]);
  return (
    <section className="w-full flex-col-center mt-9">
      <div className="w-full grid grid-cols-auto_repeat gap-x-6 gap-y-12">
        {isError || isPaused ? (
          <ErrorMessage message={t("ErrorMessage")} />
        ) : isPending ? (
          Array(12)
            .fill("")
            .map((_, i) => <ProductCardSkeleton key={i} />)
        ) : ProductsData?.length === 0 ? (
          <NoItemsMessage message={t("NoItemsMessage")} />
        ) : (
          ProductsData?.map(
            (card: IProductCardData, index: number) =>
              card?.status === "publish" && (
                <ProductCard
                  key={card?.id}
                  card={card}
                  lng={i18n.language}
                  index={index}
                />
              )
          )
        )}
      </div>

      {isFetching && (
        <div className="w-full grid grid-cols-auto_repeat gap-x-6 gap-y-12 mt-12">
          {Array(Number(4))
            .fill("")
            .map((_, i) => (
              <ProductCardSkeleton className="" key={i} />
            ))}
        </div>
      )}
      <button
        disabled={isFetching}
        className={`mx-auto my-[84px] h-12 w-[136px] bg-transparent text-[#163300] border-[#868685] hover:text-white hover:bg-[#163300] disabled:opacity-50 border-2 trns disabled:cursor-not-allowed flex-center text-xl font-medium rounded-full`}
        onClick={fetchNextPage}
      >
        {t("CTA_text")}
      </button>
    </section>
  );
}

export default ProductsList;
