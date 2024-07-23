import { defHttp } from "/@/utils/http/axios";

// import { ErrorMessageMode } from "/#/axios";
import {
  UserListParamsModel,
  UserListResModel,
  UserUpdateModel,
  DetailResModel,
  PostItemModel,
  DltItemModel,
  RoleItemModel,
  DeptFilterDictModel,
  DealerItemModel,
  AreaItemModel,
} from "./model/userListModel";
enum Api {
  GetUserList = "/ark-gen2-system/user/page",
  GetUserDetail = "/ark-gen2-system/user/detail",
  UserInfoUpdate = "/ark-gen2-system/user/update",
  GetDealerGroupsOptions = "/ark-gen2-system/user/getDealerGroupsOptions",
  GetDealerPostsOptions = "/ark-gen2-system/user/getDealerPostsOptions",
  GetRoleOptions = "/ark-gen2-system/role/getRoleOptions",
  GetDeptTreeTop4 = "/ark-gen2-system/dept/deptTreeTop4",
  GetSevenRegion = "/ark-gen2-system/basic/allRegions",
  // GetAllProvince='/ark-gen2-system/openapi/media/getAllProvince',
  GetAllProvinceByRid = "/ark-gen2-system/basic/getAllProvinceByRid",
  GetCityByPid = "/ark-gen2-system/basic/getCityByPid",
  GetDealerByCid = "/ark-gen2-system/basic/getDealerByCid",
}

/**
 * @description: 获取经销商
 */
export function GetDealerByCidApi(cid: string | number) {
  return defHttp.get<DealerItemModel[]>({
    url: `${Api.GetDealerByCid}?cid=${cid}`,
  });
}
/**
 * @description: 根据省编码查城市
 */
export function GetCityByPidApi(pid: string | number) {
  return defHttp.get<DealerItemModel[]>({
    url: `${Api.GetCityByPid}?pid=${pid}`,
  });
}
/**
 * @description: 查询大区下所有省份
 */
export function GetAllProvinceByRidApi(sid: string | number) {
  return defHttp.get<DealerItemModel[]>({
    url: `${Api.GetAllProvinceByRid}?sid=${sid}`,
  });
}
/**
 * @description: 查询七大区
 */
export function GetSevenRegionApi() {
  return defHttp.get<AreaItemModel[]>({
    url: Api.GetSevenRegion,
  });
}
/**
 * @description: 获取前四级部门
 */
export function GetDeptTreeTop4Api() {
  return defHttp.get<DeptFilterDictModel[]>({
    url: Api.GetDeptTreeTop4,
  });
}
/**
 * @description: 获取用户角色下拉选项
 */
export function GetRoleOptionsApi(type?: string) {
  return defHttp.get<RoleItemModel[]>({
    url: type ? `${Api.GetRoleOptions}?type=${type}` : Api.GetRoleOptions,
  });
}
/**
 * @description: 获取经销商投资人集团下拉列表
 */
export function GetDealerGroupsOptionsApi() {
  return defHttp.get<DltItemModel[]>({
    url: Api.GetDealerGroupsOptions,
  });
}

/**
 * @description: 获取经销商岗位下拉列表
 */
export function GetDealerPostsOptionsApi() {
  return defHttp.get<PostItemModel[]>({
    url: Api.GetDealerPostsOptions,
  });
}

/**
 * @description: get user list api
 */
export function GetUserListApi(params: UserListParamsModel) {
  return defHttp.post<UserListResModel>({
    url: Api.GetUserList,
    params,
  });
}

/**
 * @description: get user detail api
 */
export function GetUserDetailApi(account: string) {
  return defHttp.get<DetailResModel>({
    url: `${Api.GetUserDetail}?account=${account}`,
  });
}

/**
 * @description: update user detail api
 */
export function UserInfoUpdateApi(params: UserUpdateModel) {
  return defHttp.post({
    url: Api.UserInfoUpdate,
    params,
  });
}
