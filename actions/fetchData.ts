"use server";

import axios from "axios";

export const fetcherFunction = async ({
  pageParam,
  category,
  keyword,
}: {
  pageParam: number;
  category: string;
  keyword: string;
}) => {
  const options = {
    url: `https://woosonicpwa.com/MitchAPI/filter.php`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      category: category,
      price_range: [0, 100000000],
      products_per_page: 12,
      page: pageParam,
      sort: {
        criteria: "date",
        arrangement: "DESC",
      },
      keyword: keyword,
    },
  };
  const res = await axios(options);
  return res.data;
};
