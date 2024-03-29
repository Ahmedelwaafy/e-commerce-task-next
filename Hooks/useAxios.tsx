import { useQuery, useMutation, useQueries } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { userData } from "@/app/Features/AuthenticationSlice.tsx";
import { useAppSelector } from "../app/reduxHooks";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IUserData } from "@/types/index.ts";
import { useHandleLogOut } from "@/Utilities";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_ENDPOINTS_BASE_URL,
});

interface fetcherFunctionProps {
  api: string;
  authorizedAPI: boolean | undefined;
  user: IUserData | null;
  lang: string;
  addToken: boolean;
}

const fetcherFunction = async ({
  api,
  authorizedAPI,
  user,
  lang,
  addToken,
}: fetcherFunctionProps) => {
  const headers = user?.token
    ? {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
        lang: lang,
      }
    : {
        "Content-Type": "application/json",
        lang: lang,
      };
  const res = await axiosInstance.get(api, {
    headers: headers,
  });
  return res.data?.data;
};

export const useFetchData = (
  identifier: string,
  api: string,
  showToasts?: boolean,
  select?: boolean,
  id: string | number = "",
  cacheTime = 5000,
  staleTime = 0,
  enabled = true,
  authorizedAPI?: boolean,
  onSuccess?: "" | ((data) => void),
  onError?: "" | (() => void),
  addToken: boolean = false
) => {
  const navigate = useNavigate();
  const user = useAppSelector(userData);
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
  const [logOut] = useHandleLogOut();

  const useQueryOptions = {
    onSuccess: (data) => {
      console.log("useFetchData from custom hook", identifier, data, api);
      showToasts && toast.success(data.message);
      onSuccess && onSuccess();
    },
    onError: (error) => {
      /*       console.log(identifier, enabled);
       */ showToasts &&
        toast.error(
          error?.response?.data?.message || "Something Wrong has happened!"
        );
      console.log("error from custom hook", identifier, error, api);
      error?.response?.status === 404 && navigate(`/${lang}/not-found`);
      if (authorizedAPI && error?.response?.status === 401) {
        navigate(`/${lang}/login`, { replace: true });
        logOut();
      }
    },
    select: (data) => {
      /*       console.log(identifier, data, api);
       */
      return select ? data[0] : data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: enabled,
    cacheTime: cacheTime,
    staleTime: staleTime,
    retry: 1,
  };
  return useQuery({
    queryKey: [identifier, id],
    queryFn: () =>
      fetcherFunction({ api, authorizedAPI, user, lang, addToken }),
    ...useQueryOptions,
  });
};
export const useFetchParallelData = (
  identifier: string,
  iterators: string[],
  api: string,
  showToasts?: boolean,
  select?: boolean,
  cacheTime = 5000,
  staleTime = 0,
  enabled = true,
  authorizedAPI?: boolean,
  addToken: boolean = false
) => {
  const user = useAppSelector(userData);
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";

  const useQueryOptions = {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: enabled,
    cacheTime: cacheTime,
    staleTime: staleTime,
    retry: 1,
  };

  return useQueries({
    queries: iterators.map((iterator) => {
      return {
        queryKey: [identifier, iterator],
        queryFn: () =>
          fetcherFunction({
            api: api + iterator,
            authorizedAPI,
            user,
            lang,
            addToken,
          }),
        ...useQueryOptions,
      };
    }),
  });
};

export const useFetchPaginatedData = (
  identifier: string,
  id: string | number = "",
  api: string,
  showToasts = false,
  cacheTime = 500000,
  staleTime = 0,
  enabled = true,
  authorizedAPI = false,
  addToken: boolean = false
) => {
  const user = useAppSelector(userData);
  const navigate = useNavigate();
  const { i18n } = useTranslation("");
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
  const [logOut] = useHandleLogOut();

  const useFetchPaginatedDataOptions = {
    onSuccess: (data) => {
      console.log("from custom hook", identifier, data, api);
      showToasts && toast.success(data.message);
    },
    onError: (error) => {
      /*       console.log(identifier, error);
       */
      console.log("error from custom hook", identifier, error, api);

      showToasts &&
        toast.error(
          error?.response?.data?.message || "Something Wrong has happened!"
        );
      if (authorizedAPI && error?.response?.status === 401) {
        navigate(`/${lang}/login`, { replace: true });
        logOut();
      }
    },
    select: (data) => {
      /*       console.log(identifier, id, data);
       */
      return data?.original;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: enabled,
    cacheTime: cacheTime,
    refetchOnReconnect: true,
    staleTime: staleTime,
    retry: 1,
    keepPreviousData: true,
  };

  return useQuery({
    queryKey: [identifier, id],
    queryFn: () =>
      fetcherFunction({ api, authorizedAPI, user, lang, addToken }),
    ...useFetchPaginatedDataOptions,
  });
};

export const usePostData = (
  showToasts = false,
  onSuccess?: () => void,
  authorizedAPI?: boolean,
  onError?: (err: any) => void
) => {
  const user = useAppSelector(userData);
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
  interface posterFunctionProps {
    api: string;
    data?: object;
    file?: boolean;
  }

  const posterFunction = async ({ api, data, file }: posterFunctionProps) => {
    const ContentType = file ? "multipart/form-data" : "application/json";

    const headers = user?.token
      ? {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": ContentType,
          lang: lang,
        }
      : {
          "Content-Type": ContentType,
          lang: lang,
        };
    const options = {
      url: api,
      method: "POST",
      headers: headers,
      data: data,
    };
    console.log("from custom hook", data, api, ContentType, headers);

    const res = await axiosInstance(options);
    return res.data;
  };
  const usePostDataOptions = {
    onSuccess: (data) => {
      console.log("POST Success from custom hook", data);

      showToasts && toast.success(data.message);
      onSuccess && onSuccess(data);
    },
    onError: (error) => {
      console.log("error from custom hook", error);
      onError && onError(error);
      showToasts &&
        toast.error(
          error?.response?.data?.message || "Something Wrong has happened!"
        );
      authorizedAPI &&
        error?.response?.status === 401 &&
        navigate(`/${lang}/login`, { replace: true });
    },
  };
  //console.log(api);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: posterFunction,
    ...usePostDataOptions,
  });
};
