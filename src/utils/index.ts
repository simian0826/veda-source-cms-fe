import type {
  RouteLocationNormalized,
  RouteRecordNormalized,
} from "vue-router";
import type { App, Component } from "vue";

import { unref } from "vue";
import { isObject } from "/@/utils/is";
import { UploadFile, UploadProps } from "ant-design-vue";

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

/**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body;
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = "";
  for (const key in obj) {
    parameters += key + "=" + encodeURIComponent(obj[key]) + "&";
  }
  parameters = parameters.replace(/&$/, "");
  return /\?$/.test(baseUrl)
    ? baseUrl + parameters
    : baseUrl.replace(/\/?$/, "?") + parameters;
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key])
      ? deepMerge(src[key], target[key])
      : (src[key] = target[key]);
  }
  return src;
}

export function openWindow(
  url: string,
  opt?: {
    target?: TargetContext | string;
    noopener?: boolean;
    noreferrer?: boolean;
  },
) {
  const { target = "__blank", noopener = true, noreferrer = true } = opt || {};
  const feature: string[] = [];

  noopener && feature.push("noopener=yes");
  noreferrer && feature.push("noreferrer=yes");

  window.open(url, target, feature.join(","));
}

// dynamic use hook props
export function getDynamicProps<T, U>(props: T): Partial<U> {
  const ret: Recordable = {};

  Object.keys(props as Object).map((key) => {
    ret[key] = unref((props as Recordable)[key]);
  });

  return ret as Partial<U>;
}

export function getRawRoute(
  route: RouteLocationNormalized,
): RouteLocationNormalized {
  if (!route) return route;
  const { matched, ...opt } = route;
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  };
}
type EventShim = {
  new (...args: any[]): {
    $props: {
      onClick?: (...args: any[]) => void;
    };
  };
};
export type WithInstall<T> = T & {
  install(app: App): void;
} & EventShim;

export type CustomComponent = Component & { displayName?: string };

export const withInstall = <T extends CustomComponent>(
  component: T,
  alias?: string,
) => {
  (component as Record<string, unknown>).install = (app: App) => {
    const compName = component.name || component.displayName;
    if (!compName) return;
    app.component(compName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as WithInstall<T>;
};

/**
 *  分时执行函数
 * @param interval 执行间隔
 * @param executionCount 执行次数
 * @param callback 执行回调
 */
export function timeBasedExecution(
  interval: number,
  executionCount: number,
  callback: Fn,
) {
  let count = 0;
  function run() {
    if (count === executionCount) {
      return;
    }
    requestIdleCallback((idle) => {
      while (idle.timeRemaining() > 0 && count < executionCount) {
        setTimeout(() => {
          callback(count + 1);
          count++;
        }, interval);
      }
      run();
    });
  }
  run();
}

export function convertImageUrlToUploadParam(
  url: string | string[],
): UploadProps["fileList"] {
  if (Array.isArray(url)) {
    return url.map((item, index) => ({
      uid: `-${index}`,
      name: item.substring(item.lastIndexOf("/") + 1),
      status: "done",
      url: item,
      thumbUrl: item,
    }));
  } else {
    return [
      {
        uid: `-${1}`,
        name: url.substring(url.lastIndexOf("/") + 1),
        status: "done",
        url: url,
        thumbUrl: url,
      },
    ];
  }
}

export function convertImageUploadParamToUrl(
  uploadProps: UploadProps["fileList"] | UploadFile[],
): string | string[] {
  const result = uploadProps?.map((item) => {
    let fileUrl = "";
    if (item.url) {
      fileUrl = item.url;
    } else {
      fileUrl = item.response.data[0].url;
    }
    return fileUrl;
  });

  if (result?.length == 1) {
    return result[0];
  }

  return result ?? "";
}
