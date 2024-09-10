import { defHttp } from "/@/utils/http/axios";
import { ListResult } from "../model/baseModel";
import { ContactUsListParams, ContactUs } from "../contactUs/model";

enum Api {
  ContactUsList = "/contactUs/list",
  DeleteContactUs = "/contactUs/delete",
}

// get all category properties
export const getContactUsListApi = (params: ContactUsListParams) => {
  return defHttp.get<ListResult<ContactUs>>({
    url: Api.ContactUsList,
    params,
  });
};

export const deleteContactUsApi = (id: number) => {
  return defHttp.post<boolean>({
    url: `${Api.DeleteContactUs}/${id}`,
  });
};
