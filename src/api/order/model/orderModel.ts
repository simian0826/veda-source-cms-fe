import type { Dayjs } from "dayjs";

// 列表筛选器
export interface OrderParamsModel {
  customerName: string;
  mobile: string;
  buyerTypeInd: number | undefined;
  carSeriesId: number | undefined;
  powerTypeInd: number | undefined;
  displacement: number | undefined;
  carLevel: string | undefined;
  sfxCode: string | undefined;
  color: string | undefined;
  dealerCd: [] | undefined;
  orderSc: [] | undefined;
  createTime?: any;
  orderCreateDtStart: Dayjs | number | undefined;
  orderCreateDtEnd: Dayjs | number | undefined;
  multipleFlag: number | undefined;
}

export interface DraftParamsModel extends OrderParamsModel {
  queryType: number;
  pageNum: number;
  pageSize: number;
}

export interface PreSaleParamsModel extends OrderParamsModel {
  orderSourceInd: number | undefined;
  orderStatInd: number | undefined;
  queryType: number;
  pageNum: number;
  pageSize: number;
}

export interface ForMalParamsModel extends OrderParamsModel {
  orderSourceInd: number | undefined;
  orderStatInd: number | undefined;
  date?: any;
  arrivalDateStart: Dayjs | number | undefined;
  arrivalDateEnd: Dayjs | number | undefined;
  loanStatusInd: number | undefined;
  queryType: number;
  pageNum: number;
  pageSize: number;
}

// 草稿订单列表
export interface DraftListModel {
  batchCode: string;
  buyerName: string;
  mobile: string;
  firstCampCn: string;
  firstChannelCn: string;
  orderSourceCn: string;
  buyerTypeCn: string;
  orderTypeCn: string;
  batchCarCnt: string;
  multipleFlag: string;
  orderScName: string;
  orderDealerName: string;
  createdDt: string;
}

// 预售期订单列表
export interface PreSaleListModel {
  orderNo: string;
  buyerName: string;
  mobile: string;
  firstCampCn: string;
  firstChannelCn: string;
  orderSourceCn: string;
  buyerTypeCn: string;
  orderTypeCn: string;
  multipleFlag: string;
  carSeriesCn: string;
  powerType: string;
  displacement: string;
  carLevel: string;
  sfxCode: string;
  color: string;
  depositAmt: string;
  orderStatusCn: string;
  orderScName: string;
  orderDealerName: string;
  createdDt: string;
}

// 正式订单列表
export interface FormalListModel {
  orderNo: string;
  buyerName: string;
  mobile: string;
  firstCampCn: string;
  firstChannelCn: string;
  orderSourceCn: string;
  buyerTypeCn: string;
  orderTypeCn: string;
  multipleFlag: string;
  carSeriesCn: string;
  powerType: string;
  displacement: string;
  carLevel: string;
  sfxCode: string;
  color: string;
  depositAmt: string;
  vin: string;
  orderStatusCn: string;
  arriveDate: string;
  deliveryDate: string;
  returnOrderDate: string;
  returnCarDate: string;
  loadStatCn: string;
  orderScName: string;
  orderDealerName: string;
  createdDt: string;
}

export interface OrderCntModel {
  draftCnt: number;
  formalCnt: number;
  preSalesCnt: number;
}

// 车辆信息
export interface CarParamsModel {
  carSeriesId: number | string | undefined;
  powerType?: number | string | undefined;
  displacement?: number;
  modelCode?: string;
  sfxCode?: string;
  status?: number;
}

export interface dlrCdModel {
  label: string;
  value: string;
  children: object;
}

export interface seriesModel {
  seriesNameCn: string;
  id: number;
}

export interface powerTypesModel {
  powerTypeCn: string;
  powerTypeInd: number;
}

export interface displacementModel {
  displacement: string;
  displacementInd: number;
}

export interface carLevelModel {
  modelClassNameCn: string;
  modelCode: number;
}

export interface sfxModel {
  sfxCode: string;
}

export interface colorModel {
  extColorNameCn: string;
  extColorCode: string;
}

// 线索信息
export interface leadDataModel {
  orderCustomerProfile: OrderCustomerProfileModel;
  orderDealerLead: OrderDealerLeadModel;
}

export interface OrderCustomerProfileModel {
  fullName: string;
  mobile: string;
  genderInd: string | undefined;
  genderName: string;
}

