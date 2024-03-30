import initTranslations from "@/app/i18n";
import {
  Breadcrumbs,
  CategoriesFilter,
  Container,
  Header,
  ProductsList,
} from "./_components";

async function page({ params: { locale } }: { params: { locale: string } }) {
  const { t } = await initTranslations(locale, ["home"]);

  return (
    <>
      <Header />
      <Container className=" min-h-screen  ">
        <Breadcrumbs t={t} pathnames={[t("home"), t("coffee")]} />
        <h1 className="text-3xl font-semibold md:text-center">{t("title")}</h1>
        <CategoriesFilter />
        <ProductsList />
      </Container>
    </>
  );
}

export default page;
