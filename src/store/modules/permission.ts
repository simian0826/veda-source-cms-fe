import type { AppRouteRecordRaw, Menu } from "/@/router/types";

import { defineStore } from "pinia";
import { store } from "/@/store";
import { useUserStore } from "./user";
import { useAppStoreWithOut } from "./app";
import { toRaw } from "vue";
import {
  transformObjToRoute,
  flatMultiLevelRoutes,
} from "/@/router/helper/routeHelper";
import { transformRouteToMenu } from "/@/router/helper/menuHelper";

import projectSetting from "/@/settings/projectSetting";

import { PermissionModeEnum } from "/@/enums/appEnum";

import { asyncRoutes } from "/@/router/routes";
import { PAGE_NOT_FOUND_ROUTE } from "/@/router/routes/basic";

import { filter } from "/@/utils/helper/treeHelper";

import { getMenuList } from "/@/api/sys/menu";
// import { getPermCodeApi } from "/@/api/sys/user";

import { useMessage } from "/@/hooks/web/useMessage";
import { PageEnum } from "/@/enums/pageEnum";
import { PermissionEnum } from "/@/enums/permissionEnum";
import { PERMISSION_CODES_KEY } from "/@/enums/cacheEnum";
import { getAuthCache, setAuthCache } from "/@/utils/auth";
import { getPermCodeApi } from "/@/api/sys/user";
// import { getMenuList } from "/@/api/sys/menu";
// import { HomeFilled } from "@ant-design/icons-vue";

