import { defHttp } from "/@/utils/http/axios";

import {
  RoleNameModel,
  RoleDetailModel,
  RoleListParamsModel,
  RoleListResModel,
  SaveRoleParamsModel,
  BindUserRoleParamsModel,
  RoleMenuModel,
  DataPermissionParams,
  DataPermissionResItemModel,
  InsertDataPermissionParams,
  UpdatePrivileParam,
  SaveMenuPermissionParams,
} from "./model/roleListModel";
enum Api {
  GetRoleName = "/ark-gen2-system/role/getRoleNameOptions",
  GetRoleDetail = "/ark-gen2-system/role/detail",
  Disable = "/ark-gen2-system/role/disable",
  Enable = "/ark-gen2-system/role/enable",
  GetRoleList = "/ark-gen2-system/role/page",
  SaveRole = "/ark-gen2-system/role/save",
  BindUserRole = "/ark-gen2-system/user/bindUserRole",
  DeleteUserRole = "/ark-gen2-system/user/deleteUserRole",
  DataPermissionFilter = "/ark-gen2-system/dataPermission/dataPermissionFilter",
  GetRoleMenu = "/ark-gen2-system/menu/getRoleMenu",
  DataPermissionList = "/ark-gen2-system/dataPermission/dataPermissionList",
  InsertDataPermission = "/ark-gen2-system/dataPermission/insertDataPermission",
  UpdateDataPermission = "/ark-gen2-system/dataPermission/updateDataPermission",
  UpdatePrivilegeValue = "/ark-gen2-system/dataPermission/updatePrivilegeValue",
  SaveMenuPermission = "/ark-gen2-system/dataPermission/saveMenuPermission",
}
/**
 * @description: 保存角色菜单与数据权限
 */
export function SaveMenuPermissionApi(params: SaveMenuPermissionParams) {
  return defHttp.post({
    url: Api.SaveMenuPermission,
    params,
  });
}
/**
 * @description: 更新数据权限自定义值
 */
export function UpdatePrivilegeValueApi(params: UpdatePrivileParam) {
  return defHttp.post({
    url: Api.UpdatePrivilegeValue,
    params,
  });
}
/**
 * @description: 更新数据权限
 */
export function UpdateDataPermissionApi(params: InsertDataPermissionParams) {
  return defHttp.post({
    url: Api.UpdateDataPermission,
    params,
  });
}

/**
 * @description: 新增数据权限
 */
export function InsertDataPermissionApi(params: InsertDataPermissionParams) {
  return defHttp.post({
    url: Api.InsertDataPermission,
    params,
  });
}
/**
 * @description: 数据权限列表
 */
export function DataPermissionListApi(params: DataPermissionParams) {
  return defHttp.post<DataPermissionResItemModel[]>({
    url: Api.DataPermissionList,
    params,
  });
}
/**
 * @description: 页面资源权限树状图数据
 */
export function GetRoleMenuApi(roleId: string) {
  return defHttp.get<RoleMenuModel[]>({
    url: `${Api.GetRoleMenu}?roleId=${roleId}`,
  });
}
/**
 * @description: 数据权限筛选器
 */
export function DataPermissionFilterApi(filterType: string) {
  return defHttp.get<string[]>({
    url: `${Api.DataPermissionFilter}?filterType=${filterType}`,
  });
}
/**
 * @description: 解除用户与角色绑定
 */
export function DeleteUserRoleApi(params: BindUserRoleParamsModel) {
  return defHttp.post({
    url: Api.DeleteUserRole,
    params,
  });
}

/**
 * @description: 绑定用户与角色
 */
export function BindUserRoleApi(params: BindUserRoleParamsModel) {
  return defHttp.post({
    url: Api.BindUserRole,
    params,
  });
}

/**
 * @description: 保存角色
 */
export function SaveRoleApi(params: SaveRoleParamsModel) {
  return defHttp.post({
    url: Api.SaveRole,
    params,
  });
}
/**
 * @description: 角色列表
 */
export function GetRoleListApi(params: RoleListParamsModel) {
  return defHttp.post<RoleListResModel>({
    url: Api.GetRoleList,
    params,
  });
}
/**
 * @description: 启用角色
 */
export function EnableApi(roleId: string) {
  return defHttp.post({
    url: `${Api.Enable}?roleId=${roleId}`,
  });
}

/**
 * @description: 禁用角色
 */
export function DisableApi(roleId: string) {
  return defHttp.post({
    url: `${Api.Disable}?roleId=${roleId}`,
  });
}

/**
 * @description: 角色详情接口
 */
export function GetRoleDetailApi(roleId: string) {
  return defHttp.get<RoleDetailModel>({
    url: `${Api.GetRoleDetail}?roleId=${roleId}`,
  });
}

/**
 * @description: 获取角色名称下拉
 */
export function GetRoleNameApi() {
  return defHttp.get<RoleNameModel>({
    url: Api.GetRoleName,
  });
}
