import {
  BasicFetchResult,
  BasicPageParams,
  BasicRequestPageParams,
} from "../../model/baseModel";

/**
 * @description: reservation list interface parameters
 */
export interface ReservationListParams extends BasicRequestPageParams {
  mobile?: string | undefined | number;
  reservationDate?: string[]; //预约到店日期
  intendCarSeriesId?: string[]; //意向车系
  reservationCampId?: string[]; //预约活动
  reservationStatInd?: string[]; //预约状态
  firstReservationFlag?: string[]; //是否首次预约
  ownerId?: string[]; //线索跟进人
}
export interface SearchForm {
  mobile?: string | undefined | number;
  reservationDate?: any; //预约到店日期
  intendCarSeriesId?: string[]; //意向车系
  reservationCampId?: string[]; //预约活动
  reservationStatInd?: string[]; //预约状态
  firstReservationFlag?: string[]; //是否首次预约
  reservationAlloStaffId?: string[]; //线索跟进人
  dlrId?: string[]; //经销商
}

/**
 * @description: Login interface return value
 */
export interface ReservationListResultModel
  extends BasicPageParams,
    BasicFetchResult<ReservationListItem> {}

export interface ReservationListItem {
  customerId: string;
  customizeName: string;
  intendCarSeriesName?: string;
  opptyGradeInd?: number;
  ownerId?: string;
  id?: string;
  reservationCode?: string;
  dlrLeadId?: string;
  mobile?: string;
  reservationCampId?: string;
  reservationChannelId: string;
  reservationPurposeInd?: number;
  reservationDate?: string;
  reservationStatInd?: number;
  firstReservationFlag?: boolean;
}
export interface AppointmentForm {
  customizeName?: string;
  mobile?: string;
  genderInd?: string;
  intendCarSeriesId?: string;
  intendCarSeriesName?: string;
  opptyGradeInd?: string;
  firstCampId?: string;
  firstChannelId?: string;
  firstChannelName?: any; //获客渠道
  firstCampName?: any; //获客活动
  dlrLeadStageInd?: string;
  dlrLeadStatInd?: string;
  dlrId?: string;
  dlrName?: string;
  ownerId?: string;
  ownerRoleName?: string;
  ownerRoleId?: any;
  ownerName?: string;
  reservationAlloStaffRoleName?: string;
  reservationAlloStaffName?: string;
  reservationAlloStaffId?: string;
  reservationAlloStaffRoleId?: any;
  reservationDate?: any;
  reservationStartTime?: number;
  reservationEndTime?: number;
  reservationPurposeInd?: any;
  reservationCampId?: string;
  reservationRemark?: string;
  reservationStatInd?: string;
  reservationChannelId?: string;
  leadId?: string; //线索ID
  customerId?: string; //客户ID
}
export interface ReservationListCreateResultModel<T> {
  code?: string;
  msg?: string;
  data?: T;
}

export interface ReservationListCreateDataModel {
  role?: string;
  name?: string;
}

export interface ReservationListCreateOtherDataModel {
  customerId?: string;
  customizeName?: string;
  mobile?: string;
  genderInd?: number;
  leadId?: string;
  intendCarSeriesId?: string;
  firstChannelId?: string;
  firstCampId?: string;
  opptyGradeInd?: number;
  dlrLeadStageInd?: number;
  dlrLeadStatInd?: number;
  ownerId?: string;
  ownerRoleId?: string;
  reservationAlloStaffId?: string;
  reservationAlloStaffRoleId?: string;
}

export interface ReservationListCancelModel {
  reservationCancelReasonInd?: number;
  reservationId?: string;
}

export interface ReservationListUpdateModel {
  customerId?: string;
  customizeName?: string;
  genderInd: 0;
  intendCarSeriesId?: string;
  leadId?: string;
  opptyGradeInd?: number;
  reservationCampId?: string;
  reservationDate?: string;
  reservationEndTime?: string;
  reservationId?: string;
  reservationPurposeInd?: string;
  reservationRemark?: string;
  reservationStartTime?: string;
}
export interface DictModal {
  label: string;
  value: number;
}
