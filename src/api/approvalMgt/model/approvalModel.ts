import type { SelectProps } from "ant-design-vue";
import { Dayjs } from "dayjs";
// 审批历史表格type
export interface ApprovalHistoryTableColumnType {
  approvalDateTime: string; // 操作时间
  approvalStatus: string; // 审批状态
  approvalStep: string; // 审批步骤
  approvalUser: string; // 执行人
  comment: string; // 审批意见
  approvalHistoryId: string;
  approvalUserRole: string; // 执行角色
  approvalStatusCode: string; // 审批状态code
}
// 审理历史接口res
export interface ApprovalHisotryResModel {
  records: ApprovalHistoryTableColumnType;
}
// 列表item
export interface ApprovalListItemModel {
  // 申请备注
  applyComment: string;
  // 申请日期
  applyDateTime: string;
  // 申请原因/战败原因
  applyReason: string;
  // 申请人
  applyUser: string;
  // 最近审批日期
  approvalDateTime: string;
  // 审批记录Id
  approvalRecordId: string;
  // 审批场景
  approvalScenario: string;
  // 审批状态
  approvalStatus: string;
  // 审批状态Code
  approvalStatusCode: string;
  // 审批类型
  approvalType: string;
  // 最近审批人
  approvalUser: string;
  // 渠道名称
  channelName: string;
  // 子渠道
  channelFormatName: string;
  // 审批对象ID
  objectId: string;
  // 审批对象创建时间
  approvalObjectDateTime: string;
  // 审批对象名称
  approvalObjectName: string;
  // 活动名称
  campName: string;
  // 线索子状态
  leadSubStatus: string;
  // 审批中的审批状态
  approvalStepStatus: string;
}

// 列表接口请求
export interface ApprovalListParamsModel {
  // 申请日期（开始）
  applyBeginDate?: string | undefined;
  // 申请日期（结束）
  applyEndDate?: string | undefined;
  // 原因
  applyReason?: string[];
  // 申请人
  applyUser?: string;
  // 最近审批日期（开始）
  approvalBeginDate?: string | undefined;
  // 最近审批日期（结束）
  approvalEndDate?: string | undefined;
  // 审批场景
  approvalScenario?: string;
  // 审批状态
  approvalStatus?: string[];
  // 审批类型
  approvalType?: string[];
  // 最近审批人
  approvalUser?: string;
  // 渠道名称
  channelName?: string;
  // true：我的申请， false:我的审批
  myApply: boolean;
  // 排序方式: ASC升序, DESC降序
  orderBy?: string;
  // 排序字段
  orderField?: string;
  // 页码
  pageNum: number;
  // 页码
  pageSize: number;
}
// 列表接口详情
export interface ApprovalListResModel {
  records: ApprovalListItemModel[];
  total: number;
}
// 审批历史list item
export interface ApprovalHistoryListItemModel {
  // 操作时间
  approvalDateTime: string;
  // 审批历史Id
  approvalHistoryId: string;
  // 审批状态
  approvalStatus: string;
  // 审批状态Code
  approvalStatusCode: string;
  // 审批步骤
  approvalStep: string;
  // 执行人
  approvalUser: string;
  // 执行角色
  approvalUserRole: string;
  // 审批意见
  comment: string;
}

// 创建战败线索model
export interface FailureLeadModel {
  // 申请备注
  applyComment: string;
  // 申请原因
  applyReason: string;
  // 审批对象ID
  approvalObjectId: string;
  // 城市
  cityCode?: string;
}

// common 接口 res model
export interface CommonResModel {
  code: number;
  data: Object;
  msg: string;
}

// 驳回，批准接口model
export interface ApprovalActionModel {
  action: 1 | 2 | 0; // 1.通过， 2. 拒绝， 0 撤回
  comment?: string; // 审批意见
  ids: string[]; // approval id
  leadReassigneeUserId?: string; // 线索再分配人id
  rejectionComment?: string; // 拒绝备注
  leadReassigneeUserRole?: string; // role
}

// users 下拉接口
export interface GetUserResModel {
  dlrCd: string | undefined; // 经销商code
  roleList?: string[]; // 角色列表
}

export interface FormItemModel {
  label?: string;
  field: string;
  type?: string;
  disableDate?: (currentDate: Dayjs) => boolean;
  val?: any;
  options?: SelectProps["options"];
  placeholder?: string | [string, string];
}
