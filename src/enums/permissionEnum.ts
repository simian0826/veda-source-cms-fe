/*
 * @Author: Lisisi
 * @Date: 2024-04-18 09:26:50
 * @LastEditTime: 2024-05-14 10:13:00
 * @LastEditors: Liang Zeng
 * @Description:
 */
export enum PermissionEnum {
  /* 线索管理模块 */
  CLUE_CLUELIST_BTN_ASSIGN = "1000", // 线索管理-经销商线索列表-按钮-分配
  CLUE_CLUELIST_BTN_REASSIGN = "1001", // 线索管理-经销商线索列表-按钮-重新分配
  CLUE_CLUELIST_BTN_IMPORT_ACARD = "1002", // 线索管理-经销商线索列表-按钮-导入A卡
  CLUE_CLUELIST_BTN_IMPORT_PCUSTOMER = "1003", // 线索管理-经销商线索列表-按钮-导入潜客
  CLUE_CLUELIST_BTN_CREATE_PCUSTOMER = "1004", // 线索管理-经销商线索列表-按钮-创建潜客
  CLUE_CLUELIST_BTN_CREATE_ACARD = "1005", // 线索管理-经销商线索列表-按钮-创建A卡
  CLUE_CLUEDETAIL_BTN_BUSINESS = "1006", // 线索管理-经销商线索详情-按钮-商机转化
  CLUE_CLUEDETAIL_BTN_APPLYDEFEAT = "1007", // 线索管理-经销商线索详情-按钮-申请战败
  CLUE_CLUEDETAIL_BTN_ADJUSTINTENLEVEL = "1008", // 线索管理-经销商线索详情-按钮-调整意向等级
  CLUE_APPOINTINFORLIST_BTN_CREATE = "1009", // 线索管理-经销商线索详情-预约单信息列表-按钮-新建
  CLUE_APPOINTINFORLIST_BTN_EDIT = "1010", // 线索管理-经销商线索详情-预约单信息列表-按钮-编辑
  CLUE_APPOINTINFORLIST_BTN_CANCEL = "1011", // 线索管理-经销商线索详情-预约单信息列表-按钮-取消
  CLUE_APPOINTINFORLIST_BTN_RESTART = "1012", // 线索管理-经销商线索详情-预约单信息列表-按钮-重启
  CLUE_APPOINTINFORLIST_BTN_CREATERECEPTION = "1013", // 线索管理-经销商线索详情-预约单信息列表-按钮-创建接待登记
  CLUE_RECEPREGISTER_BTN_APPLYDRIVE = "1014", // 线索管理-接待登记信息-按钮-申请试乘试驾
  CLUE_RECEPREGISTER_BTN_CREATE = "1015", // 线索管理-接待登记信息-按钮-新建
  CLUE_CLUEDETAIL_BTN_EDIT = "1069", // 线索管理-线索详情-按钮-编辑
  CLUE_CLUEDETAIL_BTN_ASSIGN = "1104", // 线索管理-经销商线索详情-按钮-线索分配

  /* 客档管理 */
  CUSFILE_CUSFILELIST_BTN_EDIT = "1016", // 客档管理-经销商客档列表-按钮-修改
  CUSFILE_CUSFILEDETAIL_BTN_EDIT = "1017", // 客档管理-经销商客档详情-按钮-修改

  /* 任务管理 */
  TASK_WHOLESTORE_TASKLIST_SELECTOR = "1018", // 任务管理-全店任务列表-筛选器
  TASK_TASKDETAIL_BTN_EXECUTABLE = "1096", // 任务管理-任务详情-执行
  TASK_TASKDETAIL_BTN_VIEWABLE = "1097", // 任务管理-任务详情-查看
  TASK_TASKLIST_BTN_OUTBOUNDCALL = "1098", // 任务管理-任务列表-垂媒外呼

  /* 接待管理 start */
  /* 预约管理 */
  RECEPTION_APPOINTLIST_BTN_CREATE = "1019", // 接待管理-预约模块-预约列表-按钮-新建
  RECEPTION_APPOINTLIST_BTN_EXPORT = "1020", // 接待管理-预约模块-预约列表-按钮-导出
  RECEPTION_APPOINTLIST_BTN_CHECK = "1021", // 接待管理-预约模块-预约列表-按钮-查看
  RECEPTION_APPOINTLIST_BTN_EDIT = "1022", // 接待管理-预约模块-预约列表-按钮-修改
  RECEPTION_APPOINTLIST_BTN_VOID = "1023", // 接待管理-预约模块-预约列表-按钮-作废
  RECEPTION_APPOINTLIST_BTN_RESTART = "1024", // 接待管理-预约模块-预约列表-按钮-重启
  RECEPTION_APPOINTLIST_BTN_CREATERECEP = "1025", // 接待管理-预约模块-预约列表-按钮-新建接待记录
  RECEPTION_APPOINTCREATE_SELECTOR_ORDERALLOCATIONPERSON = "1026", // 接待管理-预约模块-预约新建页面-下拉框-预约单分配人
  RECEPTION_APPOINTCREATE_TEXT_ORDERALLOCATIONPERSON = "1027", // 接待管理-预约模块-预约新建页面-文本框-预约单分配人
  RECEPTION_APPOINTDEATIL_BTN_EDIT = "1028", // 接待管理-预约模块-预约详情页面-按钮-修改
  RECEPTION_APPOINTDEATIL_BTN_VOID = "1029", // 接待管理-预约模块-预约详情页面-按钮-作废
  RECEPTION_APPOINTDEATIL_BTN_RESTART = "1030", // 接待管理-预约模块-预约详情页面-按钮-重启
  RECEPTION_APPOINTDEATIL_BTN_CREATERECEP = "1031", // 接待管理-预约模块-预约详情页面-按钮-新建接待记录

