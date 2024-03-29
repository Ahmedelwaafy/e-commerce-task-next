"use client";
import React, { useState } from "react";
import { Breadcrumbs, Header, Container } from "./_components";
import { useTranslation } from "react-i18next";

type Props = {};

function HomePage({}: Props) {
  const [count, setCount] = useState(0);
  const { t } = useTranslation("");

  return (
    <Container className=" min-h-screen bg-red-500 ">
      <Header />
      <Breadcrumbs
        t={t}
        pathnames={[
          t("pathnames.Men"),
          t("pathnames.Clothing"),
          t("pathnames.Tops"),
          t("pathnames.Adidas"),
          t("pathnames.name"),
        ]}
      />{" "}
    </Container>
  );
}

export default HomePage;
