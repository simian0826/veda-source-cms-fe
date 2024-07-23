import { defHttp } from "/@/utils/http/axios";
import {
  TestdriveSearchForm,
  TestdriveListResultModel,
  TestdriveResultModel,
  TestdriveCreateDataModel,
  TestdriveItem,
  TestdriveForm,
  TestDriverInformat,
} from "./model/testRideTestdriveModel";

import { ErrorMessageMode } from "/#/axios";

const TESTDRIVE_URL_PREFIX = "/gen2-lead/testDrive";

enum Api {
  TestDriveList = TESTDRIVE_URL_PREFIX + "/getTestDrivePage",
  TestDriveListCreateList = TESTDRIVE_URL_PREFIX + "/getDealerLeadByMobile",
  TestDriveListSubmitList = TESTDRIVE_URL_PREFIX + "/submit",
  TestDriveListDetailList = TESTDRIVE_URL_PREFIX + "/getTestDrive",
  TestDriveListUpdateList = TESTDRIVE_URL_PREFIX + "/update",
}

/**
 * @description: user login api
 */
export function getTestDriveListApi(
  params: TestdriveSearchForm,
  mode: ErrorMessageMode = "modal",
) {
  return defHttp.post<TestdriveListResultModel>(
    {
      url: Api.TestDriveList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
export function getTestDriveCreateApi(params: object) {
  return defHttp.get<
    TestdriveResultModel<TestdriveCreateDataModel | TestdriveItem>
  >({
    url: Api.TestDriveListCreateList,
    params,
  });
}

export function getTestDriveDetailApi(params: object) {
  return defHttp.get<TestdriveForm<TestDriverInformat>>({
    url: Api.TestDriveListDetailList,
    params,
  });
}
export function getTestDriveSubmitApi(params: object) {
  return defHttp.post<TestdriveForm<TestDriverInformat>>({
    url: Api.TestDriveListSubmitList,
    params,
  });
}
export function getTestDriveUpdateApi(params: object) {
  return defHttp.post<TestdriveForm<TestDriverInformat>>({
    url: Api.TestDriveListUpdateList,
    params,
  });
}
