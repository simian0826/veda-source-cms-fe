import { defHttp } from "/@/utils/http/axios";
import {
  SSOLoginParams,
  LoginParams,
  LoginResultModel,
  GetUserInfoModel,
} from "./model/userModel";

import { ErrorMessageMode } from "/#/axios";
import { PermissionEnum } from "/@/enums/permissionEnum";

enum Api {
  Login = "/login",
  SSOLogin = "/auth/portalSsoLogin",
  Logout = "/auth/logout",
  SSOLogout = "/auth/portalSsoLogout",
  GetUserInfo = "/gen2-system/user/getUserInfo",
  GetPermCode = "/gen2-system/user/getUserPermCodes",
  ChangeRole = "/gen2-system/user/changeLoginRole",
  RefreshToken = "/auth/refreshPortalToken",
  ExternalSSO = "/gen2-system/menu/getMenuSsoUrl",
}

/**
 * @description: user login api
 */
export function loginApi(
  params: LoginParams,
  mode: ErrorMessageMode = "modal",
) {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: user login api by sso
 */
export function ssoLoginApi(
  params: SSOLoginParams,
  mode: ErrorMessageMode = "modal",
) {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.SSOLogin,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfoApi() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo });
}

/**
 * @description: changeRole
 */
export function changeRoleApi(params: { roleId: number }) {
  return defHttp.post<string>({
    url: `${Api.ChangeRole}/${params.roleId}`,
  });
}

export function getPermCodeApi() {
  return defHttp.get<PermissionEnum[]>({ url: Api.GetPermCode });
}

export function doLogoutApi() {
  return defHttp.delete({ url: Api.Logout });
}
export function doSSOLogoutApi() {
  return defHttp.post({ url: Api.SSOLogout });
}

export function refreshTokenApi() {
  return defHttp.post({ url: Api.RefreshToken });
}

export function fetchExternalSSOUrlApi(params: { system: string }) {
  return defHttp.get<string>({
    url: `${Api.ExternalSSO}`,
    params,
  });
}
