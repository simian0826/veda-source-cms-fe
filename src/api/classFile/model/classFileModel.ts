import { Dayjs } from "dayjs";

export interface DetailModel {
  id: string;
  dealerId: string;
  wechatAvatar: string;
  fullName: string;
  mobile: string;
  customizeName: string;
  wechatWxid: string;
  wechatNickname: string;
  genderInd: string;
  genderName: string;
  birthDate: string;
  age: number | undefined;
  idcardTypeName: string;
  idcardCode: string;
  emailPersonal: string;
  provinceName: string;
  cityName: string;
  countyName: string;
  cusAddrMail: string;
  nationalityInd: string;
  nationalityName: string;
  ethnicityInd: string;
  ethnicityName: string;
  preferLangInd: string;
  preferLangName: string;
  maritalStateInd: string;
  maritalStateName: string;
  professionName: string;
  driverLicenseTypeInd: string;
  driverLicenseTypeName: string;
  ownBrandName: string[] | undefined;
  ownSeriesName: string[] | undefined;
  remark: string;
  underwayMergeFlag: undefined | boolean;
  allowEdit: boolean;
}

export interface BasicDetailModel {
  wechatAvatar: string;
  fullName: string;
  mobile: string;
  customizeName: string;
  wechatWxid: string;
  genderInd: string;
  wechatNickname: string;
  genderName: string;
  underwayMergeFlag: undefined | boolean;
  birthDate: string | Dayjs | undefined;
  allowEdit: boolean;
}

export interface CustomerDetailModel {
  birthDate: string | Dayjs;
  age: number | undefined;
  idcardTypeInd: string;
  idcardCode: string;
  emailPersonal: string;
  livingCityId: string | undefined;
  livingCityName: string | undefined;
  livingCountyId: string | undefined;
  livingCountyName: string | undefined;
  livingProvinceId: string | undefined;
  livingProvinceName: string | undefined;
  cusAddrMail: string;
  nationalityInd: string;
  nationalityName: string;
  ethnicityInd: string;
  ethnicityName: string;
  preferLangInd: string;
  preferLangName: string;
  maritalStateInd: string;
  maritalStateName: string;
  professionName: string;
  driverLicenseTypeInd: string;
  driverLicenseTypeName: string;
  ownBrandInd: string[];
  ownBrandName: string[] | number[] | undefined;
  ownSeriesInd: string[];
  ownSeriesName: string[] | number[] | undefined;
  remark: string;
}

export interface ParamsModal {
  createTime: any;
  area: string[];
  car: string[];
  mobile: string;
  fullName: string;
  customizeName: string;
  gender: number | undefined;
  ageList: [];
  maritalState: string | undefined;
  professionName: string;
  ownBrandName: string[];
  ownSeriesName: string[];
  pageNum: number;
  pageSize: number;
  livingProvince: string[];
  livingCity: string[];
  livingCounty: string[];
  dealerIds: string[];
}

export interface CustomerExportModal extends ParamsModal {
  ids: string[];
}

export interface DictModal {
  label: string;
  value: number;
}

export interface BrandModal {
  map(arg0: (item: any) => any): number[] | string[];
  id: number;
  name: string;
}

export interface AllSeriesModal {
  allSeriesList: SeriesModal[];
}

export interface SeriesModal {
  id: number;
  name: string;
}

export interface DealerModal {
  id: string;
  createAt: string;
  leadFinishDate: string;
  intendCarSeriesName: string;
  dlrLeadStageName: string;
  dlrLeadSubStatName: string;
  dlrLeadStatName: string;
  defeatReasonName: string;
  modelSkuCode: string;
}

export interface AreaModal {
  name: string;
  code: string;
  children: AreaModal;
}
