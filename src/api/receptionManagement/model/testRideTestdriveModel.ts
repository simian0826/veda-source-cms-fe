import {
  BasicFetchResult,
  BasicPageParams,
  BasicRequestPageParams,
} from "../../model/baseModel";

export interface TestdriveSearchForm extends BasicRequestPageParams {
  mobile?: string | number | undefined;
  fullName?: string | number | undefined; //真实姓名
  opptyGradeInd?: string; //意向等级
  dlrLeadStageInd?: number; //线索阶段
  dlrLeadStatInd?: number; //线索状态
  testDriveSeriesId?: string[]; //试乘试驾车系
  testDriveDatetime?: string[]; //试乘试驾日期
  dlrId?: string[]; //经销商
  testDriveAlloStaffId?: string[]; //线索跟进人
}
export interface SearchData {
  mobile?: string | number | undefined;
  fullName?: string | number | undefined; //真实姓名
  opptyGradeInd?: string; //意向等级
  dlrLeadStageInd?: number; //线索阶段
  dlrLeadStatInd?: number; //线索状态
  testDriveSeriesId?: string[]; //试乘试驾车系
  testDriveDatetime?: any; //试乘试驾日期
  dlrId?: string[]; //经销商
  testDriveAlloStaffId?: string[]; //线索跟进人
}

export interface TestdriveListResultModel
  extends BasicPageParams,
    BasicFetchResult<TestdriveItem> {}

export interface TestdriveItem {
  mobile?: string | number | undefined;
  fullName?: string[]; //真实姓名
  opptyGradeInd?: string; //意向等级
  dlrLeadStageInd?: number; //线索阶段
  dlrLeadStatInd?: number; //线索状态
  intendCarSeriesId?: string[]; //意向车系
  testDriveSeriesId?: string[]; //试乘试驾车系
  testDriveDatetime?: string[]; //试乘试驾日期
  testDriveStartDatetime?: string[]; //试乘试驾开始时间
  testDriveEndDatetime?: string[]; //试乘试驾结束时间
  testDriveDlrId?: string[]; //经销商
  ownerId?: string[]; //线索跟进人
}
export interface TestDriverInformat {
  fullName?: string; //试驾人*姓名
  mobile?: string; //手机号码
  driverLicenseNo?: string; //驾驶证件号码
  driverLicenseTypeInd?: string; //准驾类型
  testDriveTypeInd?: string; //试乘试驾类型
  driverLicenseIssueOn?: string; //驾驶证初次领证日期
  driverLicenseValidFrom?: string; //驾驶证有效起始日期
  driverLicenseValidTo?: string; //驾驶证有效结束日期
  emergencyContactsRelationInd?: string; //紧急联系人关系
  emergencyContactsFullName?: string; //紧急联系人姓名
  emergencyContactsMobile?: string; //紧急联系人手机号
  dlrLeadFlag: boolean; //是否本人试乘试驾
}
export interface TestdriveForm<T> {
  // customerId?: string; //客户ID
  customizeName?: string; //客户名称
  mobile?: string; //手机号码
  genderInd?: string; //性别
  opptyGradeInd?: string; //意向等级
  intendCarSeriesId?: string; //意向车系
  intendCarSeriesName?: string; //意向车系
  powerTypeInd?: string; //动力类型
  dispInd?: string; //排量
  modelClassNameCn?: string; //车型级别
  firstChannelId?: string; //获客渠道
  firstCampId?: string; //获客活动
  firstChannelName?: string; //获客渠道
  firstCampName?: string; //获客活动
  dlrLeadStageInd?: string; //线索阶段
  dlrLeadStatInd?: string; //线索状态
  dlrId?: string; //经销商
  dlrName?: string; //经销商
  ownerId?: string; //线索跟进人
  ownerRoleName?: string;
  ownerName?: string;
  ownerRoleId?: any;
  testDriveSeriesId?: string; //试乘试驾车系
  testDriveSeriesName?: string; //试乘试驾车系
  testDriveDatetime?: any; //试乘试驾日期
  testDriveStartDatetime?: any; //试乘试驾开始时间
  testDriveEndDatetime?: any; //试乘试驾结束时间
  testDriveDistance?: string; //试乘试驾里程
  testDriveCarNumber?: string; //试乘试驾车牌号
  driveAgreements?: [T]; //试乘试驾人信息
  testDriveRemark?: string;
}
export interface TestdriveResultModel<T> {
  code?: string;
  msg?: string;
  data?: T;
}
export interface TestdriveCreateDataModel {
  role?: string;
  name?: string;
}
