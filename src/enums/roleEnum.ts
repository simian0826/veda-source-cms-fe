export enum RoleEnum {
  // super admin
  SUPER = "super",

  // tester
  TEST = "test",

  DCCM = "2",
  DCC = "3",

  SC = "4",
  SCM = "5",
}

export enum RoleSubtypeEnum {
  DEALER_MNG = "1", //经销商总经理
  DEALER_DCC_MNG = "2", //经销商DCC经理
  DEALER_DCC_COMM = "3", //经销商DCC专员
  DEALER_SC = "4", //经销商销售顾问 SC
  DEALER_SC_MNG = "5", //经销商销售经理 SC manager
  DEALER_RECEPTION = "6", //经销商前台
  FTMC_REGION_MNG = "7", //FTMC区域经理
  FTMC_DTC_COMM = "8", //FTMC DTC专员
  FTMC_DTC_MNG = "9", //FTMC DTC经理
  DEALER_CR_MNG = "10", //经销商CR经理
  DEALER_CR_COMM = "11", //经销商CR专员
  DEALER_SRV_MNG = "12", //经销商服务经理
  DEALER_SRV_C = "13", //经销商服务顾问
  DEALER_TECH_COMM = "14", //经销商技术专员
  DEALER_OTHER = "15", //经销商其他角色
  DEALER_GROUP = "16", //经销商集团用户
  DEALER_MKT_MNG = "17", //经销商市场经理
  DEALER_SYS_ADM = "18", //经销商系统管理员
  FTCM_ADM = "19", //FTMC管理员
  DEALER_BSS = "20", //FTMC业务用户
  DEALER_REGION = "21", //FTMC区域用户
  ADMIN = "22", // admin
}
