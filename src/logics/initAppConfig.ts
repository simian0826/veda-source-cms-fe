/**
 * Application configuration
 */

import { PROJ_CFG_KEY } from "../enums/cacheEnum";
import projectSetting from "../settings/projectSetting";
import { useAppStore } from "../store/modules/app";
import { deepMerge } from "../utils";
import { Persistent } from "../utils/cache/persistent";
import { ProjectConfig } from "/#/config";
import { useLocaleStore } from "/@/store/modules/locale";

import { getCommonStoragePrefix, getStorageShortName } from "/@/utils/env";

// Initial project configuration
export function initAppConfigStore() {
  const localeStore = useLocaleStore();
  const appStore = useAppStore();
  let projCfg: ProjectConfig = Persistent.getLocal(
    PROJ_CFG_KEY,
  ) as ProjectConfig;
  projCfg = deepMerge(projectSetting, projCfg || {});
  appStore.setProjectConfig(projCfg);
  // init store
  localeStore.initLocale();

  setTimeout(() => {
    clearObsoleteStorage();
  }, 16);
}

/**
 * As the version continues to iterate, there will be more and more cache keys stored in localStorage.
 * This method is used to delete useless keys
 */
export function clearObsoleteStorage() {
  const commonPrefix = getCommonStoragePrefix();
  const shortPrefix = getStorageShortName();

  [localStorage, sessionStorage].forEach((item: Storage) => {
    Object.keys(item).forEach((key) => {
      if (key && key.startsWith(commonPrefix) && !key.startsWith(shortPrefix)) {
        item.removeItem(key);
      }
    });
  });
}
