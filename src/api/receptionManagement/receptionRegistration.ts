import { defHttp } from "/@/utils/http/axios";
import {
  ReceptionSearchForm,
  ReceptionListResultModel,
  ReceptionCreateResultModel,
  ReceptionCreateDataModel,
  ReceptionForm,
  UserRole,
  CarSeries,
} from "./model/receptionRegistrationModel";

import { ErrorMessageMode } from "/#/axios";

const RESERVATION_URL_PREFIX = "/gen2-lead/meetRecord";

enum Api {
  LeadReceptionList = RESERVATION_URL_PREFIX + "/getMeetRecordPage",
  LeadReceptionCreateList = RESERVATION_URL_PREFIX + "/getDealerLeadByMobile",
  LeadReceptionSubmitList = RESERVATION_URL_PREFIX + "/submit",
  LeadReceptionDetailList = RESERVATION_URL_PREFIX + "/getMeetRecord",
  LeadReceptionUpdateList = RESERVATION_URL_PREFIX + "/update",
  LeadReservationDealerLead = "/gen2-lead/dealerLead/getDealerLeadDetail",
  // 分配人
  userRole = "/gen2-system/user/getUsers",
  // 获客活动-预约到店
  newBookCampList = "/gen2-system/leadCampaign/newBookCampList",
  // 获客渠道-预约到店
  newBookChannelList = "/gen2-system/leadCampaign/newBookChannelList",
  // 获客渠道-自然到店
  naturalBookCampList = "/gen2-system/leadCampaign/naturalBookCampList",
  // 获客活动-自然到店
  naturalBookChannelList = "/gen2-system/leadCampaign/naturalBookChannelList",
  // 车系
  carSeries = "/gen2-system/carSeries/getCarSeriesList",
  // 动力类型
  powerTypeList = "/gen2-system/modelSku/powerTypeList",
  // 排量
  displacementList = "/gen2-system/modelSku/displacementList",
  // 车型级别
  modelSkuList = "/gen2-system/modelSku/modelSkuListByCondition",
}

/**
 * @description: user login api
 */
export function getReceptionListApi(
  params: ReceptionSearchForm,
  mode: ErrorMessageMode = "modal",
) {
  return defHttp.post<ReceptionListResultModel>(
    {
      url: Api.LeadReceptionList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
export function getReceptionCreateApi(
  params: object,
  mode: ErrorMessageMode = "modal",
) {
  return defHttp.get<
    ReceptionCreateResultModel<ReceptionCreateDataModel | ReceptionForm>
  >(
    {
      url: Api.LeadReceptionCreateList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getReceptionSubmitApi(
  params: ReceptionForm,
  mode: ErrorMessageMode = "modal",
) {
  return defHttp.post<ReceptionListResultModel>(
    {
      url: Api.LeadReceptionSubmitList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getReceptionUpdateApi(
  params: ReceptionForm,
  mode: ErrorMessageMode = "modal",
) {
  return defHttp.post<ReceptionListResultModel>(
    {
      url: Api.LeadReceptionUpdateList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getReceptionDetailApi(
  params: object,
  mode: ErrorMessageMode = "modal",
) {
  return defHttp.get<ReceptionForm>(
    {
      url: Api.LeadReceptionDetailList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
export function getUserRoleApi(
  params: object,
  mode: ErrorMessageMode = "modal",
) {
  return defHttp.post<UserRole>(
    {
      url: Api.userRole,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
export function getCarSeriesApi(
  params: object,
  mode: ErrorMessageMode = "modal",
) {
  return defHttp.get<CarSeries>(
    {
      url: Api.carSeries,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
export function getModelSkuListApi(
  params: object,
  mode: ErrorMessageMode = "modal",
) {
  return defHttp.get<object>(
    {
      url: Api.modelSkuList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
export function getPowerTypeListApi(
  params: object,
  mode: ErrorMessageMode = "modal",
) {
  return defHttp.get<object>(
    {
      url: Api.powerTypeList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
export function getDisplacementListApi(
  params: object,
  mode: ErrorMessageMode = "modal",
) {
  return defHttp.get<object>(
    {
      url: Api.displacementList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
export function getNewBookCampListApi(
  params: object,
  mode: ErrorMessageMode = "modal",
) {
  return defHttp.post<object>(
    {
      url: Api.newBookCampList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getNewBookChannelListApi(
  params: object,
  mode: ErrorMessageMode = "modal",
) {
  return defHttp.post<object>(
    {
      url: Api.newBookChannelList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
export function getNaturalBookChannelListApi(
  params: object,
  mode: ErrorMessageMode = "modal",
) {
  return defHttp.post<object>(
    {
      url: Api.naturalBookChannelList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
export function getNaturalBookCampListApi(
  params: object,
  mode: ErrorMessageMode = "modal",
) {
  return defHttp.post<object>(
    {
      url: Api.naturalBookCampList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
export function getLeadReservationDealerLeadApi(params: object) {
  return defHttp.get({
    url: Api.LeadReservationDealerLead,
    params,
  });
}
