import { ModalProps, CascaderProps, UploadProps } from "ant-design-vue";
interface RequestParamsModel {
  campId?: string | number | null;
}
interface ActivityParamsModel {
  id?: number[] | string[] | null;
  orgCode?: string;
  userAccount?: string;
}

interface ActivityOptionsModel {
  label: string;
  value?: number;
  fullName?: string;
  children?: ActivityOptionsModel[];
}

// interface ImportResponseModel{
//     code:number,
//     data:string,
//     msg:string,
// }

interface SubmitError {
  message: string;
}

interface SubmitSucccess {
  data: string;
  message: string;
}

interface ImportModalProps {
  activityType?: number | string; // 活动名称组件类型
  activityValue?: string | number; // 活动名称选中value
  modalProps?: ModalProps; // 弹窗props
  optionsProps?: CascaderProps; // 级联props
  uploadProps?: UploadProps; // 上传props
  activityOptionsPromise?: () => Promise<ActivityOptionsModel[]>; // 活动名称Promise
  importPromise?: (params: FormData) => Promise<Recordable>; // 导入Promise
  downloadPromise?: (params: RequestParamsModel) => Promise<Recordable>; // 上传Promise
}

interface ImportModalEmits {
  (event: "onSubmitSuccess", value: SubmitSucccess): void; // 上传成功回调
  (event: "onSubmitError", error: SubmitError): void; // 上传失败回调
  (event: "onCancel", open: boolean): void;
}

export {
  ImportModalProps,
  ImportModalEmits,
  ActivityOptionsModel,
  ActivityParamsModel,
  RequestParamsModel,
  SubmitSucccess,
};