  /* 接待记录 */
  RECEPTION_RECEPTIONLIST_BTN_CREATE = "1032", // 接待管理-接待记录-接待记录列表页面-按钮-新建
  RECEPTION_RECEPTIONLIST_BTN_QR = "1033", // 接待管理-接待记录-接待记录列表页面-按钮-生成数字签到二维码
  RECEPTION_RECEPTIONLIST_BTN_EDIT = "1034", // 接待管理-接待记录-接待记录列表页面-按钮-修改
  RECEPTION_RECEPTIONLIST_BTN_APPLYDRIVE = "1035", // 接待管理-接待记录-接待记录列表页面-按钮-申请试乘试驾
  RECEPTION_RECEPTIONCREATE_SELECTOR_RECEPPERSON = "1036", // 接待管理-接待记录-接待记录新建页面-下拉框-接待分配人
  RECEPTION_RECEPTIONCREATE_TEXT_RECEPPERSON = "1037", // 接待管理-接待记录-接待记录新建页面-文本框-接待分配人
  RECEPTION_RECEPTIONCHECK_BTN_EDIT = "1038", // 接待管理-接待记录-接待记录查看页面-按钮-修改
  RECEPTION_RECEPTIONCHECK_BTN_APPLYDRIVE = "1039", // 接待管理-接待记录-接待记录查看页面-按钮-申请试乘试驾

  /* 试乘试驾 */
  APPLYDRIVE_APPLYDRIVELIST_BTN_CREATE = "1040", // 试乘试驾-试乘试驾列表-按钮-新建
  APPLYDRIVE_APPLYDRIVELIST_BTN_EDIT = "1041", // 试乘试驾-试乘试驾列表-按钮-修改
  APPLYDRIVE_APPLYDRIVEDETAI_BTN_EDIT = "1042", // 试乘试驾-试乘试驾详情页面-按钮-修改
  /* 接待管理 end */

  /* 订单管理  */
  ORDER_ORDERLIST_BTN_CREATE = "1043", // 订单管理-订单列表-按钮-新建
  ORDER_ORDERLIST_BTN_EDIT = "1044", // 订单管理-订单列表-按钮-修改
  ORDER_ORDERLIST_BTN_SUBMIT = "1045", // 订单管理-订单列表-按钮-提交
  ORDER_ORDERLIST_BTN_DELETE = "1046", // 订单管理-订单列表-按钮-删除
  ORDER_BATCHORDEREDIT_BTN_SAVE = "1047", // 订单管理-批次订单编辑页面-按钮-保存
  ORDER_BATCHORDEREDIT_BTN_SUBMIT = "1048", // 订单管理-批次订单编辑页面-按钮-提交
  ORDER_CHILDORDERDETAI_BTN_SAVE = "1049", // 订单管理-子订单详情页面-按钮-保存
  ORDER_CHILDORDERDETAI_BTN_SUBMIT = "1050", // 订单管理-子订单详情页面-按钮-提交

