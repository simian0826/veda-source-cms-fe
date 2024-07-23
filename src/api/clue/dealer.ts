import { defHttp } from "/@/utils/http/axios";
// import { getMenuListResultModel } from "./model/menuModel";
import { ContentTypeEnum } from "/@/enums/httpEnum";
enum Api {
  GetDealerList = "/gen2-lead/dealerLead/page",
  CreateDealerLead = "/gen2-lead/dealerLead/createDealerLead",
  GetDealerLeadAndCustomer = "/gen2-lead/dealerLead/getDealerLeadAndCustomer",
  GetDealerDetail = "/gen2-lead/dealerLead/getDealerLeadDetail",
  DownLoadDeaulft = "/gen2-register/register-record/potential-customer-download",
  UpLoadImports = "/gen2-register/register-record/potential-customer-import",
  UcarBrands = "/gen2-system/ucar/brands",
  UcarSeries = "/gen2-system/ucar/series",
  LeadAssign = "/gen2-lead/dealerLead/dealerLeadAssign",
  UpdateById = "/gen2-lead/dealerLead/updateById",

  // 附带条目
  AttachOrderList = "/gen2-system/retailOrder/page",
  AttachReservatList = "/gen2-lead/leadReservation/getReservationPageByLead",
  AttachMeetList = "/gen2-lead/meetRecord/getMeetPageByLead",
  AttachTestDriveList = "/gen2-lead/testDrive/getDrivePageByLead",
  //活动渠道

  //列表活动
  leadOperationCampList = "/gen2-system/leadCampaign/leadOperationCampList",

  //列表渠道
  leadOperationChannelList = "/gen2-system/leadCampaign/leadOperationChannelList",

  //新建活动
  dlrLeadCampList = "/gen2-system/leadCampaign/dlrLeadCampList",

  //新建渠道
  dlrLeadChannelList = "/gen2-system/leadCampaign/dlrLeadChannelList",
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

  //获取线索详情的留资信息
  dlrLeadRecordList = "/gen2-register/register-record/queryRecordByDlrLeadId",

  //获取经销商
  GetDealerOfAreaList = "/gen2-system/dealer/getDealerOfAreaList",

  //获取经销商投资人集团
  GetDealerGroupList = "/gen2-system/dealer/getDealerGroupList",
}

export function leadOperationCampList(params) {
  return defHttp.post({
    url: Api.leadOperationCampList,
    params,
  });
}
export function leadOperationChannelList(params) {
  return defHttp.post({
    url: Api.leadOperationChannelList,
    params,
  });
}
export function dlrLeadCampList(params) {
  return defHttp.post({
    url: Api.dlrLeadCampList,
    params,
  });
}
export function dlrLeadChannelList(params) {
  return defHttp.post({
    url: Api.dlrLeadChannelList,
    params,
  });
}
/**
 * @description: 线索列表
 */

export function GetDealerList(params) {
  return defHttp.post({
    url: Api.GetDealerList,
    params,
  });
}
export function CreateDealerLead(params) {
  return defHttp.post({
    url: Api.CreateDealerLead,
    params,
  });
}
export function GetDealerLeadAndCustomer(params) {
  return defHttp.get({
    url: Api.GetDealerLeadAndCustomer,
    params,
  });
}
export function GetDealerDetail(params) {
  return defHttp.get({
    url: Api.GetDealerDetail,
    params,
  });
}
export function DownLoadDeaulft() {
  return defHttp.get({
    url: Api.DownLoadDeaulft,
    responseType: "blob",
  });
}
export function UpLoadImports(params) {
  return defHttp.post({
    url: Api.UpLoadImports,
    headers: {
      "Content-type": ContentTypeEnum.FORM_DATA,
      ignoreCancelToken: true,
    },
    params,
  });
}

export function UcarBrands() {
  return defHttp.get({
    url: Api.UcarBrands,
  });
}

export function UcarSeries(params) {
  return defHttp.get({
    url: Api.UcarSeries,
    params,
  });
}

export function LeadAssignApi(params) {
  return defHttp.post({
    url: Api.LeadAssign,
    params,
  });
}

// 附带条目
// 订单
export function AttachOrderListApi(params) {
  return defHttp.post({
    url: `${Api.AttachOrderList}`,
    params: params,
  });
}
// 预约
export function AttachReservatListApi(params) {
  return defHttp.post({
    url: Api.AttachReservatList,
    params,
  });
}
// 接待
export function AttachMeetListApi(params) {
  return defHttp.post({
    url: Api.AttachMeetList,
    params,
  });
}
// 试乘试驾
export function AttachTestDriveApi(params) {
  return defHttp.post({
    url: Api.AttachTestDriveList,
    params,
  });
}

// 线索更新
export function UpdateByIdApi(params) {
  return defHttp.post({
    url: Api.UpdateById,
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
// 批量导入A卡模板下载
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
// 线索详情获取留资信息
export function dlrLeadRecordListApi(params) {
  return defHttp.get({
    url: `${Api.dlrLeadRecordList}`,
    params: params,
  });
}

export function GetDealerOfAreaListApi(params) {
  return defHttp.get({
    url: Api.GetDealerOfAreaList,
    params,
  });
}

export function GetDealerGroupListApi(params) {
  return defHttp.get({
    url: Api.GetDealerGroupList,
    params,
  });
}
