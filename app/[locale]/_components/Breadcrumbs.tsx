import { TFunction } from "i18next";
import Image from "next/image";
import Link from "next/link";

const Breadcrumbs = ({
  pathnames,
  t,
}: {
  pathnames: string[];
  t: TFunction;
}) => {
  return (
    <nav aria-label="breadcrumb" className=" text-[#185039] ">
      <ul className="breadcrumb flex justify-start gap-1.5 items-center h-20 font-medium ">
        <li className="breadcrumb-item">
          <Link href="">{t("home")} </Link>
        </li>
        <Image
          className="inline-block ltr:rotate-180 pointer-events-none"
          alt="chevron"
          src={"/assets/chevron.svg"}
          width={9}
          height={7}
        />
        {pathnames.map((pathname, index) => {
          const routeTo = `/${pathnames.slice(1, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li
              key={index}
              className={`breadcrumb-item${isLast ? " active" : ""} ${
                index === 0 && "hidden"
              }`}
            >
              {isLast ? (
                // If it's the last item, display the text without a link
                pathname?.replace(/-/g, " ")
              ) : (
                // If it's not the last item, display a link
                <Link href={routeTo}>
                  {pathname?.replace(/-/g, " ")}{" "}
                  <Image
                    className="inline-block ltr:rotate-180 pointer-events-none"
                    alt="chevron"
                    src={"/assets/chevron.svg"}
                    width={9}
                    height={7}
                  />{" "}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
