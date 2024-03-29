import { useState } from "react";
import { Header, Container, Breadcrumbs, ProductsList } from "./_components";
import initTranslations from "@/app/i18n";

async function page({ params: { locale } }: { params: { locale: string } }) {
  const { t } = await initTranslations(locale, ["home"]);
  return (
    <Container className=" min-h-screen bg-red-500 ">
      <Header />
      <Breadcrumbs t={t} pathnames={[t("home"), t("coffee")]} />
      <h1>{t("title")}</h1>
      <ProductsList />
    </Container>
  );
}

export default page;
