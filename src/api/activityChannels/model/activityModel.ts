export interface ChannelSearchModal {
  campOwnerId?: string;
  campName?: string;
  businessCtgryName?: string;
  operationCompanyId?: string;
  channelId?: string;
  dlrShareFlag?: string;
  campStageInd?: string;
  pageNum?: string;
  pageSize?: string;
  orgCode?: string;
  ownnerId?: string;
  startCreateDate?: string;
  endCreateDate?: string;
  campApprovalStatInd?: string;
  id?: number[];
}

export interface ActChannelModal {
  channelFieldName?: string;
  channelFormatName?: string;
  channelFullName?: string;
}

export interface ChannelTableModal {
  id: string;
  campName?: string;
  campStartDate?: string;
  campEndDate?: string;
  campDeptName?: string;
  campOfficeName?: string;
  campOwnerName?: string;
  businessCtgryName?: string;
  operationContactId?: string;
  campId?: string;
  dlrShareFlag?: string;
  campApprovalStatInd?: string;
  createAt?: string;
  campStageInd?: string;
  channelList?: ActChannelModal[];
}

export interface ChannelTableRespModal {
  records: ChannelTableModal[];
  total: number;
}

export interface ChannelListModal {
  id: string;
  aiObCallFlag: boolean;
  channelFieldCode: string;
  channelFieldName: string;
  channelFormatCode: string;
  channelFormatName: string;
}

export interface CampTargetModal {
  id: string;
  kpiCtgry?: string;
  targetLower?: number;
}

export interface OemDetailModal {
  budgetPlanCode?: string;
  businessCtgryName?: string;
  campDescr?: string;
  campEndDate?: string;
  campGatherWayName?: string;
  campName?: string;
  campStartDate?: string;
  alwaysOnFlag?: string;
  channelList: ChannelListModal[];
  campTarget: CampTargetModal[];
  companyCode?: string;
  contactMobile?: string;
  contactPersonName?: string;
  createAt?: string;
  dlrShareFlag?: string;
  id?: number | string;
  seriesId?: string[];
  leadGradeFlag?: boolean;
  supportDocList?: FileModal[];
  file?: string;
  channelFieldName?: string;
  channelFormatName?: string;
  areaRelationList?: string[][];
  orgCode?: string;
  campDeptName?: string;
  campOfficeName?: string;
  campOwnerName?: string;
  campDeptCode?: string;
  campOfficeCode?: string;
  campOwnerCode?: string;
  businessCtgryCode?: string;
}

// 经销商活动详情
export interface DealerDetailModal {
  createAt?: string;
  orgName?: string;
  orgCode?: string;
  campName?: string;
  businessCtgryName?: string;
  alwaysOnFlag?: string;
  campStartDate?: string;
  campEndDate?: string;
  channelFieldName?: string;
  channelFormatName?: string;
  campDescr?: string;
  channelList?: ChannelListModal[];
  p2?: string[];
  t_channelList?: ChannelListModal[];
}

export interface FileModal {
  id: number;
  name: string;
}
