import { defHttp } from "/@/utils/http/axios";
import { BasicPageParams } from "../model/baseModel";

enum Api {
  MemberList = "/person/list",
}

// get all category properties
export const getMemberListApi = (params: BasicPageParams) => {
  return defHttp.get({
    url: Api.MemberList,
    params,
  });
};
