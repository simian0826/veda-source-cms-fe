import {
  DropDownRespModal,
  OemListRequestModal,
  OptionModel,
} from "./model/activityChannelModel";
import {
  ChannelSearchModal,
  ChannelTableRespModal,
  DealerDetailModal,
  OemDetailModal,
} from "./model/activityModel";
import { ContentTypeEnum } from "/@/enums/httpEnum";
import { defHttp } from "/@/utils/http/axios";

enum Api {
  GetActivityFilter = "/gen2-system/leadCampaign/getFilterList",
  GetActivityList = "/gen2-system/leadCampaign/getOemCampaignList",
  GetDealerCampList = "/gen2-system/leadCampaign/getDealerCampaignList",
  GetDealerByOemCampList = "/gen2-system/leadCampaign/getOemFromDealerCampaignList",
  GetActListByDlr = "/gen2-system/leadCampaign/getDealerFromOemCampaignList",
  GetOemLeadById = "/gen2-system/leadCampaign/getOemLeadById",
  GetDealerLeadById = "/gen2-system/leadCampaign/getDealerDetailById",
  GetOemDealerById = "/gen2-system/leadCampaign/getOemFromDealerDetailById",
  InsertDealerLeadCampaign = "/gen2-system/leadCampaign/insertDealerLeadCampaign",
  InsertOemLeadCampaign = "/gen2-system/leadCampaign/insertOemLeadCampaign",
  UpdateOemCampaign = "/gen2-system/leadCampaign/updateOemCampaign",
  UpdateDealerCampaign = "/gen2-system/leadCampaign/updateDealerCampaign",
  GetBussinessType = "/gen2-system/leadCampaign/businessCtgryList",
  ExportOemActList = "/gen2-system/leadCampaign/exportOemCampaignList",
  ExportDealerActList = "/gen2-system/leadCampaign/exportDealerCampaignList",
  GetDeptOfUser = "/gen2-system/leadCampaign/getDeptOfUser",

  // 详情页
  GetPlanningNumber = "/gen2-system/leadCampaign/getPlanningNumber",
  GetAreaDlr = "/gen2-system/dealer/getDealerOfAreaList",
  DlrShareFilter = "/gen2-system/leadCampaign/dlrShareFilter",

  // A 卡
  ACardCampList = "/gen2-system/leadCampaign/dlrCardCampList",
  ACardDownload = "/gen2-register/register-record/a-card-download",
  ACardImport = "/gen2-register/register-record/a-card-import",
  // 潜客
  PotentialCampList = "/gen2-system/leadCampaign/dlrLeadCampList",
  PotentialDownload = "/gen2-register/register-record/potential-customer-download",
  PotentialImport = "/gen2-register/register-record/potential-customer-import",
  // 厂商潜客
  OemPotentialCampList = "/gen2-system/leadCampaign/oemLeadCampList",
  OemPotentialImport = "/gen2-register/register-record/oem-potential-cus-import",
  OemPotentialDownload = "/gen2-register/register-record/oem-potential-cus-download",
}

export const GetActivityFilterApi = (params: OemListRequestModal) => {
  return defHttp.post({
    url: Api.GetActivityFilter,
    params,
  });
};

export const GetActivityListApi = (
  params: ChannelSearchModal,
): Promise<ChannelTableRespModal> => {
  return defHttp.post({
    url: Api.GetActivityList,
    params,
  });
};

// 厂商 经销商视角
export const GetActivityListByDlrApi = (
  params: ChannelSearchModal,
): Promise<ChannelTableRespModal> => {
  return defHttp.post({
    url: Api.GetActListByDlr,
    params,
  });
};

export const GetActDeptUserApi = () => {
  return defHttp.get({
    url: Api.GetDeptOfUser,
  });
};

export const GetDealerCampListApi = (
  params: ChannelSearchModal,
): Promise<ChannelTableRespModal> => {
  return defHttp.post({
    url: Api.GetDealerCampList,
    params,
  });
};

// 经销商 厂商视角
export const GetDealerByOemCampListApi = (
  params: ChannelSearchModal,
): Promise<ChannelTableRespModal> => {
  return defHttp.post({
    url: Api.GetDealerByOemCampList,
    params,
  });
};

