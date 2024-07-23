import { defHttp } from "/@/utils/http/axios";
import type {
  ChannelGroupCodeItemModel,
  MenberItemModel,
  ChannelListParams,
  ChannelResModel,
  CustomerListResModel,
} from "./model/channelCodeModel";
enum Api {
  ChannelLiveCodeGroup = "/system/channelLiveCodeGroup/list",
  NewChannelLiveCodeGroup = "/system/channelLiveCodeGroup/save",
  UpdateGroupName = "/system/channelLiveCodeGroup/updateGroupName",
  RemoveChannelLiveCodeGroup = "/system/channelLiveCodeGroup/remove",
  ListCr = "/system/customer/listCr",
  GetChannelLiveCodeList = "/system/channelLiveCode/list",
  QrCodeDownload = "/system/channelLiveCode/download",
  QrCodeDownloadBatch = "/system/channelLiveCode/downloadBatch",
  RemovechannelLiveCode = "/system/channelLiveCode/remove",
  GetCustomerList = "/system/channelLiveCode/customerList",
}
/**
 * @description: 获取客户列表
 */
export function GetCustomerListApi(
  id: number,
  pageNum: number,
  pageSize: number,
) {
  return defHttp.get<CustomerListResModel>({
    url: `${Api.GetCustomerList}?clcCodeId=${id}&pageNum=${pageNum}&pageSize=${pageSize}`,
  });
}
/**
 * @description: 渠道活码删除
 */
export function RemovechannelLiveCodeApi(id: number) {
  return defHttp.delete({
    url: `${Api.RemovechannelLiveCode}/${id}`,
  });
}
/**
 * @description: 二维码批量下载
 */
export function QrCodeDownloadBatchApi(params: { ids: number[] }) {
  return defHttp.post({
    url: Api.QrCodeDownloadBatch,
    responseType: "blob",
    params,
  });
}
/**
 * @description: 二维码下载
 */
export function QrCodeDownloadApi(id: number) {
  return defHttp.get({
    url: `${Api.QrCodeDownload}/${id}`,
    responseType: "blob",
  });
}
/**
 * @description: 获取渠道活码列表
 */
export function GetChannelLiveCodeListApi(params: ChannelListParams) {
  return defHttp.get<ChannelResModel>({
    url: `${Api.GetChannelLiveCodeList}?groupId=${params.groupId}&crId=${params.crId}&pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
  });
}
/**
 * @description: 获取成员下拉列表
 */
export function GetListCrApi() {
  return defHttp.get<MenberItemModel[]>({
    url: Api.ListCr,
  });
}
/**
 * @description: 删除渠道活码
 */
export function RemoveChannelLiveCodeGroupApi(id: number) {
  return defHttp.delete({
    url: `${Api.RemoveChannelLiveCodeGroup}/${id}`,
  });
}

/**
 * @description: 编辑渠道活码
 */
export function UpdateGroupNameApi(
  params: { name: string; id: number },
  id: number,
) {
  return defHttp.put({
    url: `${Api.UpdateGroupName}/${id}`,
    params,
  });
}
/**
 * @description: 新建渠道活码分组
 */
export function NewChannelLiveCodeGroupApi(groupName: string) {
  return defHttp.post({
    url: `${Api.NewChannelLiveCodeGroup}?groupNames=${groupName}`,
  });
}

/**
 * @description: 获取渠道活码分组列表
 */
export function GetChannelLiveCodeGroupApi() {
  return defHttp.get<ChannelGroupCodeItemModel[]>({
    url: Api.ChannelLiveCodeGroup,
  });
}
