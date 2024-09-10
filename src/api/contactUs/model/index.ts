import { BasicPageParams } from "../../model/baseModel";

export type ContactUs = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export type ContactUsListParams = BasicPageParams & {
  name?: string;
  email?: string;
  subject?: string;
};
