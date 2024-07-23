import { defHttp } from "/@/utils/http/axios";
import {
  ReservationListParams,
  ReservationListResultModel,
  ReservationListCreateResultModel,
  ReservationListCreateDataModel,
  ReservationListCreateOtherDataModel,
  ReservationListUpdateModel,
  AppointmentForm,
} from "./model/reservationManagementModel";

import { ErrorMessageMode } from "/#/axios";

const RESERVATION_URL_PREFIX = "/gen2-lead/leadReservation";

enum Api {
  LeadReservationList = RESERVATION_URL_PREFIX + "/getLeadReservationPage",
  LeadReservationCreateList = RESERVATION_URL_PREFIX + "/getDealerLeadByMobile",
  LeadReservationDetailList = RESERVATION_URL_PREFIX + "/getLeadReservation",
  LeadReservationUpdateList = RESERVATION_URL_PREFIX + "/update",
  LeadReservationSubmitList = RESERVATION_URL_PREFIX + "/submit",
  LeadReservationCancelList = RESERVATION_URL_PREFIX + "/cancel",
}

/**
 * @description: user login api
 */
export function getReservationListApi(
  params: ReservationListParams,
  mode: ErrorMessageMode = "modal",
) {
  return defHttp.post<ReservationListResultModel>(
    {
      url: Api.LeadReservationList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
export function getLeadReservationCreateApi(params: object) {
  return defHttp.get<
    ReservationListCreateResultModel<
      ReservationListCreateDataModel | ReservationListCreateOtherDataModel
    >
  >({
    url: Api.LeadReservationCreateList,
    params,
  });
}

export function getLeadReservationDetailApi(params: object) {
  return defHttp.get<AppointmentForm>({
    url: Api.LeadReservationDetailList,
    params,
  });
}

export function getLeadReservationUpdateApi(params: object) {
  return defHttp.post<ReservationListUpdateModel>({
    url: Api.LeadReservationUpdateList,
    params,
  });
}

export function getLeadReservationSubmitApi(params: object) {
  return defHttp.post<ReservationListResultModel>({
    url: Api.LeadReservationSubmitList,
    params,
  });
}

export function getLeadReservationCancelApi(params: object) {
  return defHttp.post({
    url: Api.LeadReservationCancelList,
    params,
  });
}
