import { defHttp } from "/@/utils/http/axios";
import type {
  GroupCodeModel,
  GroupCodesParams,
  GroupChatsParams,
  GroupCodesResponse,
  GroupChatsResModel,
  TagGroupItemModel,
  AddTagGroupParams,
  NewGroupCodesParams,
  GroupCodeDetailModel,
  UpdateTagsParams,
} from "./model/groupCodeModel";
enum Api {
  GroupCodeGroups = "/system/ewg/groupCodeGroups",
  GroupCodes = "/system/ewg/groupCodes",
  BatchDownload = "/system/ewg/groupCodes/batchDownload",
  GetGroupChats = "/system/groupChats",
  GetTagGroups = "/system/ew/tagGroups/all",
  ValidGroupName = "/system/ew/tagGroups/validate/groupName",
  TagGroups = "/system/ew/tagGroups",
  UpdateTags = "/system/ew/tags/updateTagValues",
}
/**
 * @description: 编辑群标签
 */
export function UpdateTagsApi(params: UpdateTagsParams) {
  return defHttp.post({
    url: Api.UpdateTags,
    params,
  });
}

/**
 * @description: 群活码详情
 */
export function GetGroupCodeDetailApi(id: number) {
  return defHttp.get<GroupCodeDetailModel>({
    url: Api.GroupCodes + "/" + id,
  });
}
/**
 * @description: 新建群活码
 */
export function NewGroupCodesApi(params: NewGroupCodesParams) {
  return defHttp.post({
    url: Api.GroupCodes,
    params,
  });
}

/**
 * @description: 删除标签
 */
export function DeleteTagGroupApi(id: number) {
  return defHttp.delete({
    url: `${Api.TagGroups}/${id}?id=${id}`,
  });
}

/**
 * @description: 添加标签
 */
export function AddTagGroupsApi(params: AddTagGroupParams) {
  return defHttp.post({
    url: Api.TagGroups,
    params,
  });
}

/**
 * @description: 校验分组名称
 */
export function ValidGroupNameApi(groupName: string) {
  return defHttp.get<boolean>({
    url: `${Api.ValidGroupName}?groupName=${groupName}`,
  });
}
/**
 * @description: 获取全部标签
 */
export function GetTagGroupsApi() {
  return defHttp.get<TagGroupItemModel[]>({
    url: Api.GetTagGroups,
  });
}

/**
 * @description: 获取客群列表
 */
export function GetGroupChatsApi(params: GroupChatsParams) {
  return defHttp.get<GroupChatsResModel>({
    url: `${Api.GetGroupChats}?pageNum=${params.pageNum}&pageSize=${params.pageSize}&groupName=${params.groupName}`,
  });
}

/**
 * @description: 批量下载二维码
 */
export function BatchDownloadQrCodeApi(params: number[]) {
  return defHttp.post<GroupCodeModel[]>({
    url: Api.BatchDownload,
    params,
    responseType: "blob",
  });
}
/**
 * @description: 编辑群活码
 */
export function EditGroupCodeApi(id: number, params: NewGroupCodesParams) {
  return defHttp.put({
    url: Api.GroupCodes + "/" + id,
    params,
  });
}
/**
 * @description: 下载群活码
 */
export function DownloadGroupCodeApi(id: number) {
  return defHttp.get<GroupCodeModel[]>({
    url: Api.GroupCodes + "/" + id + "/download",
    responseType: "blob",
  });
}
/**
 * @description: 删除群活码
 */
export function DeleteGroupCodeApi(id: number) {
  return defHttp.delete<GroupCodeModel[]>({
    url: Api.GroupCodes + "/" + id,
  });
}
/**
 * @description: 获取群活码列表
 */
export function GetGroupCodesListApi(params: GroupCodesParams) {
  return defHttp.get<GroupCodesResponse>({
    url: `${Api.GroupCodes}?${
      params.groupId ? `groupId=${params.groupId}&` : ""
    }pageNum=${params.pageNum}&pageSize=${params.pageSize}&groupCodeName=${
      params.groupCodeName
    }`,
  });
}

/**
 * @description: 获取群活码分组
 */
export function GetGroupCodeGroupsApi() {
  return defHttp.get<GroupCodeModel[]>({
    url: Api.GroupCodeGroups,
  });
}

/**
 * @description: 新建群活码分组
 */
export function NewGroupCodeGroupsApi(params: { groupName: string }) {
  return defHttp.post({
    url: Api.GroupCodeGroups,
    params,
  });
}

/**
 * @description: 修改群活码分组
 */
export function UpdateGroupCodeGroupsApi(
  params: { groupName: string },
  id: number,
) {
  return defHttp.put({
    url: `${Api.GroupCodeGroups}/${id}`,
    params,
  });
}

/**
 * @description: 删除群活码分组
 */
export function DeleteGroupCodeGroupsApi(id: number) {
  return defHttp.delete({
    url: `${Api.GroupCodeGroups}/${id}`,
  });
}
