import { defHttp } from "/@/utils/http/axios";
import {
  AboutUsPageDTO,
  AboutUsPage,
  BasicInfo,
  HeroSection,
  HomePageContent,
  HomePageContentDTO,
} from "/@/api/model/baseModel";

export enum Api {
  // upload
  Upload = "/storage/uploadFile",
  AntUpload = "/veda-source/storage/uploadFileByAntd",

  // hero
  FindHeroSection = "/heroSection/findHeroSections",
  CreateHero = "/heroSection/create",
  UpdateHero = "/heroSection/update",

  //home page
  GetHomePage = "/generalConfig/findHomePage",
  UpdateHomePage = "/generalConfig/updateHomePage",

  //about us
  GetAboutUs = "/generalConfig/findAboutUsPage",
  UpdateAboutUs = "/generalConfig/updateAboutUsPage",
  //basic info
  GetBasicInfo = "/generalConfig/findBasicInfo",
  UpdateBasicInfo = "/generalConfig/updateBasicInfo",
}

//  get hero sections
export const getHeroSectionsApi = async () => {
  return defHttp.get<HeroSection[]>({
    url: Api.FindHeroSection,
  });
};

// create hero
export const createHeroSectionApi = async (params) => {
  return defHttp.post({
    url: Api.CreateHero,
    params,
  });
};

// update hero
export const updateHeroSectionApi = async (params: HeroSection[]) => {
  return defHttp.post<boolean>({
    url: Api.UpdateHero,
    params,
  });
};

export const getHomePageApi = async () => {
  return defHttp.get<HomePageContent>({
    url: Api.GetHomePage,
  });
};

export const updateHomePageApi = async (params: HomePageContentDTO) => {
  return defHttp.post<boolean>({
    url: Api.UpdateHomePage,
    params,
  });
};

export const getBasicInfoApi = async () => {
  return defHttp.get<BasicInfo>({
    url: Api.GetBasicInfo,
  });
};

export const updateBasicInfoApi = async (params: BasicInfo) => {
  return defHttp.post<boolean>({
    url: Api.UpdateBasicInfo,
    params,
  });
};

export const getAboutUsApi = async () => {
  return defHttp.get<AboutUsPage>({
    url: Api.GetAboutUs,
  });
};

export const updateAboutUsApi = async (params: AboutUsPageDTO) => {
  return defHttp.post<boolean>({
    url: Api.UpdateAboutUs,
    params,
  });
};
