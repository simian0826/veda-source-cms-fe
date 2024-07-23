import { defineStore } from "pinia";
import {
  getDetail,
  updateCustomer,
  getBrands,
  getSeriesBatch,
  getList,
  getDealerList,
  getProvinceTree,
  exportCustomer,
  getAllDealer,
  getAllProvince,
  getAllCity,
  getAllCounty,
} from "/@/api/classFile/index";
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
} from "/@/api/classFile/model/classFileModel";
import { BasicFetchResult } from "/@/api/model/baseModel";

interface UserState {
  data: DetailModel;
}

export const useCustomerStore = defineStore({
  id: "app-customer",
  state: (): UserState => ({
    data: {
      id: "",
      dealerId: "",
      wechatAvatar: "",
      fullName: "",
      mobile: "",
      customizeName: "",
      wechatWxid: "",
      wechatNickname: "",
      genderInd: "",
      genderName: "",
      birthDate: "",
      age: 0,
      idcardTypeName: "",
      idcardCode: "",
      emailPersonal: "",
      provinceName: "",
      cityName: "",
      countyName: "",
      cusAddrMail: "",
      nationalityInd: "",
      nationalityName: "",
      ethnicityInd: "",
      ethnicityName: "",
      preferLangInd: "",
      preferLangName: "",
      maritalStateInd: "",
      maritalStateName: "",
      professionName: "",
      driverLicenseTypeInd: "",
      driverLicenseTypeName: "",
      ownBrandName: [],
      ownSeriesName: [],
      remark: "",
      underwayMergeFlag: undefined,
      allowEdit: false,
    },
  }),
  getters: {
    getCustomerDetail(): DetailModel {
      return this.data;
    },
  },
  actions: {
    setDetail(info: DetailModel) {
      this.data = info;
    },
    async getCustomerAction(id: string): Promise<DetailModel> {
      return await getDetail(id);
    },
    async updateCustomerAction(
      data: BasicDetailModel | CustomerDetailModel,
    ): Promise<number> {
      return await updateCustomer(data);
    },
    async getBrandsAction(): Promise<BrandModal[]> {
      return await getBrands();
    },
    async getSeriesBatchAction(id: any): Promise<AllSeriesModal> {
      return await getSeriesBatch(id);
    },
    async getList(data: ParamsModal): Promise<BasicFetchResult<DetailModel>> {
      return await getList(data);
    },
    async getDealerList(id: string): Promise<BasicFetchResult<DealerModal>> {
      return await getDealerList(id);
    },
    async getProvinceTreeAction(): Promise<AreaModal> {
      return await getProvinceTree();
    },
    async exportCustomerAction(data: CustomerExportModal): Promise<any> {
      return await exportCustomer(data);
    },
    async getAllDealerAction(): Promise<any> {
      return await getAllDealer();
    },
    async getAllProvinceAction(): Promise<any> {
      return await getAllProvince();
    },
    async getAllCityAction(id: string): Promise<any> {
      return await getAllCity(id);
    },
    async getAllCountyAction(id: string): Promise<any> {
      return await getAllCounty(id);
    },
  },
});
