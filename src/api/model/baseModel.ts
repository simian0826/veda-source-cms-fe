import { UploadFile, UploadProps } from "ant-design-vue";
import { Member } from "../member/model";
import { Product } from "../product/model";

export interface BasicPageParams {
  page: number;
  pageSize: number;
}

export type Pagenigation = BasicPageParams & {
  total: number;
};

export type ListRequest<T> = T & BasicPageParams;

export type ListResult<T> = {
  list: T[];
  total: number;
};

export interface BasicRequestPageParams {
  pageNum: number;
  pageSize: number;
  orderByColumn?: string;
  isAsc?: string;
}

export interface BasicFetchResult<T extends any> {
  records: T[];
  total: number;
}

export interface OptionModel {
  value?: string | number;
  label: string;
  children?: OptionModel[];
}

export type SelectOptionsModel = Dict;

export type Dict = {
  label: string;
  value: string;
};

export type SystemModule =
  | "home"
  | "product"
  | "project"
  | "about us"
  | "contact us";

export type HeroSection = {
  id?: number;
  header?: string;
  content?: string;
  background: string;
  module: SystemModule;
};

export type BasicInfo = {
  email?: string;
  address?: string;
};

export type HomePageContent = {
  processItems: HomeProcessItem[];
  introductionItems: HomeIntroductionItem[];
  productCategoryItems: HomeProductionCategoryItem[];
  leaders: Member[];
  clientLogos: string[];
};

export type HomePageContentDTO = {
  processItems: HomeProcessItem[];
  introductionItems: HomeIntroductionItemDTO[];
  productCategoryItems: HomeProductionCategoryItem[];
  leaders: number[];
  clientLogos: string[];
};

export type HomeIntroductionItem = {
  title: string;
  subTitle: string;
  description: string;
  image: string;
  infoRight: IntroductionInfo;
  infoLeft: IntroductionInfo;
  product: Product;
};

export type HomeIntroductionItemDTO = {
  title: string;
  subTitle: string;
  description: string;
  image: string;
  infoRight: IntroductionInfo;
  infoLeft: IntroductionInfo;
  productId?: number;
};

export type HomeIntroductionItemVO = {
  title: string;
  subTitle: string;
  description: string;
  image: UploadProps["fileList"] | UploadFile[];
  infoRight: IntroductionInfo;
  infoLeft: IntroductionInfo;
  product?: Product;
};

export type HomeProcessItem = {
  title: string;
  image: string;
  detailText: string;
};

export type HomeProcessItemVO = {
  title: string;
  image: UploadProps["fileList"] | UploadFile[];
  detailText: string;
};

export type IntroductionInfo = {
  info: string;
  supplementary: string;
};

export type HomeProductionCategoryItem = {
  title: string;
  image: string;
  category: string;
};

export type HomeProductionCategoryItemVO = {
  title: string;
  image: UploadProps["fileList"];
  category: string;
};

export type HomePageContentVO = {
  processItems: HomeProcessItemVO[];
  introductionItems: HomeIntroductionItemVO[];
  productCategoryItems: HomeProductionCategoryItemVO[];
  leaders: Member[];
  clientLogos: UploadProps["fileList"];
};

export type AboutUsPage = {
  qualityItems: AboutUsQualityItem[];
  needHelpHeader: string;
  needHelpDesc: string;
  teamMembers: Member[];
};

export type AboutUsQualityItem = {
  title: string;
  desc: string;
  image: string;
};

export type AboutUsPageVO = Omit<AboutUsPage, "qualityItems"> & {
  qualityItems: AboutUsQualityItemVO[];
};

export type AboutUsQualityItemVO = {
  title: string;
  desc: string;
  image: UploadProps["fileList"] | UploadFile[];
};

export type AboutUsPageDTO = Omit<AboutUsPage, "teamMembers"> & {
  teamMembers: number[];
};