  /* 渠道活动 */
  CHANNEL_CHANNELLIST_BTN_CREATE = "1051", // 渠道活动-渠道列表-按钮-新建
  CHANNEL_CHANNELLIST_BTN_START = "1052", // 渠道活动-渠道列表-按钮-启用
  CHANNEL_CHANNELLIST_BTN_STOP = "1053", // 渠道活动-渠道列表-按钮-停用
  CHANNEL_CHANNELLIST_BTN_EDIT = "1054", // 渠道活动-渠道列表-按钮-修改
  CHANNEL_CHANNELLIST_BTN_DELETE = "1055", // 渠道活动-渠道列表-按钮-删除
  CHANNEL_CHANNELDETAI_BTN_START = "1056", // 渠道活动-渠道详情页面-按钮-启用
  CHANNEL_CHANNELDETAI_BTN_STOP = "1057", // 渠道活动-渠道详情页面-按钮-停用
  CHANNEL_CHANNELDETAI_BTN_EDIT = "1058", // 渠道活动-渠道详情页面-按钮-修改
  CHANNEL_CHANNELDETAI_BTN_DELETE = "1059", // 渠道活动-渠道详情页面-按钮-删除
  CHANNEL_ACTIVITYLIST_BTN_CREATE = "1060", // 渠道活动-活动列表-按钮-新建
  CHANNEL_ACTIVITYLIST_BTN_EDIT = "1061", // 渠道活动-活动列表-按钮-修改
  CHANNEL_ACTIVITYDETAI_BTN_EDIT = "1063", // 渠道活动-活动详情-按钮-修改
  CHANNEL_CHANNELLIST_DEALER_BTN_CREATE = "1077", // 渠道活动-渠道列表-经销商渠道-按钮-新建
  CHANNEL_CHANNELLIST_DEALER_BTN_UPDATE = "1078", // 渠道活动-渠道列表-经销商渠道-按钮-修改
  CHANNEL_CHANNELLIST_DEALERDETAIL_BTN_UPDATE = "1079", // 渠道活动-渠道列表-经销商渠道-详情-按钮-修改
  CHANNEL_CHANNELLIST_DEALER_BTN_DELETE = "1080", // 渠道活动-渠道列表-经销商渠道-按钮-删除
  CHANNEL_ACTIVITYLIST_DEALER_BTN_CREATE = "1081", // 渠道活动-活动列表-经销商活动-按钮-新建
  CHANNEL_ACTIVITYLIST_DEALER_BTN_UPDATE = "1082", // 渠道活动-活动列表-经销商活动-按钮-修改
  CHANNEL_ACTIVITYLIST_DEALER_BTN_IMPORTCAPITAL = "1083", // 渠道活动-活动列表-经销商活动-按钮-导入留资
  CHANNEL_ACTIVITYLIST_DEALER_BTN_IMPORTPOTENTIAL = "1084", // 渠道活动-活动列表-经销商活动-按钮-导入潜客
  CHANNEL_ACTIVITYLIST_DEALER_BTN_IMPORTCARD = "1085", // 渠道活动-活动列表-经销商活动-按钮-导入A卡
  CHANNEL_ACTIVITYLIST_DEALERDETAIL_BTN_UPDATE = "1086", // 渠道活动-活动列表-经销商活动-详情-按钮-修改
  CHANNEL_ACTIVITYLIST_DEALERDETAIL_BTN_IMPORTCAPITAL = "1087", // 渠道活动-活动列表-经销商活动-详情-按钮-导入留资
  CHANNEL_ACTIVITYLIST_DEALERDETAIL_BTN_IMPORTPOTENTIAL = "1088", // 渠道活动-活动列表-经销商活动-详情-按钮-导入潜客
  CHANNEL_ACTIVITYLIST_DEALERDETAIL_BTN_IMPORTCARD = "1089", // 渠道活动-活动列表-经销商活动-详情-按钮-导入A卡
  CHANNEL_ACTIVITYLIST_BTN_IMPORTCAPITAL = "1090", // 渠道活动-活动列表-厂商活动-按钮-导入留资
  CHANNEL_ACTIVITYLIST_BTN_IMPORTPOTENTIAL = "1091", // 渠道活动-活动列表-厂商活动-按钮-导入潜客
  CHANNEL_ACTIVITYLIST_BTN_IMPORTCARD = "1092", // 渠道活动-活动列表-厂商活动-按钮-导入A卡
  CHANNEL_ACTIVITYLIST_DETAIL_BTN_IMPORTCAPITAL = "1093", // 渠道活动-活动列表-厂商活动-详情-按钮-导入留资
  CHANNEL_ACTIVITYLIST_DETAIL_BTN_IMPORTPOTENTIAL = "1094", // 渠道活动-活动列表-厂商活动-详情-按钮-导入潜客
  CHANNEL_ACTIVITYLIST_DETAIL_BTN_IMPORTCARD = "1095", // 渠道活动-活动列表-厂商活动-详情-按钮-导入A卡

  /* 审批管理 */
  APPROVAL_MYAPPROVAL_BTN_APPROVE = "1065", // 审批管理-我的审批-按钮-批准
  APPROVAL_MYAPPLY_BTN_REJECT = "1066", // 审批管理-我的审批-按钮-驳回
  APPROVAL_MYAPPLY_BTN_REVOKE = "1070", // 审批管理-我的申请-按钮-撤回

  /* 统计分析 start */
  /* 用户管理 */
  USER_USERLIST_BTN_EDIT = "1067", // 用户管理-用户列表-按钮-编辑
  USER_USERLIST_BTN_CHECK = "1068", // 用户管理-用户列表-按钮-查看
  USER_USERLIST_BTN_POTENTIAL_INHERIT = "1071", // 用户管理-用户列表-按钮-潜客继承
  USER_USERLIST_BTN_POTENTIAL_INHERITING = "1072", // 用户管理-用户列表-按钮-潜客继承中
  USER_USERLIST_BTN_POTENTIAL_INHERITED = "1073", // 用户管理-用户列表-按钮-潜客继承完成
  USER_USERLIST_BTN_PROTECT_INHERIT = "1074", // 用户管理-用户列表-按钮-保客继承
  USER_USERLIST_BTN_PROTECT_INHERITING = "1075", // 用户管理-用户列表-按钮-保客继承中
  USER_USERLIST_BTN_PROTECT_INHERITED = "1076", // 用户管理-用户列表-按钮-保客继承完成
  /* 统计分析 end */
}
