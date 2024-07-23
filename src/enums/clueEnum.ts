export enum TAB_TYPE {
  IMPORT_BATCH = "IMPORT_BATCH",
  IMPORT_DETAIL = "IMPORT_DETAIL",
}

export enum TAB_TYPE_TEXT {
  IMPORT_BATCH = "导入批次记录",
  IMPORT_DETAIL = "导入明细",
}

export enum OPTION_VALUE_CODE {
  IMPORT_BATCH_ID = "regisImportBatchId", // 批次号
  IMPORT_TYPE = "dlrRegisImportInd", // 导入类型
  IMPORT_DATE_TIME = "regisImportDateTime", //上传时间
  FILE_NAME = "fileName", // 文件名
  DEALER_NAME = "dealerName", // 经销商名
  DLRACCOUNT_NAME = "dlrAccountName", // 操作人
  IMPORT_RECORD = "importRecordCnt", // 总导入记录数
  NEW_DLR_CUS = "newDlrCusCnt", // 新建经销商客档数
  NEW_DLR_LEAD = "newDlrLeadCnt", //新建经销商潜客数
  DUPLICATE_REGISCNT = "duplicateRegisCnt", // 系统去重数
  NEW_DLRA_CARD = "newDlrAcardCnt", // 新建A卡数量

  NAME = "name", // 称呼
  PHONE = "phone", // 手机号
  SEX = "sex", //性别
  CAMP_ID = "campId", // 获客活动
  CHANNEL_ID = "channelId", // 获客渠道
  OPPTY_GRADE = "opptyGrade", // 意向等级

  DUP_REGIS_FLAG = "dupRegisFlag", // 是否系统去重
  NEW_DLRCUS_PROFILE_FLAG = "newDlrCusProfileFlag", // 是否新建经销商客档数
  NEW_DLR_LEAD_FLAG = "newDlrLeadFlag", // 是否新建经销商潜客
}

export enum PAGE_TYPE {
  IMPORT_BATCH_PAGE = "importBatchPage",
  IMPORT_DETAIL_PAGE = "importDetailPage",

  IMPORT_BATCHL_SIZE = "importBatchSize",
  IMPORT_DETAIL_SIZE = "importDetailSize",
}

export enum IMPORT_TYPE {
  ACARD, // A 卡
  POTENTIAL, // 潜客
  OEM, // 工厂
}

// export enum OPTOIN_TYPE_NAME {
//     OEM_CHANNEL_OPTOIN = "oemListOption",
//     DEALER_CHANNEL_OPTION = "dealerListOption",
//     OEM_ACT_OPTION = "oemActivityOption",
//     DEALER_ACT_OPTION = "dealerActivityOption",
// }
