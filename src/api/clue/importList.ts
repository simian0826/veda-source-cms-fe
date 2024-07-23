import { defHttp } from "/@/utils/http/axios";
enum Api {
  GetImpartBatchList = "/gen2-register/register-record/queryDealerRegisterImportBatch",
  GetImpartDetailList = "/gen2-register/register-record/queryDealerRegisterImportBatchDetail",
  GetCarSeriesList = "/gen2-system/carSeries/getCarSeriesList",
  oemLeadCampList = "/gen2-system/leadCampaign/oemLeadCampList",
  oemLeadChannelList = "/gen2-system/leadCampaign/oemLeadChannelList",
}

export const OemExportApi = (params) => {
  // return defHttp.post({
  //   url: Api.OemChannelExport,
  //   params,
  // });
  console.log(params);
};

/**
 * @description: 获取导入批次列表
 */
export const GetImpartBatchList = (params) => {
  return defHttp.post({
    url: Api.GetImpartBatchList,
    params,
  });
};

/**
 * @description: 获取导入批次列表
 */
export const GetImpartDetailList = (params) => {
  return defHttp.post({
    url: Api.GetImpartDetailList,
    params,
  });
};

/**
 * @description: 获取意向车系
 */
export const getCarSeriesList = () => {
  return defHttp.get({
    url: Api.GetCarSeriesList,
  });
};

/**
 * @description: 获取获客活动
 */
export const getOemLeadCampList = () => {
  return defHttp.post({
    url: Api.oemLeadCampList,
  });
};

/**
 * @description: 获取获客渠道
 */
export const getOemLeadChannelList = () => {
  return defHttp.post({
    url: Api.oemLeadChannelList,
  });
};
