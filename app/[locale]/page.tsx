import {
  Header,
  Container,
  Breadcrumbs,
  ProductsList,
  CategoriesFilter,
} from "./_components";
import initTranslations from "@/app/i18n";

async function page({ params: { locale } }: { params: { locale: string } }) {
  const { t } = await initTranslations(locale, ["home"]);
  return (
    <Container className=" min-h-screen  ">
{/*       <Header />
 */}      <Breadcrumbs t={t} pathnames={[t("home"), t("coffee")]} />
      <h1 className="text-3xl font-semibold md:text-center">{t("title")}</h1>

      <CategoriesFilter />
      <ProductsList />
    </Container>
  );
}

export default page;
