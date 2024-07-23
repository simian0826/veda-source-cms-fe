export enum DictEnum {
  APPROVAL_SCENARIO = "gen2_approval_scenario", // 审批场景
  APPROVAL_STATUS = "gen2_approval_status", // 审批状态
  OPPORTUNITY_LOST_REASON = "gen2_opportunity_lost_reason", // 战败原因
  APPROVAL_TYPE = "gen2_approval_type", // 审批类型
  ETHNICITY_IND = "gen2_ethnicity_ind", // 民族
  DEALER_CITY = "dealer_city", // 在营经销商省市
  PERMISSION_LEVEL_IND = "permission_level_ind", //数据权限层级
  //线索
  GENDER = "gen2_gender", // 性别
  AGE_SELECT = "gen2_age_select", // 年龄
  MARITAL_STATUS_TYPE = "gen2_marital_status_type", // 婚姻状况
  NATIONALITY_IND = "gen2_nationality_ind", // 国籍
  PREFER_LANG = "gen2_prefer_lang", // 语言
  DRIVER_LICENSE_TYPE = "gen2_driver_license_type", // 驾照类型
  RESERVATION_STAT = "gen2_reservation_stat", // 预约状态
  ALL_MODEL_TYPE = "sys_all_model_type", // 历史车型
  DLR_LEAD_SUB_STAGE_IND = "gen2_dlr_lead_stage_ind", // 线索阶段
  DLR_LEAD_SUB_STAT_IND = "gen2_dlr_lead_stat_ind", // 线索状态
  RESERVATION_PURPOSE = "gen2_reservation_purpose", // 预约目的
  SYS_SOURCE = "gen2_sys_source", // 接待类型
  MEET_TYPE = "gen2_meet_type", // 接待类型
  PROVINCE_CITY = "all_city", // 省市
  LEAD_SUB_STATUS = "gen2_dlr_lead_sub_stat_ind", // 线索子状态
  AI_CALL_RESULT_IND = "gen2_media_ob_ai_call_result_ind", //AI外呼结果
  DLR_LEAD_TYPE_IND = "gen2_dlr_lead_type_ind", //线索形态

  DEFEAT_TYPE_IND = "gen2_defeat_type_ind", //战败类型

  // 任务管理
  DLR_LEAD_STAGE_IND = "gen2_dlr_lead_stage_ind", //经销商线索形态
  DLR_LEAD_STAT_IND = "gen2_dlr_lead_stat_ind", //经销商线索状态
  DLR_LEAD_GRADE_IND = "gen2_dlr_lead_grade_ind", //经销商线索评级

  // 订单管理
  BUYER_TYPE = "gen2_buyer_type", // 客户类型
  IDCARD_TYPE = "gen2_idcard_type", // 身份证类型
  ORDER_SOURCE = "gen2_order_source", // 订单来源
  ORDER_STATUS = "gen2_order_status", // 订单状态
  ORDER_CATEGORY = "gen2_order_category", // 订单类型
  ORDER_LOAN_STAT = "gen2_order_loan_stat", // 放款状态
  ALL_DEALER = "all_dealer", // 经销商
  GENGER_IND = "gen2_gender", // 性别
  PROFESSION_NAME = "gen2_profession_name", // 职业
  MARITAL_STAT_IND = "gen2_marital_status_type", // 婚姻状况
  ALL_CITY = "all_city", // 省市区
  PURCHASE_TYPE_IND = "gen2_purchase_type_ind", // 购买类型
  POWER_TYPE_IND = "gen2_power_type_ind", // 动力类型
  DISPLACEMENT_IND = "gen2_displacement_ind", // 排量
  // PURCHASE_METHOD_IND = "gen2_purchase_method_ind", // 车型级别？
  SYS_YES_NO = "sys_yes_no", // 是否置换
  // PURCHASE_METHOD_IND = "gen2_purchase_method_ind", // 购车目的
  ALL_DEALER_GROUP_BY_AREA = "all_dealer_group_by_area", //经销商列表

  TASK_CTGRY_IND = "gen2_task_ctgry_ind", // 任务大类
  TASK_SUB_CTGRY_IND = "gen2_task_sub_ctgry_ind", // 任务子类
  TASK_SUBJECT_IND = "gen2_task_subject_ind", // 任务主题
  TASK_STAT_IND = "gen2_task_stat_ind", // 任务状态
  TASK_RESULT_IND = "gen2_task_result_ind", // 任务结果
  TASK_RESULT_REASON_IND = "gen2_task_result_reason_ind", // 任务结果原因

  // 渠道活动
  CAMP_GATHER_WAY_IND = "camp_gather_way_ind", // 获客方式
  CAMP_ACT_TARGET_IND = "camp_act_target_ind", // 目标类型
  BUYER_GENDER = "gen2_gender", // 客户性别
  PURCHASE_METHOD = "gen2_purchase_method", // 购买方式
  FINANCE_COMPANY = "gen2_finance_company", // 金融公司
  LOAN_TERM = "gen2_loan_term", // 贷款期限
  INSTORE_INSURANCE = "gen2_instore_insurance", // 本店投保
  INSUR_COMPANY = "gen2_insur_company", // 保险公司
  INSUR_ITEM = "gen2_insur_item", // 保险险种
  DECO_ITEM = "gen2_deco_item", // 精品类型
  OPPTY_GRADE_IND = "gen2_oppty_grade_ind", // 意向等级
  LEAD_TYPE_IND = "gen2_dlr_lead_type_ind", // 线索形态
  LEAD_STAT_IND = "gen2_dlr_lead_stat_ind", // 线索状态
  LEAD_STAGE_IND = "gen2_dlr_lead_stage_ind", // 线索阶段
  OEM_DEPT_USER = "oem_dept_user", // 部室担当
  DOMAIN_TYPE = "channel_domain_type_ind", // 公域私域
  LOCATION_TYPE = "channel_location_type_ind", // 线上线下
  CHANNEL_TYPE = "channel_field_type_ind", // 渠道类型
  DISTRIBUTION_CHANNEL = "oem_lead_channel", // 投放渠道
  CUSTOMER_ACQUISITION_STRATEGY = "camp_get_way_ind", // 活动获客方式
  ALL_OPERATION = "all_operation", // 运营公司
  DRIVE_LICENSE_TYPE = "gen2_driver_license_type", //准驾类型
  TEST_DRIVE_TYPE = "gen2_test_drive_type", //试乘试驾类型
  EMERGENCY_CONTACTS_RELATION = "gen2_emergency_contacts_relation", //紧急联系人关系
  IMPORT_TYPE = "gen2_dlr_regis_import_ind", // 导入类型
}
