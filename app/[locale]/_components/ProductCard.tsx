import React from "react";
import AddToCartBtn from "./AddToCartBtn";
import { IProductCardData } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

type Props = { card: IProductCardData; lng: string; index: number };

function ProductCard({ card, lng, index }: Props) {
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      toast.success("Added to favorites");
    } else {
      toast.success("Removed from favorites");
    }
  }
  return (
    <div className="w-full    rounded-3xl trns hover:-translate-y-2 overflow-hidden group border-2 border-muted-foreground">
      <Link
        target="_blank"
        href={`/products/${card?.slug}`}
        className="img__wrapper bg-muted flex-center h-[300px] relative"
      >
        {card?.availability === "outofstock" && (
          <span className="absolute top-2 right-1/2 translate-x-1/2 bg-red-500 text-sm leading-4 text-white pt-0.5 px-1.5 rounded-sm">
            out of stock{" "}
          </span>
        )}
        <Image
          alt={card?.name}
          src={card?.main_image}
          className="w-[200px] h-auto object-cover trns group-hover:rounded-2xl"
          width={400}
          height={400}
        />
        <div className="absolute bottom-2 left-2 rounded-full bg-white flex-center cursor-pointer size-8">
          <Image
            alt={"zoom"}
            src={"/assets/zoom.svg"}
            className=""
            width={14}
            height={14}
          />
        </div>
      </Link>
      <div className="card_details  w-full p-5">
        <h2
          title={lng === "ar" ? card?.ar_name : card?.name}
          className="text-xl font-medium line-clamp-1"
        >
          {lng === "ar" ? card?.ar_name : card?.name}
        </h2>
        <p className="text-[#777777] rtl:ltr rtl:text-end font-medium">
          250 gm
        </p>
        <div className="price flex items-center gap-3  rtl:ltr rtl:justify-end">
          <h3 className="line-through text-sm text-[#868685]">EGP55.99</h3>
          <h4 className="text-sm bg-accent leading-3 pt-0.5">
            EGP{" "}
            <sub className="text-2xl font-semibold leading-[0.25]">
              {card?.price.split(".")[0]}
            </sub>{" "}
            {card?.price.split(".")[1]}
          </h4>
        </div>
        <div
          className={`size__variations flex gap-3 w-full rtl:flex-row-reverse rtl:justify-end  mt-5  ${
            index % 2 === 0 ? "visible" : "invisible"
          }`}
        >
          <h5 className="border-[3px] w-[70px] h-11 trns hover:border-[#163300] hover:scale-95 cursor-pointer rounded-xl border-[#868685] text-sm font-medium flex-center">
            500 GM
          </h5>
          <h5 className="border-[3px] w-[70px] h-11 trns hover:border-[#163300] hover:scale-95 cursor-pointer rounded-xl border-[#868685] text-sm font-medium flex-center">
            250 GM
          </h5>
          <h5 className="border-[3px] w-[70px] h-11 trns hover:border-[#163300] hover:scale-95 cursor-pointer rounded-xl border-[#163300] text-sm font-medium flex-center">
            100 GM
          </h5>
        </div>

        <div className="love__cart--actions flex items-center justify- gap-3 tl:ltr flex-row-reverse mt-5">
          <button className="size-12 flex-center shrink-0 rounded-full bg-muted">
            <div className="heart-container" title="Like">
              <input
                onChange={handleInputChange}
                type="checkbox"
                className="checkbox"
                id="love"
              />
              <div className="svg-container">
                <svg
                  viewBox="0 0 24 24"
                  className="svg-outline "
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  className="svg-filled"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                </svg>
                <svg
                  className="svg-celebrate"
                  width="100"
                  height="100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon points="10,10 20,20"></polygon>
                  <polygon points="10,50 20,50"></polygon>
                  <polygon points="20,80 30,70"></polygon>
                  <polygon points="90,10 80,20"></polygon>
                  <polygon points="90,50 80,50"></polygon>
                  <polygon points="80,80 70,70"></polygon>
                </svg>
              </div>
            </div>
          </button>
          <AddToCartBtn
            lng={lng}
            disabled={card?.availability === "outofstock"}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
