import { defineStore } from "pinia";
import { store } from "/@/store";

import {
  ReceptionSearchForm,
  ReceptionListResultModel,
  ReceptionCreateDataModel,
  ReceptionCreateResultModel,
  ReceptionForm,
  UserRole,
  CarSeries,
} from "/@/api/receptionManagement/model/receptionRegistrationModel";
import {
  getReceptionListApi,
  getReceptionCreateApi,
  getReceptionSubmitApi,
  getReceptionDetailApi,
  getReceptionUpdateApi,
  getUserRoleApi,
  getCarSeriesApi,
  getModelSkuListApi,
  getPowerTypeListApi,
  getDisplacementListApi,
  getNewBookCampListApi,
  getNewBookChannelListApi,
  getNaturalBookCampListApi,
  getNaturalBookChannelListApi,
  getLeadReservationDealerLeadApi,
} from "/@/api/receptionManagement/receptionRegistration";
import { getValue } from "/@/views/receptionManagement/utils";
export interface ReceptionRecordState {
  receptionItemList: ReceptionSearchForm[];
}

export interface ReceptionRegistrationState {
  reception: ReceptionRecordState;
}

export const useReceptionRegistrationStore = defineStore({
  id: "app-reception-registration",
  state: (): ReceptionRegistrationState => ({
    reception: {
      receptionItemList: [],
    },
  }),
  getters: {
    getReceptionRecord(): ReceptionRecordState {
      return this.reception || {};
    },
  },
  actions: {
    async getReceptionRecordAction(
      params: ReceptionSearchForm,
    ): Promise<ReceptionListResultModel> {
      const receptionList = await getReceptionListApi(params);
      return receptionList;
    },
    async getReceptionRecordCreateAction(
      params: object,
    ): Promise<
      ReceptionCreateResultModel<ReceptionCreateDataModel | ReceptionForm>
    > {
      const receptionList = await getReceptionCreateApi(params);
      return receptionList;
    },
    async getReceptionRecordSubmitAction(
      params: any,
    ): Promise<ReceptionListResultModel> {
      const receptionList = await getReceptionSubmitApi(params);
      return receptionList;
    },
    async getReceptionRecordDetailAction(
      params: object,
    ): Promise<ReceptionForm> {
      const receptionList = await getReceptionDetailApi(params);
      return receptionList;
    },
    async getReceptionRecordUpdateAction(
      params: ReceptionForm,
    ): Promise<ReceptionListResultModel> {
      const receptionList = await getReceptionUpdateApi(params);
      return receptionList;
    },
    async getUserRoleAction(params: object): Promise<UserRole> {
      const receptionList = await getUserRoleApi(params);
      return receptionList;
    },
    async getCarSeriesAction(params: object): Promise<CarSeries> {
      const receptionList = await getCarSeriesApi(params);
      return getValue(receptionList, "id");
    },
    async getModelSkuListAction(params: object): Promise<object> {
      const receptionList = await getModelSkuListApi(params);
      return receptionList;
    },
    async getPowerTypeListAction(params: object): Promise<object> {
      const receptionList = await getPowerTypeListApi(params);
      return getValue(receptionList, "powerTypeInd");
    },
    async getDisplacementListAction(params: object): Promise<object> {
      const receptionList = await getDisplacementListApi(params);
      return getValue(receptionList, "displacementInd");
    },
    async getNewBookCampListAction(params: object): Promise<object> {
      const receptionList = await getNewBookCampListApi(params);
      return receptionList;
    },
    async getNaturalBookChannelListAction(params: object): Promise<object> {
      const receptionList = await getNaturalBookChannelListApi(params);
      return receptionList;
    },
    async getNewBookChannelListAction(params: object): Promise<object> {
      const receptionList = await getNewBookChannelListApi(params);
      return receptionList;
    },
    async getNaturalBookCampListAction(params: object): Promise<object> {
      const receptionList = await getNaturalBookCampListApi(params);
      return receptionList;
    },
    async getLeadReservationDealerLeadAction(params: any): Promise<any> {
      const reservationList = await getLeadReservationDealerLeadApi(params);
      return reservationList;
    },
  },
});

// Need to be used outside the setup
export function useReceptionRegistrationStoreWithOut() {
  return useReceptionRegistrationStore(store);
}
