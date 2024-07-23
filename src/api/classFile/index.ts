import { defHttp } from "/@/utils/http/axios";
import {
  DetailModel,
  ParamsModal,
  BrandModal,
  AllSeriesModal,
  BasicDetailModel,
  CustomerDetailModel,
  DealerModal,
  CustomerExportModal,
  AreaModal,
} from "./model/classFileModel";
import { BasicFetchResult } from "../model/baseModel";

enum Api {
  GetCustomerDetail = "/ark-gen2-system/dealer/customerProfile/selectDataMasking",
  UpdateCustomer = "/ark-gen2-system/dealer/customerProfile/update",
  GetBrands = "/ark-gen2-system/ucar/brands",
  GetSeriesBatch = "/ark-gen2-system/ucar/seriesBatch",
  GetList = "/ark-gen2-system/dealer/customerProfile/page",
  GetDealerLead = "/ark-gen2-system/dealer/customerProfile/selectDealerLeadByCusId",
  GetProvinceTree = "/ark-gen2-system/geography/tree/province",
  ExportCustomer = "/ark-gen2-system/dealer/customerProfile/exe/export",
  GetAllDealer = "/ark-gen2-system/basic/getAllDealer",
  GetAllProvince = "/ark-gen2-system/geography/getAllProvince",
  GetAllCity = "/ark-gen2-system/geography/getAllCityByRid",
  GetAllCounty = "/ark-gen2-system/geography/getAllCountyByRid",
}

export const getDetail = (id: string) => {
  return defHttp.get<DetailModel>({
    url: `${Api.GetCustomerDetail}/${id}`,
  });
};

export const updateCustomer = (
  data: BasicDetailModel | CustomerDetailModel,
) => {
  return defHttp.post<number>({
    url: Api.UpdateCustomer,
    data,
  });
};

export const getBrands = () => {
  return defHttp.get<BrandModal[]>({
    url: `${Api.GetBrands}`,
  });
};

export const getSeriesBatch = (data: number[]) => {
  return defHttp.post<AllSeriesModal>({
    url: `${Api.GetSeriesBatch}`,
    data,
  });
};

export const getList = (data: ParamsModal) => {
  return defHttp.post<BasicFetchResult<DetailModel>>({
    url: `${Api.GetList}?pageSize=${data.pageSize}&pageNum=${data.pageNum}`,
    data,
  });
};

export const getDealerList = (id: string) => {
  return defHttp.get<BasicFetchResult<DealerModal>>({
    url: `${Api.GetDealerLead}/${id}`,
  });
};

export const getProvinceTree = () => {
  return defHttp.get<AreaModal>({
    url: `${Api.GetProvinceTree}`,
  });
};

export const exportCustomer = (data: CustomerExportModal) => {
  return defHttp.post<any>({
    url: `${Api.ExportCustomer}`,
    data,
  });
};

export const getAllDealer = () => {
  return defHttp.get<any>({
    url: `${Api.GetAllDealer}`,
  });
};

export const getAllProvince = () => {
  return defHttp.get<any>({
    url: `${Api.GetAllProvince}`,
  });
};

export const getAllCity = (id: string) => {
  return defHttp.get<any>({
    url: `${Api.GetAllCity}/${id}`,
  });
};

export const getAllCounty = (id: string) => {
  return defHttp.get<any>({
    url: `${Api.GetAllCounty}/${id}`,
  });
};
