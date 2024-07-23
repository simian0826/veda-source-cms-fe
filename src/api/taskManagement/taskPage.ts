import { defHttp } from "/@/utils/http/axios";
import { BasicFetchResult } from "/@/api/model/baseModel";
import {
  TaskItemModel,
  UserRole,
  CarSeries,
  Channel,
} from "/@/api/taskManagement/model/taskModel";

enum Api {
  taskPage = "/gen2-lead/task/page",
  userRole = "/gen2-system/user/getUsers",
  carSeries = "/gen2-system/carSeries/getCarSeriesList",
  channel = "/gen2-system/leadCampaign/campaignChannelTree",
  taskDetail = "/gen2-lead/task/getTaskListById",
  clueDetail = "/gen2-lead/dealerLead/getDealerLeadDetail",
  submitReservation = "/gen2-lead/leadReservation/submit",
  getPortDcdUrl = "/gen2-lead/outbound/getPortDcdUrl",
  getNewPortyicheUrl = "/gen2-lead/outbound/getNewPortyicheUrl",
  getPortQczjUrl = "/gen2-lead/outbound/getPortQczjUrl",
}

/**
 * @description: 任务列表
 */
export function fetchTaskPage(params: any) {
  return defHttp.post<BasicFetchResult<TaskItemModel>>({
    url: Api.taskPage,
    params,
  });
}

export function fetchUserRole() {
  return defHttp.post<UserRole[]>({ url: Api.userRole });
}

export function fetchCarSeries() {
  return defHttp.get<CarSeries[]>({ url: Api.carSeries });
}

export function fetchChannels(params) {
  return defHttp.get<Channel[]>({
    url: Api.channel,
    params,
  });
}

export function fetchTaskDetail(params) {
  return defHttp.get<TaskItemModel[]>({
    url: Api.taskDetail,
    params,
  });
}

export function fetchClueDetail(params) {
  return defHttp.get({
    url: Api.clueDetail,
    params,
  });
}

export function createReservation(params) {
  return defHttp.post({
    url: Api.submitReservation,
    params,
  });
}

export function fetchPortDcdUrl({
  dealerId,
  relatedId,
  roleId,
}: {
  dealerId: string;
  relatedId: string;
  roleId: string | number;
}) {
  return defHttp.get({
    url: Api.getPortDcdUrl,
    params: {
      orderId: relatedId,
      dealerCode: dealerId,
      roleId,
    },
  });
}

export function fetchNewPortyicheUrl({
  relatedId,
  roleId,
}: {
  relatedId: string;
  roleId: string | number;
}) {
  return defHttp.get({
    url: Api.getNewPortyicheUrl,
    params: {
      leadId: relatedId,
      h5UrlType: "pc",
      roleId,
    },
  });
}

export function fetchPortQczjUrl({
  relatedId,
  roleId,
}: {
  relatedId: string;
  roleId: string | number;
}) {
  return defHttp.get({
    url: Api.getPortQczjUrl,
    params: {
      leadId: relatedId,
      typeEnum: "QCZJ",
      clientType: "pc",
      roleId,
    },
  });
}
