import type { RouteMeta } from "vue-router";
interface NewRouteMeta extends RouteMeta {
  antIcon?: string;
}
export interface RouteItem {
  path: string;
  component: any;
  meta: NewRouteMeta;
  name?: string;
  alias?: string | string[];
  redirect?: string;
  caseSensitive?: boolean;
  children?: RouteItem[];
}

/**
 * @description: Get menu return value
 */
export type getMenuListResultModel = RouteItem[];
