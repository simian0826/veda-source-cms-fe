import { defineStore } from "pinia";
import { store } from "/@/store";

import {
  TestdriveSearchForm,
  TestdriveListResultModel,
  TestdriveResultModel,
  TestdriveCreateDataModel,
  TestdriveItem,
  TestdriveForm,
  TestDriverInformat,
} from "/@/api/receptionManagement/model/testRideTestdriveModel";
import {
  getTestDriveListApi,
  getTestDriveCreateApi,
  getTestDriveSubmitApi,
  getTestDriveUpdateApi,
  getTestDriveDetailApi,
} from "/@/api/receptionManagement/testRideTestdrive";

export interface TestdriveState {
  TestdriveItemList: TestdriveSearchForm[];
}

export interface TestdriveItemState {
  testdrive: TestdriveState;
}

export const useTestdriveStore = defineStore({
  id: "app-testdrive-registration",
  state: (): TestdriveItemState => ({
    testdrive: {
      TestdriveItemList: [],
    },
  }),
  getters: {
    getTestDrive(): TestdriveState {
      return this.testdrive || {};
    },
  },
  actions: {
    async getTestDriveAction(
      params: TestdriveSearchForm,
    ): Promise<TestdriveListResultModel> {
      const testDriveList = await getTestDriveListApi(params);
      return testDriveList;
    },
    async getTestDriveCreateAction(
      params: object,
    ): Promise<TestdriveResultModel<TestdriveCreateDataModel | TestdriveItem>> {
      const testDriveList = await getTestDriveCreateApi(params);
      return testDriveList;
    },
    async getTestDriveSubmitAction(
      params: object,
    ): Promise<TestdriveForm<TestDriverInformat>> {
      const testDriveList = await getTestDriveSubmitApi(params);
      return testDriveList;
    },
    async getTestDriveDetailAction(
      params: object,
    ): Promise<TestdriveForm<TestDriverInformat>> {
      const testDriveList = await getTestDriveDetailApi(params);
      return testDriveList;
    },
    async getTestDriveUpdateAction(
      params: object,
    ): Promise<TestdriveForm<TestDriverInformat>> {
      const testDriveList = await getTestDriveUpdateApi(params);
      return testDriveList;
    },
  },
});

// Need to be used outside the setup
export function useTestdriveStoreWithOut() {
  return useTestdriveStore(store);
}
