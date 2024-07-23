import { defHttp } from "/@/utils/http/axios";
import {
  CarParamsModel,
  CreateParamsModel,
  DraftListModel,
  DraftParamsModel,
  ForMalParamsModel,
  FormalListModel,
  OrderBatchModel,
  OrderCntModel,
  OrderDetailModel,
  OrderParamsModel,
  PreSaleListModel,
  PreSaleParamsModel,
  carLevelModel,
  colorModel,
  displacementModel,
  dlrCdModel,
  leadDataModel,
  powerTypesModel,
  seriesModel,
  sfxModel,
} from "./model/orderModel";
import { BasicFetchResult } from "../model/baseModel";
import { ContentTypeEnum } from "/@/enums/httpEnum";

enum Api {
  getOrderList = "/ark-gen2-system/retailOrder/page",
  getOrderCnt = "/ark-gen2-system/retailOrder/cnt",
  getDlrCdList = "/ark-gen2-system/user/getUsers",
  getCarSeriesList = "/ark-gen2-system/carSeries/getCarSeriesList", // 车系
  getPowerTypeList = "/ark-gen2-system/modelSku/powerTypeList", // 动力类型
  getDisplacementList = "/ark-gen2-system/modelSku/displacementList", // 排量
  getModelLevel = "/ark-gen2-system/modelSku/modelSkuListByCondition",
  getSfxList = "/ark-gen2-system/modelSku/sfxList",
  getColorList = "/ark-gen2-system/modelSku/extColor",
  getCustomerLeads = "/ark-gen2-system/retailOrder/getCustomerLeads",
  addRetailOrderBatch = "/ark-gen2-system/retailOrder/addRetailOrderBatch",
  orderUploadApi = "/ark-gen2-system/attachment/upload",
  orderDetailApi = "/ark-gen2-system/retailOrder/detail",
  getBatchCodeApi = "/ark-gen2-system/retailOrder/pageByBatchCode",
  getDealerLeadDetailApi = "/ark-gen2-lead/dealerLead/getDealerLeadDetail",
  getFileUrlApi = "/ark-gen2-system/attachment/fileUrl",
  getDetailApi = "/ark-gen2-system/retailOrder/batchDetail",
  editBatchApi = "/ark-gen2-system/retailOrder/editRetailOrderBatch",
  submitBatchApi = "/ark-gen2-system/retailOrder/submit",
  geiDealerAreaApi = "/ark-gen2-system/dealer/getDealerOfAreaList",
  geiDealerUserApi = "/ark-gen2-system/user/getDlrUsers",
}

/**
 * @description: Get Order
 */

// 获取订单列表
export const getOrderList = (
  data?: DraftParamsModel | PreSaleParamsModel | ForMalParamsModel,
) => {
  return defHttp.post<
    BasicFetchResult<DraftListModel | PreSaleListModel | FormalListModel>
  >({
    url: Api.getOrderList,
    data,
  });
};

// 获取tab对应数量
export const getOrderCnt = (data: OrderParamsModel) => {
  return defHttp.post<OrderCntModel>({
    url: Api.getOrderCnt,
    data,
  });
};

// 获取销售顾问
export const getDlrCdList = (dlrCd: string) => {
  return defHttp.post<dlrCdModel[]>({
    url: Api.getDlrCdList,
    data: {
      dlrCd,
      roleList: [4],
    },
  });
};

// 获取车系
export const getCarSeriesList = () => {
  return defHttp.get<seriesModel>({
    url: Api.getCarSeriesList,
  });
};

// 获取动力类型
export const getPowerTypeList = (params: CarParamsModel) => {
  return defHttp.get<powerTypesModel>({
    url: Api.getPowerTypeList,
    params,
  });
};

// 获取排量
export const getDisplacementList = (params: CarParamsModel) => {
  return defHttp.get<displacementModel>({
    url: Api.getDisplacementList,
    params,
  });
};

// 获取车型级别
export const getModelLevel = (params: CarParamsModel) => {
  return defHttp.get<carLevelModel>({
    url: Api.getModelLevel,
    params,
  });
};

// 获取sfx
export const getSfxList = (params: CarParamsModel) => {
  return defHttp.get<sfxModel>({
    url: Api.getSfxList,
    params,
  });
};

// 获取颜色
export const getColorList = (params: CarParamsModel) => {
  return defHttp.get<colorModel>({
    url: Api.getColorList,
    params,
  });
};

// 根据手机号查线索
export const getCustomerLeads = (phone: string) => {
  return defHttp.get<leadDataModel>({
    url: Api.getCustomerLeads,
    params: { phone },
  });
};

// 批量创建订单
export const addRetailOrderBatch = (data: CreateParamsModel[]) => {
  return defHttp.post({
    url: Api.addRetailOrderBatch,
    data: { data: data },
  });
};

// 上传
export function orderUploadApi(params: any) {
  return defHttp.post({
    url: `${Api.orderUploadApi}/order`,
    headers: {
      "Content-type": ContentTypeEnum.FORM_DATA,
      ignoreCancelToken: true,
    },
    params,
  });
}

// 订单详情
export function orderDetailApi(orderNo: string) {
  return defHttp.get<OrderDetailModel>({
    url: `${Api.orderDetailApi}/${orderNo}`,
  });
}

// 同批次订单
export function getBatchCodeApi(data: any) {
  return defHttp.post<OrderBatchModel>({
    url: `${Api.getBatchCodeApi}`,
    data,
  });
}

// 线索信息
export function getDealerLeadDetailApi(params: any) {
  return defHttp.get<any>({
    url: `${Api.getDealerLeadDetailApi}`,
    params,
  });
}

// 获取文件
export function getFileUrlApi(id: string) {
  return defHttp.get<any>({
    url: `${Api.getFileUrlApi}/${id}`,
  });
}

// 批次订单回显
export function getDetailApi(orderBatchCode: string) {
  return defHttp.get<any>({
    url: `${Api.getDetailApi}/${orderBatchCode}`,
  });
}

// 修改批次订单
export function editBatchApi(data: any) {
  return defHttp.post({
    url: `${Api.editBatchApi}`,
    data,
  });
}

// 修改批次订单
export function submitBatchApi(data: any) {
  return defHttp.post({
    url: `${Api.submitBatchApi}`,
    data,
  });
}

// 获取经销商
export function geiDealerAreaApi() {
  return defHttp.get({
    url: `${Api.geiDealerAreaApi}`,
  });
}

// 获取销售顾问
export function geiDealerUserApi(data: any) {
  return defHttp.post({
    url: `${Api.geiDealerUserApi}`,
    data,
  });
}
