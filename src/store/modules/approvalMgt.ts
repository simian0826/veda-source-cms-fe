import { defineStore } from "pinia";
import {
  ApprovalListParamsModel,
  ApprovalListResModel,
  ApprovalHistoryTableColumnType,
  FailureLeadModel,
  CommonResModel,
  ApprovalActionModel,
  GetUserResModel,
} from "/@/api/approvalMgt/model/approvalModel";
import {
  getApprovalListApi,
  getApprovalHistoryById,
  createFailureLeadApi,
  handleApprovalAction,
  getUsers,
} from "/@/api/approvalMgt/approvalMgt";
interface ApprovalStore {
  approvalListData: Nullable<ApprovalListResModel>;
}
export const useApprovalStore = defineStore({
  id: "approval-management",
  state: (): ApprovalStore => ({
    approvalListData: null,
  }),
  getters: {},
  actions: {
    setApprovalList(list) {
      this.approvalListData = list;
    },
    // 获取列表接口数据
    async getApprovalList(
      params: ApprovalListParamsModel,
    ): Promise<ApprovalListResModel | null> {
      const res = await getApprovalListApi(params);
      this.setApprovalList(res);
      return this.approvalListData;
    },
    // 获取审批历史数据
    async getApprovalHistory(
      id: string,
    ): Promise<ApprovalHistoryTableColumnType[] | undefined> {
      const res = await getApprovalHistoryById(id);
      return res;
    },
    // 创建战败线索
    async createFailureLead(
      params: FailureLeadModel,
    ): Promise<CommonResModel | null> {
      return await createFailureLeadApi(params);
    },
    // 审批操作： 批准，驳回，撤回
    async handleApprovalAction(
      params: ApprovalActionModel,
    ): Promise<CommonResModel | null> {
      return await handleApprovalAction(params);
    },
    // 获取users下拉数据
    // TODO: 等待其他模块获取用户信息之后，采用实际传参
    async getUsersOptions(
      params: GetUserResModel,
    ): Promise<CommonResModel | null> {
      return await getUsers(params);
    },
  },
});
