import { FileModal } from "./activityModel";

export interface OptionModel {
  value?: string | number;
  label: string;
  children?: OptionModel[];
}

export interface FormListModel {
  isSearch?: boolean | undefined;
  label?: string;
  field: string;
  type: string;
  val?: any;
  width?: string;
  list?: OptionModel[];
  hasChange?: string;
  notShow?: boolean;
  disabled?: boolean;
  multiple?: boolean;
}

export interface OemListRequestModal {
  filterType: string;
  sourceFlag: string;
  filterValue?: string;
  orgCode?: string;
}

export interface OemTableReqModal {
  channelDomainTypeName?: string;
  channelFieldName?: string;
  channelFieldTypeName?: string;
  channelFormatName?: string;
  channelLocationTypeName?: string;
  channelOwnerId?: string;
  channelStatInd?: string;
  pageNum?: number;
  pageSize?: number;
  startDate?: string;
  endDate?: string;
  id?: number[];
}

export interface OemListResponseModal {
  id: string;
  channelId: string;
  channelFieldName: string;
  channelFormatName: string;
  channelLocationTypeName: string;
  channelDomainTypeName: string;
  channelFieldTypeName: string;
  oemLeadInputFlag: string;
  dlrLeadInputFlag: string;
  dlrCardInputFlag: string;
  channelActivateFlag: string;
  createDate: string;
  updateDate: string;
}

export interface OemTableRespModal {
  total: number;
  records: OemListResponseModal[];
}

export interface OemDetailResponseModal {
  orgName?: string;
  id?: number;
  channelFieldName?: string;
  channelFormatName?: string;
  mediaId?: string;
  channelLocationTypeName?: string;
  channelDomainTypeName?: string;
  channelFieldTypeName?: string;
  oemLeadInputFlag?: string;
  dlrLeadInputFlag?: string;
  dlrCardInputFlag?: string;
  channelActivateFlag?: string;
  channelDescr?: string;
  supportDocList?: FileModal[];
  createAt?: string;
  channelDeptName?: string;
  channelOfficeName?: string;
  channelOwnerName?: string;
  channelDeptCode?: string;
  channelOfficeCode?: string;
  channelOwnerCode?: string;
  isStart?: boolean;
}

export interface DropChannelModal {
  id: number;
  channelName: string;
}

export interface DropDownOptionModal {
  fieldName: string;
  id: number;
  channelFormatNameList?: DropChannelModal[];
}

export interface DealerTableReqModal {
  channelDomainTypeName?: string;
  channelFieldName?: string;
  channelFieldTypeName?: string;
  channelFormatName?: string;
  channelLocationTypeName?: string;
  channelOwnerId?: string;
  pageNum?: number;
  pageSize?: number;
  orgCode?: string;
  startDate?: string;
  endDate?: string;
  id?: number[];
}

export interface DealerListResponseModal {
  id: string;
  channelFieldName: string;
  channelFormatName: string;
  channelLocationTypeName: string;
  channelDomainTypeName: string;
  channelFieldTypeName: string;
  createAt: string;
  updateAt: string;
}

export interface DealerTableRespModal {
  total: number;
  records: DealerListResponseModal[];
}

export interface DealerDeatilModal {
  id?: number;
  orgName?: string;
  orgCode?: string;
  channelFieldName?: string;
  channelFormatName?: string;
  channelLocationTypeName?: string;
  channelDomainTypeName?: string;
  channelFieldTypeName?: string;
  channelDescr?: string;
  createAt?: string;
}

export interface DropDownRespModal {
  orgCode?: string;
}

export interface BusinessReqModal extends DropDownRespModal {
  sourceFlag: string;
  officeCode?: string;
}

export interface UserNameModal {
  userCode: string;
  userName: string;
}

export interface DeptUserRespModal {
  deptCode: string;
  deptName: string;
  childDept?: DeptUserRespModal[];
  userName?: UserNameModal[];
}

export interface ActivateModal {
  activateFlag: boolean;
  channelId: number[];
}
