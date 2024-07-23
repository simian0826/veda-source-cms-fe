import { defHttp } from "/@/utils/http/axios";
import {
  ApprovalListParamsModel,
  ApprovalListResModel,
  FailureLeadModel,
  ApprovalActionModel,
  GetUserResModel,
} from "./model/approvalModel";

import { ErrorMessageMode } from "/#/axios";

const URL_PREFIX = "/gen2-system/approval";
const LEAD_PREFIX = "/ark-gen2-lead/dealerLead";
enum Api {
  GetApprovalList = URL_PREFIX + "/list",
  GetApprovalOptions = "/system/dict/data/byTypes",
  GetApprovalHistory = URL_PREFIX,
  CreateFailureLead = LEAD_PREFIX + "/lostApply",
  ApprovalActionApi = URL_PREFIX + "/execute",
  GetUsers = "/gen2-system/user/getUsers",
}

/**
 * @description: 我的审批列表接口
 */
export function getApprovalListApi(
  params: ApprovalListParamsModel,
  mode: ErrorMessageMode = "modal",
) {
  return defHttp.post<ApprovalListResModel>(
    {
      url: Api.GetApprovalList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

// 查看审批历史
export function getApprovalHistoryById(id: string) {
  return defHttp.get({
    url: `${Api.GetApprovalHistory}/${id}`,
  });
}

// 创建战败申请
export function createFailureLeadApi(params: FailureLeadModel) {
  return defHttp.post(
    {
      url: Api.CreateFailureLead,
      params,
    },
    {
      errorMessageMode: "message",
    },
  );
}

// 审批同意，驳回，撤回
export function handleApprovalAction(params: ApprovalActionModel) {
  return defHttp.post({
    url: Api.ApprovalActionApi,
    params,
  });
}

// 获取再分配联系人下拉数据
export function getUsers(params: GetUserResModel) {
  return defHttp.post({
    url: Api.GetUsers,
    params,
  });
}