export interface OrderDealerLeadModel {
  dlrLeadTypeInd: string;
  firstCampName: string;
  firstChannelName: string;
  opptyGradeInd: string;
  dlrLeadStageInd: string;
  dlrLeadStatInd: string;
  ownerName: string;
  dlrName: string;
  intendCarSeriesId: string;
  intendCarSeriesName: string;
  powerTypeInd: string;
  dispInd: string;
  modelClassNameCn: string;
  id: string;
  replacementFlag: string | undefined;
  oldVehicleBrand: string | undefined;
  oldVehicleSeries: string | undefined;
}

export interface OwnerParamsModel {
  ownerName: string;
  ownerMobile: string;
  ownerGender: string;
  ownerIdCardTypeInd: string;
  ownerIdCardCode: string;
  ownerDocStartDate: string;
  ownerDocEndDate: string;
  ownerEthnic: string;
  ownerBirth: string;
  ownerAddress: string;
  ownerCorpName: string;
  ownerCorpTaxCode: string;
}

// 创建订单总
export interface CreateParamsModel
  extends CreateOwnerModel,
    CreateUserModel,
    CreateCarModel,
    CreatePriceModel,
    CreateFinanceModel,
    CreateInsuranceModel,
    CreateDecoItemModel {
  orderTypeInd: undefined | string;
}

// 创建-名义人
export interface CreateOwnerModel {
  ownerTypeInd: undefined | string;
  ownerName: undefined | string;
  ownerMobile: undefined | string;
  ownerGenderInd: string | undefined;
  ownerIdCardTypeInd: number | undefined;
  ownerIdCardCode: undefined | string;
  ownerDocDate?: any;
  ownerDocStartDate: string;
  ownerDocEndDate: string;
  ownerEthnicInd: undefined | string;
  ownerBirth: undefined | string;
  ownerAddress: undefined | string;
  ownerCorpName: undefined | string;
  ownerCorpTaxCode: undefined | string;
  companyAddress: undefined | string;
  companyContactor: undefined | string;
  companyMobile: undefined | string;
}

// 创建-使用人
export interface CreateUserModel {
  userName: undefined | string;
  userMobile: undefined | string;
  userGenderInd: undefined | string;
  userIdCardTypeInd: number | undefined;
  userIdCardCode: undefined | string;
}

// 创建-车辆
export interface CreateCarModel {
  carSeriesId: number | undefined;
  powerTypeInd: number | undefined;
  displacementInd: number | undefined;
  modelCode: string | undefined;
  sfxCode: string | undefined;
  extColorCode: string | undefined;
}

// 创建-价格
export interface CreatePriceModel {
  modelSkuCode: any;
  orderDiscountAmt: any;
  orderSalePriceAmt: any;
  orderDepositAmt: undefined | string;
  priceCmmt: undefined | string;
}

// 创建-金融
export interface CreateFinanceModel {
  finMethodInd: string | undefined;
  financeCompanyInd: string | undefined;
  loanTermInd: string | undefined;
  downPaymentAmt: undefined | string;
  loanAmt: undefined | string;
  finCmmt: undefined | string;
}

// 创建-保险
export interface CreateInsuranceModel {
  instoreInsuranceInd: string | undefined;
  insurCompanyInd: string | undefined;
  insurItemInd: any;
  cmplsryInsuranceAmt: undefined | string;
  businessInsuranceAmt: undefined | string;
  insuranceCmmt: undefined | string;
}

// 创建-精品
export interface CreateDecoItemModel {
  decorationFlag: string | undefined;
  decoItemInd: string[] | undefined;
  decoItemAmt: undefined | string;
  decoItemCmmt: undefined | string;
  batchCarCnt: number | undefined;
}

// tab页
export interface CreateOrderMsgModel
  extends CreateCarModel,
    CreatePriceModel,
    CreateFinanceModel,
    CreateInsuranceModel,
    CreateDecoItemModel {
  orderTypeInd: undefined | string;
}

// 订单详情-总
export interface OrderDetailModel
  extends OrderMessageModel,
    NominalMessageModel,
    UserMessageModel,
    CarMessageModel,
    PriceMessageModel,
    FinanceMessageModel,
    InsuranceMessageModel,
    GoodsMessageModel,
    HaveCarMessageModel,
    CancelMessageModel {}

// 订单详情-订单信息
export interface OrderMessageModel {
  appOrderNo: string | undefined;
  orderSourceName: string | undefined;
  orderStatName: undefined | string;
  orderTypeName: undefined | string;
  orderScName: string | undefined;
  orderDealerName: string | undefined;
  createAt: string | undefined;
  updateAt: string | undefined;
}

