import { defHttp } from "/@/utils/http/axios";
import { Dict, ListRequest, ListResult } from "../model/baseModel";
import { ProductDTO, Product } from "./model";

export enum Api {
  // upload
  Upload = "/storage/uploadFile",
  AntUpload = "/veda-source/storage/uploadFileByAntd",
  // product
  GetCategoryDict = "/dict/findProductCategory", // get category dict
  GetAllCategoryProperties = "/productCategoryPropertyConfig/list", // get category properties by category
  UpdateProduct = "/product/update",
  DeleteProduct = "/product/delete",
  ProductDetail = "/product/detail-cms",
  GetProductList = "/product/list",
  CreateProduct = "/product/create",
}

// get category dict
export const getCategoryDictApi = () => {
  return defHttp.get<Dict[]>({ url: Api.GetCategoryDict });
};

// get all category properties
export const getAllCategoryPropertiesApi = () => {
  return defHttp.get({
    url: Api.GetAllCategoryProperties,
  });
};

export const getProductListApi = (
  params: ListRequest<{ category: string }>,
) => {
  return defHttp.get<ListResult<Product>>({ url: Api.GetProductList, params });
};

export const getProductApi = (id: number) => {
  return defHttp.get<ProductDTO>({ url: `${Api.ProductDetail}/${id}` });
};

export const createProductApi = (params: ProductDTO) => {
  return defHttp.post<boolean>({ url: Api.CreateProduct, params });
};
export const updateProductApi = (params: ProductDTO) => {
  return defHttp.post<boolean>({ url: Api.UpdateProduct, params });
};
export const deleteProductApi = (id: number) => {
  return defHttp.post<boolean>({ url: `${Api.DeleteProduct}/${id}` });
};
