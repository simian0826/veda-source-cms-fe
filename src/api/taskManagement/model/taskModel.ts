export interface OptionModel {
  value: string;
  label: string;
  metadata?: any;
  children?: OptionModel[];
}

export interface FormItemModel {
  label?: string;
  field: string;
  type: string;
  val?: any;
  width?: string;
  list?: OptionModel[];
  hasChange?: string;
  notShow?: boolean;
  disabled?: boolean;
  ext?: [string, string][];
  extFunc?: (val: any) => boolean;
  required?: boolean;
  span?: number;
  showArrow?: boolean;
}

export interface TaskType {
  children: TaskType[];
  grade: 0;
  id: string;
  name: string;
  parentId: string;
  taskCtgryInd: string;
  taskResultGroup: string;
  taskStatus: string;
  taskStatusGroup: string;
  taskSubCtgryInd: string;
  taskSubjectInd: string;
}

export interface UserRole {
  value: string;
  label: string;
  children: UserRole[];
}

export interface CarSeries {
  id: string;
  seriesNameCn: string;
}

export interface Channel {
  dealCamp: boolean;
  campId: number;
  campFullName: string;
  channelNameList: {
    campId: number;
    channelId: number;
    channelName: string;
    aiObCallFlag: boolean;
    leadGradeFlag?: any;
  }[];
}

export interface TaskItemModel {
  customizeName: string; // 称呼
  mobile: string; // 手机号码
  dlrLeadTypeInd: number; // 线索形态
  dlrLeadStageInd: number; // 线索阶段
  firstCampId: string; // 获客活动
  firstChannelId: string; // 获客渠道
  leadGradeInd: number; // 线索评级
  opptyGradeInd: number; // 意向等级
  intendCarSeries: string; // 意向车系
  taskTypeId: string; // 任务类型
  taskSubjectInd: string; // 任务主题
  customerId: string; // 客档id
  lastDataSign: boolean; // 相同线索下最新数据标记
  relatedItemId: string; // 相关项 线索Id
  relatedItemType: string; // 线索类型
  dealerId: string; // 经销商 ID
  taskOwner: string; // 任务归属人
  taskOwnerId: string; // 任务归属人
  taskStatInd: string; // 任务状态
  taskResultInd: string; // 任务结果
  taskResultReasonInd: string; // 任务结果原因
  taskResult: string; // 任务结果
  taskResultReason: string; // 任务结果原因
  taskComments: string; // 任务备注
  taskStartDateTime: string; // 任务开始时间
  taskEndDateTime: string; // 任务结束时间
  taskCompleteDateTime: string; // 任务完成时间
  nextFollowDateTime: string; // 下次跟进时间
  overdueRemindDateTime: string; // 逾期提醒时间
  taskOverdueFlag: boolean; // 是否逾期
  dlrLeadStatInd: string; // 线索状态
  id: string;
  createAt: string;
  createBy: string;
  updateAt: string;
  updateBy: string;
  validFlag: boolean;
  deleteFlag: boolean;
  taskCtgryInd: string; // 任务大类
  taskSubCtgryInd: string; // 任务子类
  genderInd: number; // 性别 1 man 2 female
  leadOwnerName: string; // 线索跟进人
  dealerName: string; // 经销商
  genderName: string; // 性别
  channelTypes?: string[]; // 外呼渠道
}

export interface OrderModel {
  _id: string;
}
