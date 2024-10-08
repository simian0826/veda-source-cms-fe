import type { AppRouteRecordRaw, AppRouteModule } from "/@/router/types";

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from "/@/router/routes/basic";

import { PageEnum } from "/@/enums/pageEnum";
const routeModuleList: AppRouteModule[] = [];
const modules = import.meta.glob("./modules/**/*.ts", { eager: true });
// 加入到路由集合中
Object.keys(modules).forEach((key) => {
  const mod = (modules as Recordable)[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

export const RootRoute: AppRouteRecordRaw = {
  path: "/",
  name: "Root",
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: "Root",
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: "/login",
  name: "Login",
  component: () => import("/@/views/sys/login/Login.vue"),
  meta: {
    title: "登录",
  },
};

export const SSOLoginRoute: AppRouteRecordRaw = {
  path: "/ssoLogin",
  name: "SsoLogin",
  component: () => import("/@/views/sys/ssoLogin/index.vue"),
  meta: {
    title: "SSO 登录",
  },
};
// Basic routing without permission
export const basicRoutes = [
  asyncRoutes,
  LoginRoute,
  SSOLoginRoute,
  RootRoute,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
];