interface PermissionState {
  // Permission code list
  permCodeList: PermissionEnum[];
  // Whether the route has been dynamically added
  isDynamicAddedRoute: boolean;
  // To trigger a menu update
  lastBuildMenuTime: number;
  // Backstage menu list
  backMenuList: Menu[];
  frontMenuList: Menu[];
  routeList: Menu[];
}
export const usePermissionStore = defineStore({
  id: "app-permission",
  state: (): PermissionState => ({
    permCodeList: [],
    // Whether the route has been dynamically added
    isDynamicAddedRoute: false,
    // To trigger a menu update
    lastBuildMenuTime: 0,
    // Backstage menu list
    backMenuList: [],
    // menu List
    frontMenuList: [],
    routeList: [],
  }),
  getters: {
    getPermCodeList(): PermissionEnum[] {
      return (
        this.permCodeList || getAuthCache<PermissionEnum>(PERMISSION_CODES_KEY)
      );
    },
    getBackMenuList(): Menu[] {
      return this.backMenuList;
    },
    getFrontMenuList(): Menu[] {
      return this.frontMenuList;
    },
    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime;
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
    getRouteList(): Menu[] {
      return this.routeList;
    },
  },
  actions: {
    setPermCodeList(codeList: PermissionEnum[]) {
      this.permCodeList = codeList;
      setAuthCache(PERMISSION_CODES_KEY, codeList);
    },

    setBackMenuList(list: Menu[]) {
      this.backMenuList = list;
      list?.length > 0 && this.setLastBuildMenuTime();
    },

    setFrontMenuList(list: Menu[]) {
      this.frontMenuList = list;
    },

    setRouteList(list: Menu[]) {
      this.routeList = list;
    },

    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime();
    },

    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },
    resetState(): void {
      this.isDynamicAddedRoute = false;
      this.permCodeList = [];
      this.backMenuList = [];
      this.lastBuildMenuTime = 0;
    },
    async changePermissionCode() {
      const { createMessage } = useMessage();
      try {
        const codeList = await getPermCodeApi();
        this.setPermCodeList(codeList);
      } catch (err) {
        console.error(err);
        createMessage.error("获取权限失败");
      }
    },
    async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
      const userStore = useUserStore();
      const appStore = useAppStoreWithOut();

      let routes: AppRouteRecordRaw[] = [];
      const roleList = toRaw(userStore.getRoleList) || [];
      const { permissionMode = projectSetting.permissionMode } =
        appStore.getProjectConfig;

      const routeFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route;
        const { roles } = meta || {};
        if (!roles) return true;
        return roleList.some((role) => roles.includes(role));
      };

      const routeRemoveIgnoreFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route;
        const { ignoreRoute } = meta || {};
        return !ignoreRoute;
      };

      /**
       * @description 根据设置的首页path，修正routes中的affix标记（固定首页）
       * */
      const patchHomeAffix = (routes: AppRouteRecordRaw[]) => {
        if (!routes || routes.length === 0) return;
        let homePath: string = PageEnum.BASE_HOME;
        function patcher(routes: AppRouteRecordRaw[], parentPath = "") {
          if (parentPath) parentPath = parentPath + "/";
          routes.forEach((route: AppRouteRecordRaw) => {
            const { path, children, redirect } = route;
            const currentPath = path.startsWith("/") ? path : parentPath + path;
            if (currentPath === homePath) {
              if (redirect) {
                homePath = route.redirect! as string;
              } else {
                route.meta = Object.assign({}, route.meta, { affix: true });
                throw new Error("end");
              }
            }
            children && children.length > 0 && patcher(children, currentPath);
          });
        }
        try {
          patcher(routes);
        } catch (e) {
          // 已处理完毕跳出循环
        }
        return;
      };

      switch (permissionMode) {
        case PermissionModeEnum.ROLE:
          routes = filter(asyncRoutes, routeFilter);
          routes = routes.filter(routeFilter);
          // Convert multi-level routing to level 2 routing
          routes = flatMultiLevelRoutes(routes);
          break;

        case PermissionModeEnum.ROUTE_MAPPING: {
          routes = filter(asyncRoutes, routeFilter);
          routes = routes.filter(routeFilter);
          const menuList = transformRouteToMenu(routes, true);
          routes = filter(routes, routeRemoveIgnoreFilter);
          routes = routes.filter(routeRemoveIgnoreFilter);
          menuList.sort((a, b) => {
            return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0);
          });

          this.setFrontMenuList(menuList);
          // Convert multi-level routing to level 2 routing
          routes = flatMultiLevelRoutes(routes);
          break;
        }

        //  If you are sure that you do not need to do background dynamic permissions, please comment the entire judgment below
        case PermissionModeEnum.BACK: {
          const { createMessage } = useMessage();
          // const userStore = useUserStore();
          createMessage.loading({
            content: "菜单加载中...",
            duration: 1,
          });

          // !Simulate to obtain permission codes from the background,
          // this function may only need to be executed once, and the actual project can be put at the right time by itself
          let routeList: AppRouteRecordRaw[] = [];
          try {
            this.changePermissionCode();
            routeList = (await getMenuList()) as AppRouteRecordRaw[];
            // routeList.push({
            //   path: "/externals",
            //   name: "externals",
            //   component: "LAYOUT",
            //   redirect: "/externals/cms",
            //   meta: {
            //     orderNo: 10000,
            //     antIcon: "HomeFilled",
            //     // icon: "scale|svg",
            //     title: "外部跳转",
            //     // hideChildrenInMenu: true,
            //   },
            //   children: [
            //     {
            //       path: "cms",
            //       name: "cms",
            //       meta: {
            //         title: "内容中心",
            //         system: "cms",
            //         // hideMenu: true,
            //       },
            //       component: "/sys/externalSSO/index",
            //     },
            //     {
            //       path: "voc",
            //       name: "voc",
            //       meta: {
            //         system: "voc",

            //         title: "问卷调查",
            //       },
            //       component: "/sys/externalSSO/index",
            //     },
            //   ],
            // });
            this.setRouteList(routeList);
          } catch (error) {
            console.error(error);
          }

          // Dynamically introduce components
          routeList = transformObjToRoute(routeList);

          //  Background routing to menu structure
          const backMenuList = transformRouteToMenu(routeList);
          this.setBackMenuList(backMenuList);

          // remove meta.ignoreRoute item
          routeList = filter(routeList, routeRemoveIgnoreFilter);
          routeList = routeList.filter(routeRemoveIgnoreFilter);

          routeList = flatMultiLevelRoutes(routeList);
          routes = [PAGE_NOT_FOUND_ROUTE, ...routeList];
          break;
        }
      }

      // routes.push(ERROR_LOG_ROUTE);
      patchHomeAffix(routes);
      return routes;
    },
  },
});

// Need to be used outside the setup
export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}
