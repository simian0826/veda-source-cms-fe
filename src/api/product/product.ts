import { defHttp } from "/@/utils/http/axios";
import { ContentTypeEnum } from "/@/enums/httpEnum";

enum Api {
  // upload
  Upload = "/storage/upload",
  // product
  GetCategoryDict = "/dict/findProductCategory", // get category dict
  GetAllCategoryProperties = "/productCategoryPropertyConfig/list", // get category properties by category
  CreateProduct = "/product/create",
  UpdateProduct = "/product/update",
  DeleteProduct = "/product/delete",
  ViewProduct = "/product/detail",
  GetProductList = "/product/list",
  // hero
  FindHeroSection = "/heroSection/findHeroSections",
  CreateHero = "/heroSection/create",
  UpdateHero = "/heroSection/update",
}

// get category dict
export const getCategoryDict = () => {
  return defHttp.get({ url: Api.GetCategoryDict });
};

// get all category properties
export const getAllCategoryProperties = () => {
  return defHttp.get({
    url: Api.GetAllCategoryProperties,
  });
};

// upload file
export const uploadImg = async (params) => {
  return defHttp.post({
    url: `${Api.Upload}}`,
    headers: {
      "Content-type": ContentTypeEnum.FORM_DATA,
      ignoreCancelToken: true,
    },
    params,
  });
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
