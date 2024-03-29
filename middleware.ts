import { i18nRouter } from "next-i18n-router";
import { i18nRouterConfig } from "./i18nRouterConfig";

export function middleware(request) {
  return i18nRouter(request, i18nRouterConfig);
}

// applies this middleware only to files in the app directory
export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
