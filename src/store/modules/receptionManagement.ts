import { defineStore } from "pinia";
import { store } from "/@/store";

import {
  ReservationListItem,
  ReservationListParams,
  ReservationListResultModel,
  ReservationListCreateResultModel,
  ReservationListCreateDataModel,
  ReservationListCreateOtherDataModel,
  ReservationListCancelModel,
  ReservationListUpdateModel,
  AppointmentForm,
} from "/@/api/receptionManagement/model/reservationManagementModel";
import {
  getReservationListApi,
  getLeadReservationCreateApi,
  getLeadReservationDetailApi,
  getLeadReservationUpdateApi,
  getLeadReservationSubmitApi,
  getLeadReservationCancelApi,
} from "/@/api/receptionManagement/reservationManagement";

export interface ReservationManagementState {
  reservationItemList: ReservationListItem[];
}

export interface ReceptionManagementState {
  reservation: ReservationManagementState;
}

export const useReceptionManagementStore = defineStore({
  id: "app-reception-management",
  state: (): ReceptionManagementState => ({
    reservation: {
      reservationItemList: [],
    },
  }),
  getters: {
    getReceptionManagement(): ReservationManagementState {
      return this.reservation || {};
    },
  },
  actions: {
    async getReservationListAction(
      params: ReservationListParams,
    ): Promise<ReservationListResultModel> {
      const reservationList = await getReservationListApi(params);
      return reservationList;
    },
    async getLeadReservationCreateAction(
      params: object,
    ): Promise<
      ReservationListCreateResultModel<
        ReservationListCreateDataModel | ReservationListCreateOtherDataModel
      >
    > {
      const reservationList = await getLeadReservationCreateApi(params);
      return reservationList;
    },
    async getLeadReservationDetailAction(
      params: object,
    ): Promise<AppointmentForm> {
      const reservationList = await getLeadReservationDetailApi(params);
      return reservationList;
    },
    async getLeadReservationUpdateAction(
      params: object,
    ): Promise<ReservationListUpdateModel> {
      const reservationList = await getLeadReservationUpdateApi(params);
      return reservationList;
    },
    async getLeadReservationSubmitAction(
      params: object,
    ): Promise<ReservationListResultModel> {
      const reservationList = await getLeadReservationSubmitApi(params);
      return reservationList;
    },
    async getLeadReservationCancelAction(
      params: ReservationListCancelModel,
    ): Promise<object> {
      const reservationList = await getLeadReservationCancelApi(params);
      return reservationList;
    },
  },
});

// Need to be used outside the setup
export function useReceptionManagementStoreWithOut() {
  return useReceptionManagementStore(store);
}