// 厂商视角详情
export const GetOemLeadByIdApi = (id: number): Promise<OemDetailModal> => {
  return defHttp.get({
    url: `${Api.GetOemLeadById}?id=${id}`,
  });
};
// 经销商视角
export const GetOemDealerByIdApi = (id: number): Promise<OemDetailModal> => {
  return defHttp.get({
    url: `${Api.GetOemDealerById}?id=${id}`,
  });
};
export const GetDealerLeadByIdApi = (
  id: number,
): Promise<DealerDetailModal> => {
  return defHttp.get({
    url: `${Api.GetDealerLeadById}?id=${id}`,
  });
};

// 创建
export const InsertOemCampaignApi = (params: OemDetailModal) => {
  return defHttp.post({
    url: Api.InsertOemLeadCampaign,
    params,
  });
};
export const InsertDealerCampaignApi = (params: DealerDetailModal) => {
  return defHttp.post({
    url: Api.InsertDealerLeadCampaign,
    params,
  });
};

// 更新
export const UpdateOemCampaignApi = (params: OemDetailModal) => {
  return defHttp.post({
    url: Api.UpdateOemCampaign,
    params,
  });
};
export const UpdateDealerCampaignApi = (params: DealerDetailModal) => {
  return defHttp.post({
    url: Api.UpdateDealerCampaign,
    params,
  });
};

// 经销商 导出
export const DealerActExportApi = (params: ChannelSearchModal) => {
  return defHttp.post({
    url: Api.ExportDealerActList,
    params,
  });
};
// 厂商 导出
export const OemActExportApi = (params: ChannelSearchModal) => {
  return defHttp.post({
    url: Api.ExportOemActList,
    params,
  });
};

// 业务类型
export const GetBussinessTypeApi = (params: DropDownRespModal) => {
  return defHttp.post({
    url: Api.GetBussinessType,
    params,
  });
};

// 详情页
// 决裁编号
export const GetPlanningNumberApi = (params: string) => {
  return defHttp.get({
    url: `${Api.GetPlanningNumber}?filterValue=${params}`,
  });
};
// 投放区域和经销商
export function GetAreaDlrApi() {
  return defHttp.get<OptionModel[]>({
    url: Api.GetAreaDlr,
  });
}
// 是否共享经销商
export function DlrShareFilterApi(params: { id: string[] }) {
  return defHttp.post({
    url: Api.DlrShareFilter,
    params,
  });
}

// 批量导入A卡获客活动
export function getDLRCardCampList(params) {
  return defHttp.post({
    url: Api.ACardCampList,
    params,
  });
}
// 批量导入A卡模板下载
export function downloadByACard(params) {
  return defHttp.post({
    url: Api.ACardDownload,
    responseType: "blob",
    params,
  });
}

// 批量导入A卡模板导入
export function importByACard(params) {
  return defHttp.post({
    url: Api.ACardImport,
    headers: {
      "Content-type": ContentTypeEnum.FORM_DATA,
      ignoreCancelToken: true,
    },
    params,
  });
}
// 批量导入潜客获客活动
export function getCampListByPotenial(params) {
  return defHttp.post({
    url: Api.PotentialCampList,
    params,
  });
}
// 批量导入潜客模板下载
export function downloadByPotential(params) {
  return defHttp.post({
    url: Api.PotentialDownload,
    responseType: "blob",
    params,
  });
}

// 批量导入潜客模板导入
export function importByPotential(params) {
  return defHttp.post({
    url: Api.PotentialImport,
    headers: {
      "Content-type": ContentTypeEnum.FORM_DATA,
      ignoreCancelToken: true,
    },
    params,
  });
}

// 批量导入厂商潜客获客活动
export function getCampListByOemPotenial(params) {
  return defHttp.post({
    url: Api.OemPotentialCampList,
    params,
  });
}
// 批量导入厂商潜客模板下载
export function downloadByOemPotential(params) {
  return defHttp.get({
    url: Api.OemPotentialDownload,
    responseType: "blob",
    params,
  });
}

// 批量导入厂商潜客模板导入
export function importByOemPotential(params) {
  return defHttp.post({
    url: Api.OemPotentialImport,
    headers: {
      "Content-type": ContentTypeEnum.FORM_DATA,
      ignoreCancelToken: true,
    },
    params,
  });
}
