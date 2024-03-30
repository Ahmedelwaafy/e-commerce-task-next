export const i18nRouterConfig: {
  locales: string[];
  defaultLocale: string;
  prefixDefault: boolean;
  serverSetCookie: "always" | "if-empty" | undefined;
} = {
  locales: ["ar", "en"],
  defaultLocale: "ar",
  prefixDefault: true,
  serverSetCookie: "always",
};
