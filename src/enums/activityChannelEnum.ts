export enum TAB_TYPE {
  MANUFACTURER = "厂商渠道",
  DEALER = "经销商自建渠道",
  MANUFACTURERACTIVITY = "厂商活动",
  DEALERACTIVITY = "经销商自建活动",

  CHANNEL = "channel",
  ACTIVITY = "act",
}

export enum ROLE {
  OEM = "2",
  DEALER = "1",
  OEM_KEY = "oem",
  DEALER_KEY = "dealer",
  OEM_DLR_KEY = "oemFromDealer",
  DLR_CARD = "card",
}

export const ORG_CODE = "FTMC88888888";
export const ORG_NAME = "厂商";

export const TIME_DEF_TYPE = "自定义时间";
export const TIME_LONG_TYPE = "长期活动";

export const MUST = "必填字段！";

export enum OPERAT_TYPE {
  VIEW = "view",
  CREATE = "create",
  UPDATE = "update",
  VIEW_UPDATE = "viewUpdate",
}

export enum OPTION_VALUE_CODE {
  // 渠道
  CHANNEL_ID = "_id",
  CHANNEL_ALL_ID = "channel_id",
  CHANNEL_FIELD_NAME = "channel_field_name",
  CHANNEL_FORMAT_NAME = "channel_format_name",
  CHANNEL_LOCATION_NAME = "channel_location_type_ind",
  CHANNEL_DOMAIN_NAME = "channel_domain_type_ind",
  OEM_LEAD_FLAG = "oem_lead_input_flag",
  DLR_LEAD_FLAG = "dlr_lead_input_flag",
  DLR_CARD_FLAG = "dlr_card_input_flag",
  CHANNEL_ACTIVATE_FLAG = "channel_activate_flag",
  DEPT_USER = "dept_user",
  CHANNEL_FIELD_TYPE_NAME = "channel_field_type_ind",
  CREATETIME = "createTime",
  CHANNEL_CODE = "channel_code",
  DEALER_BRIEF = "org_name",
  // 活动
  CAMP_ID = "_id",
  CAMP_NAME = "camp_name",
  BUSSINESS_CTGRY_CODE = "business_ctgry_code",
  BUSSINESS_CTGRY_NAME = "business_ctgry_name",
  OPERATION_CONTACT_ID = "operation_contact_id",
  DLR_SHARE_FLAG = "dlrShare_flag",
  CAMP_STAGE_IND = "camp_stage_ind",
  OPERATION_COMPANY_ID = "all_operation",
  CONTACT_MOBILE = "contact_mobile",
  CONTACT_PERSON_NAME = "contact_person_name",
  CAR_SERIES = "car_series",
}

export enum PAGE_TYPE {
  OEM_CHANNEL_PAGE = "oemChannelCurPage",
  DEALE_CHANNEL_PAGE = "dealerChannelCurPage",
  OEM_ACT_PAGE = "oemActivityPage",
  DEALER_ACT_PAGE = "dealerActivityPage",
  OEM_CHANNEL_SIZE = "oemCannelCurSize",
  DEALER_CHANNEL_SIZE = "dealerChannelCurSize",
  OEM_ACT_SIZE = "oemActivitySize",
  DEALER_ACT_SIZE = "dealerActivitySize",
}

export enum OPTOIN_TYPE_NAME {
  OEM_CHANNEL_OPTOIN = "oemListOption",
  DEALER_CHANNEL_OPTION = "dealerListOption",
  OEM_ACT_OPTION = "oemActivityOption",
  DEALER_ACT_OPTION = "dealerActivityOption",
}
