import {
  ActivateModal,
  DealerDeatilModal,
  DealerTableReqModal,
  DealerTableRespModal,
  DropDownOptionModal,
  DropDownRespModal,
  OemDetailResponseModal,
  OemListRequestModal,
  OemTableReqModal,
  OemTableRespModal,
} from "./model/activityChannelModel";
import { ContentTypeEnum } from "/@/enums/httpEnum";
import { defHttp } from "/@/utils/http/axios";

enum Api {
  GetFilterList = "/gen2-system/leadChannel/getFilterList",
  GetTableList = "/gen2-system/leadChannel/getOemChannelPageList",
  GetDealerTableList = "/gen2-system/leadChannel/getDealerChannelPageList",
  GetDealerByOemTableList = "/gen2-system/leadChannel/getOemFormDealerChannelPageList",
  GetDetailById = "/gen2-system/leadChannel/getOemLeadChannelById",
  GetOemFromDealerDetailById = "/gen2-system/leadChannel/getOemFromDealerDetailById",
  GetDealerDetailById = "/gen2-system/leadChannel/getDealerDetailById",
  InsertOemChannel = "/gen2-system/leadChannel/insertOemChannel",
  InsertDealerChannel = "/gen2-system/leadChannel/insertDealerChannel",
  UpdateChannel = "/gen2-system/leadChannel/updateOemChannel",
  UpdateDealerChannel = "/gen2-system/leadChannel/updateDealerChannel",
  UpdateChannelActivate = "/gen2-system/leadChannel/updateChannelActivate",
  DeleteDlrChannel = "/gen2-system/leadChannel/deleteDealerChannel",
  DealerChannelExport = "/gen2-system/leadChannel/exportDealerChannelList",
  OemChannelExport = "/gen2-system/leadChannel/exportOemChannelList",
  GetChannelNameDropDown = "/gen2-system/leadChannel/getChannelNameDropDown",
  GetDeptOfUser = "/gen2-system/leadChannel/getDeptOfUser",
  UploadAttach = "/gen2-system/attachment/upload",
  FileUrl = "/gen2-system/attachment/fileUrl",
}

// 筛选器
export const GetFilterListApi = (params: OemListRequestModal) => {
  return defHttp.post({
    url: Api.GetFilterList,
    params,
  });
};
// 渠道
export const GetChannelNameDropDownApi = (
  params: DropDownRespModal,
): Promise<DropDownOptionModal[]> => {
  return defHttp.get({
    url: Api.GetChannelNameDropDown,
    params,
  });
};
// 部室担当
export const GetDeptOfUserApi = () => {
  return defHttp.get({
    url: Api.GetDeptOfUser,
  });
};

// 厂商 表格
export const GetTableListApi = (
  params: OemTableReqModal,
): Promise<OemTableRespModal> => {
  return defHttp.post({
    url: Api.GetTableList,
    params,
  });
};
// 经销商 表格
export const GetDealerTableListApi = (
  params: DealerTableReqModal,
): Promise<DealerTableRespModal> => {
  return defHttp.post({
    url: Api.GetDealerTableList,
    params,
  });
};
// 经销商 厂商视角 表格
export const GetDealerByOemTableListApi = (
  params: DealerTableReqModal,
): Promise<DealerTableRespModal> => {
  return defHttp.post({
    url: Api.GetDealerByOemTableList,
    params,
  });
};

// 启用 停用
export const UpdateChannelActivateApi = (params: ActivateModal) => {
  return defHttp.post({
    url: Api.UpdateChannelActivate,
    params,
  });
};

// 经销商 删除
export const DeleteDlrChannelApi = (id: number) => {
  return defHttp.get({
    url: `${Api.DeleteDlrChannel}?id=${id}`,
  });
};

// 厂商 详情
export const GetDetailByIdApi = (
  id: number,
): Promise<OemDetailResponseModal> => {
  return defHttp.get({
    url: `${Api.GetDetailById}?id=${id}`,
  });
};
// 厂商 - 经销商视角 详情
export const GetOemByDlrDetailByIdApi = (
  id: number,
): Promise<OemDetailResponseModal> => {
  return defHttp.get({
    url: `${Api.GetOemFromDealerDetailById}?id=${id}`,
  });
};
// 经销商 详情
export const GetDealerDetailByIdApi = (
  id: number,
): Promise<DealerDeatilModal> => {
  return defHttp.get({
    url: `${Api.GetDealerDetailById}?id=${id}`,
  });
};

// 厂商 创建
export const InsertOemChannelApi = (params: OemDetailResponseModal) => {
  return defHttp.post({
    url: Api.InsertOemChannel,
    params,
  });
};
// 经销商 创建
export const InsertDealerChannelApi = (params: DealerDeatilModal) => {
  return defHttp.post({
    url: Api.InsertDealerChannel,
    params,
  });
};

// 厂商 修改
export const UpdateChannelApi = (params: OemDetailResponseModal) => {
  return defHttp.post({
    url: Api.UpdateChannel,
    params,
  });
};
// 经销商 修改
export const UpdateDealerChannelApi = (params: DealerDeatilModal) => {
  return defHttp.post({
    url: Api.UpdateDealerChannel,
    params,
  });
};

// 经销商 导出
export const DealerExportApi = (params: DealerTableReqModal) => {
  return defHttp.post({
    url: Api.DealerChannelExport,
    params,
  });
};
// 厂商 导出
export const OemExportApi = (params: OemTableReqModal) => {
  return defHttp.post({
    url: Api.OemChannelExport,
    params,
  });
};

// 附件上传
export const UploadAttachApi = (params) => {
  return defHttp.post({
    url: `${Api.UploadAttach}/${params.moduleName}`,
    headers: {
      "Content-type": ContentTypeEnum.FORM_DATA,
      ignoreCancelToken: true,
    },
    params,
  });
};
// 获取临时 url
export const FileUrlApi = (id: number) => {
  return defHttp.get({
    url: `${Api.FileUrl}/${id}`,
  });
};
