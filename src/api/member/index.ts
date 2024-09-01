import { defHttp } from "/@/utils/http/axios";
import { BasicPageParams, ListResult } from "../model/baseModel";
import { Member } from "./model";

enum Api {
  MemberList = "/person/list",
  //member
  CreateMember = "/person/create",
  UpdateMember = "/person/update",
  DeleteMember = "/person/delete",
}

// get all category properties
export const getMemberListApi = (params: BasicPageParams) => {
  return defHttp.get<ListResult<Member>>({
    url: Api.MemberList,
    params,
  });
};

export const createMemberApi = (params: Member) => {
  return defHttp.post<boolean>({ url: Api.CreateMember, params });
};
export const updateMemberApi = (params: Member) => {
  return defHttp.post<boolean>({ url: Api.UpdateMember, params });
};
export const deleteMemberApi = (id: number) => {
  return defHttp.post<boolean>({ url: `${Api.DeleteMember}/${id}` });
};
