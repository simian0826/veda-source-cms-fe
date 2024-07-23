import type { RouteRecordRaw } from "vue-router";

import { useAppStore } from "/@/store/modules/app";
import { usePermissionStore } from "/@/store/modules/permission";
import { useUserStore } from "/@/store/modules/user";

import { useTabs } from "./useTabs";

import { router, resetRouter } from "/@/router";
// import { RootRoute } from '/@/router/routes';

import projectSetting from "/@/settings/projectSetting";
import { PermissionModeEnum } from "/@/enums/appEnum";
import { RoleEnum } from "/@/enums/roleEnum";

import { intersection } from "lodash-es";
import { isArray } from "/@/utils/is";
import { useMultipleTabStore } from "/@/store/modules/multipleTab";
import { PermissionEnum } from "/@/enums/permissionEnum";
import { RoleInfo } from "/@/api/sys/model/userModel";

// User permissions related operations
export function usePermission() {
  const userStore = useUserStore();
  const appStore = useAppStore();
  const permissionStore = usePermissionStore();
  const { closeAll } = useTabs(router);

  /**
   * Change permission mode
   */
  async function togglePermissionMode() {
    appStore.setProjectConfig({
      permissionMode:
        projectSetting.permissionMode === PermissionModeEnum.BACK
          ? PermissionModeEnum.ROUTE_MAPPING
          : PermissionModeEnum.BACK,
    });
    location.reload();
  }

  /**
   * Reset and regain authority resource information
   * @param id
   */
  async function resume() {
    const tabStore = useMultipleTabStore();
    tabStore.clearCacheTabs();
    resetRouter();
    const routes = await permissionStore.buildRoutesAction();
    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });
    permissionStore.setLastBuildMenuTime();
    closeAll();
  }

  /**
   * Determine whether there is permission
   */
  function hasPermission(
    value?: RoleInfo | RoleInfo[] | string | string[] | PermissionEnum[],
    def = true,
  ): boolean {
    // Visible by default
    if (!value) {
      return def;
    }

    const permMode = projectSetting.permissionMode;

    if (
      [PermissionModeEnum.ROUTE_MAPPING, PermissionModeEnum.ROLE].includes(
        permMode,
      )
    ) {
      // if (!isArray(value)) {
      //   return userStore.getRoleList?.includes(value as RoleInfo);
      // }
      return (
        (intersection(value, userStore.getRoleList) as RoleEnum[]).length > 0
      );
    }

    if (PermissionModeEnum.BACK === permMode) {
      const allCodeList = permissionStore.getPermCodeList as PermissionEnum[];
      if (!isArray(value)) {
        return allCodeList.includes(value as PermissionEnum);
      }
      return (intersection(value, allCodeList) as string[]).length > 0;
    }
    return true;
  }

  /**
   * Change roles
   * @param roles
   */
  // async function changeRole(roles: RoleInfo | RoleInfo[]): Promise<void> {
  //   if (projectSetting.permissionMode !== PermissionModeEnum.ROUTE_MAPPING) {
  //     throw new Error(
  //       "Please switch PermissionModeEnum to ROUTE_MAPPING mode in the configuration to operate!",
  //     );
  //   }

  //   if (!isArray(roles)) {
  //     roles = [roles];
  //   }
  //   userStore.setRoleList(roles);
  //   await resume();
  // }

  /**
   * refresh menu data
   */
  async function refreshMenu() {
    resume();
  }

  return { hasPermission, togglePermissionMode, refreshMenu };
}
