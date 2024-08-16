import { defHttp } from "/@/utils/http/axios";
import { ContentTypeEnum } from "/@/enums/httpEnum";
import { Dict, ListRequest, ListResult } from "../model/baseModel";
import { Product, ProductDTO } from "./model";

enum Api {
  // upload
  Upload = "/storage/uploadFile",
  // product
  GetCategoryDict = "/dict/findProductCategory", // get category dict
  GetAllCategoryProperties = "/productCategoryPropertyConfig/list", // get category properties by category
  UpdateProduct = "/product/update",
  DeleteProduct = "/product/delete",
  ViewProduct = "/product/detail",
  GetProductList = "/product/list",
  CreateProduct = "/product/create",
  // hero
  FindHeroSection = "/heroSection/findHeroSections",
  CreateHero = "/heroSection/create",
  UpdateHero = "/heroSection/update",
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

export const getProductListApia = (
  params: ListRequest<{ category: string }>,
) => {
  return defHttp.get<ListResult<Product>>({ url: Api.GetProductList, params });
};

export const createProductApi = (params: ProductDTO) => {
  return defHttp.post<boolean>({ url: Api.CreateProduct, params });
};

// upload file
export const uploadImg = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  // return defHttp.post({
  //   url: Api.Upload,
  //   headers: {
  //     "Content-type": ContentTypeEnum.FORM_DATA,
  //     ignoreCancelToken: true,
  //   },
  //   data: formData,
  // });
  return defHttp.uploadFile(
    {
      url: Api.Upload,
      headers: {
        "Content-type": ContentTypeEnum.FORM_DATA,
        ignoreCancelToken: true,
      },
    },
    formData,
  );
};

// create product
export const createProduct = async (params) => {
  return defHttp.post({
    url: Api.CreateProduct,
    params,
  });
};

// update product
export const updateProduct = async (params) => {
  return defHttp.post({
    url: Api.UpdateProduct,
    params,
  });
};

// view product
export const getProductDetail = async (id) => {
  return defHttp.get({
    url: `${Api.ViewProduct}/${id}`,
  });
};

// delete product
export const deleteProductById = async (id) => {
  return defHttp.get({
    url: `${Api.DeleteProduct}/${id}`,
  });
};

//  get hero sections
export const getHeroSections = async () => {
  return defHttp.get({
    url: Api.FindHeroSection,
  });
};

// create hero
export const createHero = async (params) => {
  return defHttp.post({
    url: Api.CreateHero,
    params,
  });
};

// update hero
export const updateHero = async (params) => {
  return defHttp.post({
    url: Api.UpdateHero,
    params,
  });
};
