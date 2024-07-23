import { defineStore } from "pinia";
import {
  CarParamsModel,
  DraftListModel,
  DraftParamsModel,
  ForMalParamsModel,
  FormalListModel,
  OrderCntModel,
  OrderParamsModel,
  PreSaleListModel,
  PreSaleParamsModel,
  OrderCustomerProfileModel,
  leadDataModel,
} from "/@/api/order/model/orderModel";
import {
  getOrderCnt,
  getOrderList,
  getDlrCdList,
  getCarSeriesList,
  getPowerTypeList,
  getDisplacementList,
  getModelLevel,
  getSfxList,
  getColorList,
  getCustomerLeads,
  addRetailOrderBatch,
  orderUploadApi,
  orderDetailApi,
  getBatchCodeApi,
  getDealerLeadDetailApi,
  getFileUrlApi,
  getDetailApi,
  editBatchApi,
  submitBatchApi,
  geiDealerAreaApi,
  geiDealerUserApi,
} from "/@/api/order";
import { BasicFetchResult } from "/@/api/model/baseModel";

interface UserState {
  orderParams: OrderParamsModel;
  buyerMsg: OrderCustomerProfileModel;
}

export const useOrderStore = defineStore({
  id: "app-customer",
  state: (): UserState => ({
    orderParams: {
      customerName: "",
      mobile: "",
      buyerTypeInd: undefined,
      carSeriesId: undefined,
      powerTypeInd: undefined,
      displacement: undefined,
      carLevel: undefined,
      sfxCode: undefined,
      color: undefined,
      dealerCd: undefined,
      orderSc: undefined,
      orderCreateDtStart: undefined,
      orderCreateDtEnd: undefined,
      multipleFlag: undefined,
    },
    buyerMsg: {
      fullName: "",
      mobile: "",
      genderInd: undefined,
      genderName: "",
    },
  }),
  getters: {
    getOrderParams(): OrderParamsModel {
      return this.orderParams;
    },
    getBuyerMsg(): OrderCustomerProfileModel {
      return this.buyerMsg;
    },
  },
  actions: {
    setParams(info: OrderParamsModel) {
      this.orderParams = info;
    },
    setBuyerMsg(info: OrderCustomerProfileModel) {
      this.buyerMsg = info;
    },
    async getOrderListAction(
      data: DraftParamsModel | PreSaleParamsModel | ForMalParamsModel,
    ): Promise<
      BasicFetchResult<DraftListModel | PreSaleListModel | FormalListModel>
    > {
      return await getOrderList(data);
    },
    async getOrderCntAction(data: OrderParamsModel): Promise<OrderCntModel> {
      return await getOrderCnt(data);
    },
    async getDlrCdListAction(dlrCd: string): Promise<any> {
      const res = await getDlrCdList(dlrCd);
      return res.length ? res[0].children : [];
    },
    async getCarSeriesList(): Promise<any> {
      return await getCarSeriesList();
    },
    async getPowerTypeList(params: CarParamsModel): Promise<any> {
      return await getPowerTypeList(params);
    },
    async getDisplacementList(params: CarParamsModel): Promise<any> {
      return await getDisplacementList(params);
    },
    async getModelLevel(params: CarParamsModel): Promise<any> {
      return await getModelLevel(params);
    },
    async getSfxList(params: CarParamsModel): Promise<any> {
      return await getSfxList(params);
    },
    async getColorList(params: CarParamsModel): Promise<any> {
      return await getColorList(params);
    },
    async getCustomerLeads(params: string): Promise<leadDataModel> {
      return await getCustomerLeads(params);
    },
    async addRetailOrderBatchAction(data: any): Promise<any> {
      return await addRetailOrderBatch(data);
    },
    async orderUploadAction(data: any): Promise<any> {
      return await orderUploadApi(data);
    },
    async orderDetailAction(data: any): Promise<any> {
      return await orderDetailApi(data);
    },
    async getBatchCodeAction(data: any): Promise<any> {
      return await getBatchCodeApi(data);
    },
    async getDealerLeadDetailAction(data: any): Promise<any> {
      return await getDealerLeadDetailApi(data);
    },
    async getFileUrlAction(id: string): Promise<any> {
      return await getFileUrlApi(id);
    },
    async getDetailAction(orderBatchCode: string): Promise<any> {
      return await getDetailApi(orderBatchCode);
    },
    async editBatchAction(data: any): Promise<any> {
      return await editBatchApi(data);
    },
    async submitBatchAction(data: any): Promise<any> {
      return await submitBatchApi(data);
    },
    async geiDealerAreaAction(): Promise<any> {
      return await geiDealerAreaApi();
    },
    async geiDealerUserAction(data: any): Promise<any> {
      return await geiDealerUserApi(data);
    },
  },
});