// 订单详情-名义人信息
export interface NominalMessageModel {
  ownerTypeInd: string | number | undefined; //类型id
  ownerTypeName: string | undefined;
  ownerName: undefined | string;
  ownerMobile: undefined | string;
  ownerGenderName: string | undefined;
  ownerIdCardTypeName: string | undefined;
  ownerIdCardCode: string | undefined;
  ownerDocStartDate: string | undefined; //
  ownerDocEndDate: string | undefined; //
  ownerEthnicName: string | undefined;
  ownerBirth: string | undefined;
  ownerAddress: string | undefined;
  ownerCorpName: string | undefined;
  ownerCorpTaxCode: string | undefined;
  companyAddress: string | undefined;
  companyContactor: string | undefined;
  companyMobile: string | undefined;
}
// 订单详情-使用人信息
export interface UserMessageModel {
  userName: string | undefined;
  userMobile: string | undefined;
  userGenderName: undefined | string;
  userIdCardTypeName: undefined | string;
  userIdCardCode: string | undefined;
}
// 订单详情-车辆信息
export interface CarMessageModel {
  carSeriesCn: string | undefined;
  powerTypeNameCn: string | undefined;
  displacement: undefined | string;
  modelCodeCn: undefined | string;
  sfxCode: undefined | string;
  extColorNameCn: string | undefined;
}
// 订单详情-价格信息
export interface PriceMessageModel {
  modelSkuMsrp: string | undefined;
  orderDiscountAmt: string | undefined;
  orderSalePriceAmt: undefined | string;
  orderDepositAmt: undefined | string;
  orderVocPurchaseTax: string | undefined;
  priceCmmt: string | undefined;
}
// 订单详情-金融信息
export interface FinanceMessageModel {
  finMethodName: string | undefined;
  financeCompanyName: string | undefined;
  loanTermName: undefined | string;
  downPaymentAmt: undefined | string;
  loanAmt: undefined | string;
  finCmmt: undefined | string;
}
// 订单详情-保险信息
export interface InsuranceMessageModel {
  instoreInsuranceName: string | undefined;
  insurCompanyName: string | undefined;
  insurItemInd: any;
  cmplsryInsuranceAmt: undefined | string;
  businessInsuranceAmt: undefined | string;
  insuranceCmmt: undefined | string;
}

// 订单详情-精品信息
export interface GoodsMessageModel {
  decorationFlag: string | undefined;
  decoItemInd: any;
  decoItemAmt: undefined | string;
  decoItemCmmt: string | undefined;
}

// 订单详情-交车信息
export interface HaveCarMessageModel {
  vin: string | undefined;
  licnePltNumber: string | undefined;
  deliveryEndDate: string | undefined;
}

// 订单详情-订单取消信息
export interface CancelMessageModel {
  orderCancelDatetime: string | undefined;
  orderCancelReason: string | undefined;
  decoItemAmt: undefined | string;
}

// 订单详情-批次订单
export interface OrderBatchModel {
  orderNo: string | undefined;
  orderSourceCn: string | undefined;
  buyerTypeName: string | undefined;
  carSeriesCn: string | undefined;
  powerType: undefined | string;
  displacement: undefined | string;
  carLevel: undefined | string;
  sfxCode: undefined | string;
  color: undefined | string;
  orderSalePriceAmt: undefined | string;
  orderDepositAmt: undefined | string;
  orderStatusCn: undefined | string;
  createdDt: undefined | string;
}

// 订单详情-线索信息
export interface ClueMessageModel {
  dealerCustomerProfile: DealerCustomerProfile;
  dealerLead: DealerLeadVO;
}

export interface DealerCustomerProfile {
  fullName: string | undefined;
  mobile: string | undefined;
  genderInd: undefined | string;
  genderName: undefined | string;
}

export interface DealerLeadVO {
  dlrLeadTypeInd: undefined | string;
  firstCampName: undefined | string;
  firstChannelName: string | undefined;
  opptyGradeInd: string | undefined;
  dlrLeadStageInd: string | undefined;
  dlrLeadStatInd: string | undefined;
  ownerName: string | undefined;
  dlrName: string | undefined;
  intendCarSeriesId: string | undefined;
  intendCarSeriesName: string | undefined;
  powerTypeInd: string | undefined;
  dispInd: string | undefined;
  modelClassNameCn: string | undefined;
  replacementFlag: string | undefined;
  oldVehicleBrand: string | undefined;
  oldVehicleSeries: string | undefined;
  purchasePurposeInd: string | undefined;
}
