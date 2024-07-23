import { defHttp } from "/@/utils/http/axios";
import { DictResult } from "./model/dictModel";
import { DictEnum } from "/@/enums/dictEnum";

enum Api {
  GetDict = "/gen2-system/basic/dataMeta",
}

/**
 * @description: Get user menu based on id
 */

export const getDictFieldsApi = (params?: DictEnum[]) => {
  return defHttp.post<DictResult>({ url: Api.GetDict, params });
};
