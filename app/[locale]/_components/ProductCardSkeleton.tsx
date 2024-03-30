import { Skeleton } from "@/components/ui/skeleton";

function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div className="w-full    rounded-3xl  overflow-hidden  border-2 border-muted-foreground">
      <div className="img__wrapper  flex-center h-[300px] ">
        <Skeleton className="size-[200px]  rounded-2xl" />
      </div>
      <div className="card_details  w-full p-5">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-1/3 h-2 my-3" />
        <Skeleton className="w-1/2 h-3" />

        <div
          className={`size__variations flex gap-3 w-full rtl:flex-row-reverse rtl:justify-end  mt-5  `}
        >
          <Skeleton className="w-[70px] h-11 rounded-xl" />
          <Skeleton className="w-[70px] h-11 rounded-xl" />
          <Skeleton className="w-[70px] h-11 rounded-xl" />
        </div>

        <div className="love__cart--actions flex items-center justify- gap-3 tl:ltr rtl:flex-row-reverse mt-5">
          <Skeleton className="size-12 flex-center shrink-0 rounded-full " />
          <Skeleton className="grow  rounded-full h-12" />
        </div>
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
