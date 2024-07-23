/**
 * @description: reception list interface parameters
 */
import {
  BasicFetchResult,
  BasicPageParams,
  BasicRequestPageParams,
} from "../../model/baseModel";

export interface ReceptionSearchForm extends BasicRequestPageParams {
  mobile?: string | number | undefined;
  intendCarSeriesId?: string[]; //意向车系
  meetDate?: string[]; //实际到店日期
  sysSourceInd?: string[]; //接待类型
  meetTypeInd?: string[]; //接待类型
  checkinCampId?: string[]; //接待活动
  newLeadFirstMeetFlag?: string[]; //是否自然到店首次接待
  checkinDlrId?: string[]; //经销商
  ownerId?: string[]; //线索跟进人
}
export interface SearchData {
  mobile?: string | number | undefined;
  intendCarSeriesId?: string[]; //意向车系
  meetDate?: any; //实际到店日期
  sysSourceInd?: string[]; //接待类型
  meetTypeInd?: string[]; //接待类型
  checkinCampId?: string[]; //接待活动
  newLeadFirstMeetFlag?: string[]; //是否自然到店首次接待
  dlrId?: string[]; //经销商
  meetAlloStaffId?: string[]; //线索跟进人
}
export interface ReceptionListItem {
  customizeName?: string; //客户名称
  mobile?: string; //手机号码
  opptyGradeInd?: string; //意向等级
  intendCarSeriesId?: string; //意向车系
  meetCusNumber?: string; //接待人数
  meetTypeInd?: string; //接待类型
  checkinCampId?: string; //接待活动
  meetDate?: string; //实际到店日期
  meetDateTime?: string; //实际到店时间
  leaveDateTime?: string; //实际离店时间
  ownerId?: string; //线索跟进人
  checkinDlrId?: string; //经销商
}
export interface ReceptionListResultModel
  extends BasicPageParams,
    BasicFetchResult<ReceptionListItem> {}

export interface ReceptionForm {
  customerId?: string; //客户ID
  customizeName?: string; //客户名称
  mobile?: string; //手机号码
  genderInd?: string; //性别
  intendCarSeriesName?: string; //意向车系
  intendCarSeriesId?: string; //意向车系
  firstChannelId?: string; //获客渠道
  firstCampId?: string | []; //获客活动
  firstChannelName?: any; //获客渠道
  firstCampName?: any; //获客活动
  opptyGradeInd?: string; //意向等级
  dlrLeadStageInd?: string; //线索阶段
  dlrLeadStatInd?: string; //线索状态
  dlrId?: string; //经销商
  dlrName?: string;
  owner?: string;
  ownerId?: string | undefined; //线索跟进人
  ownerRoleId?: any; //线索跟进人角色
  ownerRoleName?: string;
  ownerName?: string;
  meetAlloStaff?: any;
  meetAlloStaffRoleName?: string;
  meetAlloStaffName?: string;
  meetAlloStaffRoleId?: any;
  meetAlloStaffId?: string; //接待被分配人
  meetCusNumber?: string; //接待人数
  meetTypeInd?: string; //接待类型
  meetDate?: any; //实际到店日期
  meetDateTime?: any; //实际到店时间
  leaveDateTime?: any; //实际离店时间
  meetRemark?: string; //接待备注
  powerTypeInd?: string; //动力类型
  dispInd?: string; //排量
  modelClassNameCn?: string; //车型级别
  leadId?: string; //线索ID
}
export interface ReceptionCreateResultModel<T> {
  code?: string;
  msg?: string;
  data?: T;
}

export interface ReceptionCreateDataModel {
  role?: string;
  name?: string;
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
