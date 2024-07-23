import { defineStore } from "pinia";
import {
  GetDetailByIdApi,
  GetFilterListApi,
  GetTableListApi,
  InsertOemChannelApi,
  UpdateChannelApi,
  GetDealerTableListApi,
  InsertDealerChannelApi,
  UpdateDealerChannelApi,
  GetDealerDetailByIdApi,
  DealerExportApi,
  OemExportApi,
  GetChannelNameDropDownApi,
  GetDeptOfUserApi,
  UpdateChannelActivateApi,
  GetOemByDlrDetailByIdApi,
  DeleteDlrChannelApi,
  GetDealerByOemTableListApi,
} from "/@/api/activityChannels/channelList";
import {
  GetActivityFilterApi,
  GetActivityListApi,
  GetDealerCampListApi,
  GetDealerLeadByIdApi,
  GetOemLeadByIdApi,
  GetOemDealerByIdApi,
  GetPlanningNumberApi,
  InsertOemCampaignApi,
  InsertDealerCampaignApi,
  UpdateOemCampaignApi,
  UpdateDealerCampaignApi,
  GetBussinessTypeApi,
  OemActExportApi,
  DealerActExportApi,
  DlrShareFilterApi,
  GetActDeptUserApi,
  GetDealerByOemCampListApi,
  GetActivityListByDlrApi,
  GetAreaDlrApi,
} from "/@/api/activityChannels/activity";
import {
  DeptUserRespModal,
  DealerDeatilModal,
  DealerTableReqModal,
  DealerTableRespModal,
  DropDownOptionModal,
  DropDownRespModal,
  OemDetailResponseModal,
  OemListRequestModal,
  OemTableReqModal,
  OemTableRespModal,
  OptionModel,
  ActivateModal,
  DropChannelModal,
  BusinessReqModal,
} from "/@/api/activityChannels/model/activityChannelModel";
import {
  DealerDetailModal,
  OemDetailModal,
  ChannelSearchModal,
  ChannelTableRespModal,
} from "/@/api/activityChannels/model/activityModel";
import {
  DealerOptionModal,
  DealerValueModal,
  OemOptoinModal,
  OemValueModal,
} from "/@/api/activityChannels/model/channelOptionModel";
import {
  DealerActOptionModal,
  OemActOptionModal,
  OemActValueModal,
  PageModal,
} from "/@/api/activityChannels/model/activityOptionModal";
import {
  OPTION_VALUE_CODE,
  PAGE_TYPE,
  ROLE,
  TAB_TYPE,
} from "/@/enums/activityChannelEnum";
import {
  toLabelAndVal,
  tranDitValue,
  tranformAscByNode,
  treeToLabelValuePairs,
} from "/@/views/activityChannels/utils";
import { Modal } from "ant-design-vue";
import { router } from "/@/router";
import { useDictStore } from "./dict";
import { downloadByUrl } from "/@/utils/file/download";

interface actChannelState {
  activeKey: string;
  activeKeyActivity: string;
  channelAllOptions: DropDownOptionModal[];
  dealerAllOptions: DropDownOptionModal[];
  channelAscOption: OptionModel[];
  dealerAscOption: OptionModel[];
  oemListOption: Partial<OemOptoinModal>;
  oemFormValue: OemValueModal;
  dealerListOption: Partial<DealerOptionModal>;
  dealerFormValue: DealerValueModal;
  oemActivityOption: Partial<OemActOptionModal>;
  oemActivityFormValue: OemActValueModal;
  dealerActivityOption: Partial<DealerActOptionModal>;
  dealerActivityFormValue: OemActValueModal;
  currentPage: PageModal;
}

const dictStore = useDictStore();

const trueOrFalseOption = toLabelAndVal(["是", "否"]);

export const useActivityChannelStore = defineStore({
  id: "activity-channel",
  state: (): actChannelState => ({
    activeKey: TAB_TYPE.MANUFACTURER, // 渠道 tab 状态
    activeKeyActivity: TAB_TYPE.MANUFACTURERACTIVITY, // 活动 tab 状态
    channelAllOptions: [], // 厂商渠道 接口返回 channel
    dealerAllOptions: [], // 经销商渠道 接口返回 channel
    channelAscOption: [], // 厂商活动 级联格式 channel
    dealerAscOption: [], // 经销商活动 级联格式 channel

    // 厂商渠道
    oemListOption: {
      [OPTION_VALUE_CODE.CHANNEL_ID]: [],
      [OPTION_VALUE_CODE.OEM_LEAD_FLAG]: trueOrFalseOption,
      [OPTION_VALUE_CODE.DLR_LEAD_FLAG]: trueOrFalseOption,
      [OPTION_VALUE_CODE.DLR_CARD_FLAG]: trueOrFalseOption,
    },
    oemFormValue: {},

    // 经销商渠道
    dealerListOption: {
      [OPTION_VALUE_CODE.CHANNEL_ID]: [],
      [OPTION_VALUE_CODE.DEALER_BRIEF]: [],
    },
    dealerFormValue: {},

    // 厂商活动
    oemActivityOption: {
      [OPTION_VALUE_CODE.DLR_SHARE_FLAG]: trueOrFalseOption,
      [OPTION_VALUE_CODE.CAMP_ID]: [],
      [OPTION_VALUE_CODE.CAMP_NAME]: [],
      [OPTION_VALUE_CODE.CONTACT_PERSON_NAME]: [],
      [OPTION_VALUE_CODE.CONTACT_MOBILE]: [],
    },
    oemActivityFormValue: {},

    // 经销商活动
    dealerActivityOption: {
      [OPTION_VALUE_CODE.CAMP_ID]: [],
      [OPTION_VALUE_CODE.CAMP_NAME]: [],
      [OPTION_VALUE_CODE.DEALER_BRIEF]: [],
    },
    dealerActivityFormValue: {},

    // 分页信息
    currentPage: {
      [PAGE_TYPE.OEM_CHANNEL_PAGE]: 1,
      [PAGE_TYPE.DEALE_CHANNEL_PAGE]: 1,
      [PAGE_TYPE.OEM_ACT_PAGE]: 1,
      [PAGE_TYPE.DEALER_ACT_PAGE]: 1,
      [PAGE_TYPE.OEM_CHANNEL_SIZE]: 10,
      [PAGE_TYPE.DEALER_CHANNEL_SIZE]: 10,
      [PAGE_TYPE.OEM_ACT_SIZE]: 10,
      [PAGE_TYPE.DEALER_ACT_SIZE]: 10,
    },
  }),
  actions: {
    // tab 状态设置
    setActiveKey(key: string, type: string): void {
      this[type] = key;
    },

    // 表单设值
    setFormValue({ name, val }, type: string): void {
      const obj = {
        [TAB_TYPE.MANUFACTURER]: "oemFormValue",
        [TAB_TYPE.DEALER]: "dealerFormValue",
        [TAB_TYPE.MANUFACTURERACTIVITY]: "oemActivityFormValue",
        [TAB_TYPE.DEALERACTIVITY]: "dealerActivityFormValue",
      };
      this[obj[type]][name] = val;
    },

    // 分页信息设置
    setCurPage({ name, page }): void {
      this.currentPage[name] = page;
    },

    // 子渠道联动
    setChannelChild(val: string | undefined, typeName: string) {
      const actionObj = {
        oemListOption: {
          fn: ({ name, list }) => (this.oemListOption[name] = list),
          list: this.channelAllOptions,
        },
        dealerListOption: {
          fn: ({ name, list }) => (this.dealerListOption[name] = list),
          list: this.dealerAllOptions,
        },
      };
      const arr = [] as string[];
      actionObj[typeName].list.forEach((item: DropDownOptionModal) => {
        item.channelFormatNameList?.forEach((i) => {
          arr.push(i.channelName);
        });
      });
      const filterArr: string[] = actionObj[typeName].list
        .find((item: DropDownOptionModal) => item.fieldName === val)
        ?.channelFormatNameList.map(
          (item: DropChannelModal) => item.channelName,
        );
      actionObj[typeName].fn({
        name: OPTION_VALUE_CODE.CHANNEL_FORMAT_NAME,
        list: val
          ? toLabelAndVal([...new Set(filterArr)])
          : toLabelAndVal([...new Set(arr)]),
      });
    },

    // 数据字典获取
    async getDictFilterAction(params, typeName?: string) {
      const res = await dictStore.fetchDictBatch(params);
      if (typeName) {
        res && Object.assign(this[typeName], tranDitValue(res));
      } else {
        return res ? tranDitValue(res) : [];
      }
    },

    // 通用筛选器获取
    async getFilterListAction(
      params: OemListRequestModal,
      typeName: string,
      apiName: string,
    ) {
      const obj = {
        channel: (val: OemListRequestModal) => GetFilterListApi(val),
        act: (val: OemListRequestModal) => GetActivityFilterApi(val),
      };
      const res = await obj[apiName](params);
      this[typeName][params.filterType] = toLabelAndVal(res);
    },

    // 渠道子渠道
    async getChannelDropDownAction(
      params: DropDownRespModal,
      typeName: string,
      nodeType = "channelName",
    ): Promise<void> {
      GetChannelNameDropDownApi(params)
        .then((res) => {
          const actionObj = {
            oemListOption: {
              all: "channelAllOptions",
              asc: "channelAscOption",
            },
            dealerListOption: {
              all: "dealerAllOptions",
              asc: "dealerAscOption",
            },
          };
          this[actionObj[typeName].all] = res;
          const arr = [] as string[];
          this[typeName][OPTION_VALUE_CODE.CHANNEL_FIELD_NAME] = res.map(
            (item) => ({ value: item.fieldName, label: item.fieldName }),
          );
          res.forEach((item) => {
            item.channelFormatNameList?.forEach((i) => {
              arr.push(i.channelName);
            });
          });
          this[typeName][OPTION_VALUE_CODE.CHANNEL_FORMAT_NAME] = toLabelAndVal(
            [...new Set(arr)],
          );
          this[actionObj[typeName].asc] = tranformAscByNode(res, nodeType);
        })
        .catch(() => {});
    },

    // 部室担当
    async getDeptOfUserAction(typeName: string) {
      const obj = {
        oemListOption: () => GetDeptOfUserApi(),
        oemActivityOption: () => GetActDeptUserApi(),
      };
      obj[typeName]()
        .then((res) => {
          this[typeName][OPTION_VALUE_CODE.DEPT_USER] = res.map(
            (item: DeptUserRespModal) => ({
              value: item.deptCode,
              label: item.deptName,
              children: treeToLabelValuePairs(item),
            }),
          );
        })
        .catch(() => {});
    },

    // 业务类型
    async getBussinessTypeAction(params: BusinessReqModal) {
      const obj = {
        [ROLE.OEM_KEY]: "oemActivityOption",
        [ROLE.DEALER_KEY]: "dealerActivityOption",
      };
      GetBussinessTypeApi(params)
        .then((res) => {
          this[obj[params.sourceFlag]][OPTION_VALUE_CODE.BUSSINESS_CTGRY_CODE] =
            res;
        })
        .catch(() => {});
    },

    // 列表
    async getTableListAction(
      params: OemTableReqModal,
    ): Promise<OemTableRespModal> {
      return await GetTableListApi(params);
    },
    async getDealerTableListAction(
      params: DealerTableReqModal,
      typeName: string,
    ): Promise<DealerTableRespModal> {
      const obj = {
        [ROLE.OEM]: GetDealerByOemTableListApi,
        [ROLE.DEALER]: GetDealerTableListApi,
      };
      return await obj[typeName](params);
    },
    async getActTableListAction(
      params: ChannelSearchModal,
      typeName: string,
    ): Promise<ChannelTableRespModal> {
      const obj = {
        [ROLE.OEM]: GetActivityListApi,
        [ROLE.DEALER]: GetActivityListByDlrApi,
      };
      return await obj[typeName](params);
    },
    async getActDealerListAction(
      params: ChannelSearchModal,
      typeName: string,
    ): Promise<ChannelTableRespModal> {
      const obj = {
        [ROLE.OEM]: GetDealerByOemCampListApi,
        [ROLE.DEALER]: GetDealerCampListApi,
      };
      return await obj[typeName](params);
    },

    // 详情
    async getDetailByIdAction(
      id: number,
      role: string,
    ): Promise<OemDetailResponseModal> {
      return role === ROLE.OEM
        ? await GetDetailByIdApi(id)
        : await GetOemByDlrDetailByIdApi(id);
    },
    async getDealerDetailByIdAction(id: number): Promise<DealerDeatilModal> {
      return await GetDealerDetailByIdApi(id);
    },
    async GetOemLeadByIdAction(id: number): Promise<OemDetailModal> {
      return await GetOemLeadByIdApi(id);
    },
    async GetOemDealerByIdAction(id: number): Promise<OemDetailModal> {
      return await GetOemDealerByIdApi(id);
    },
    async GetDealerLeadByIdAction(id: number): Promise<DealerDetailModal> {
      return await GetDealerLeadByIdApi(id);
    },

    // 创建
    async insertOemChannelAction(params: OemDetailResponseModal) {
      InsertOemChannelApi(params)
        .then((res) => {
          if (res) {
            this.currentPage[PAGE_TYPE.OEM_CHANNEL_PAGE] = 1;
            router.go(-1);
          }
        })
        .catch(() => {});
    },
    async insertDealerChannelAction(params: DealerDeatilModal) {
      InsertDealerChannelApi(params)
        .then((res) => {
          if (res) {
            this.currentPage[PAGE_TYPE.DEALE_CHANNEL_PAGE] = 1;
            router.go(-1);
          }
        })
        .catch(() => {});
    },
    async insertDealerCampaignAction(params: DealerDetailModal) {
      InsertDealerCampaignApi(params)
        .then((res) => {
          if (res) {
            this.currentPage[PAGE_TYPE.OEM_ACT_PAGE] = 1;
            router.go(-1);
          }
        })
        .catch(() => {});
    },
    async insertOemCampaignAction(params: OemDetailModal) {
      InsertOemCampaignApi(params)
        .then((res) => {
          if (res) {
            Modal.confirm({
              title: "提示",
              content: "该活动信息已提交，请等待审核",
              centered: true,
              onOk: () => {
                this.currentPage[PAGE_TYPE.OEM_ACT_PAGE] = 1;
                router.go(-1);
              },
            });
          }
        })
        .catch(() => {});
    },

    // 更新
    async updateChannelAction(params: OemDetailResponseModal) {
      UpdateChannelApi(params)
        .then((res) => {
          if (res) {
            Modal.confirm({
              title: "提示",
              content: "该渠道信息已提交，请等待审核",
              centered: true,
              onOk: async () => {
                this.currentPage[PAGE_TYPE.OEM_CHANNEL_PAGE] = 1;
                router.go(-1);
              },
            });
          }
        })
        .catch(() => {});
    },
    async updateDealerChannelAction(params: DealerDeatilModal) {
      UpdateDealerChannelApi(params)
        .then((res) => {
          if (res) {
            this.currentPage[PAGE_TYPE.DEALE_CHANNEL_PAGE] = 1;
            router.go(-1);
          }
        })
        .catch(() => {});
    },
    async updateOemCampAction(params: OemDetailModal) {
      UpdateOemCampaignApi(params)
        .then((res) => {
          if (res) {
            Modal.confirm({
              title: "提示",
              content:
                "该活动信息已提交，请等待审核，审核通过后修改信息正式生效",
              centered: true,
              onOk: async () => {
                this.currentPage[PAGE_TYPE.OEM_ACT_PAGE] = 1;
                router.go(-1);
              },
            });
          }
        })
        .catch(() => {});
    },
    async updateDealerCampAction(params: DealerDetailModal, isBack: boolean) {
      UpdateDealerCampaignApi(params)
        .then((res) => {
          if (res) {
            this.currentPage[PAGE_TYPE.DEALER_ACT_PAGE] = 1;
            isBack && router.go(-1);
          }
        })
        .catch(() => {});
    },

    // 启用停用
    async updateActivateAction(params: ActivateModal) {
      return await UpdateChannelActivateApi(params);
    },

    // 删除
    async deleteDlrChannelAction(id: number, type = false) {
      DeleteDlrChannelApi(id).then(() => {
        if (type) {
          this.currentPage[PAGE_TYPE.DEALE_CHANNEL_PAGE] = 1;
          router.go(-1);
        }
      });
    },

    // 是否共享
    async dlrShareAction(params: { id: string[] }) {
      return await DlrShareFilterApi(params);
    },

    // 导出
    async dealerExportAction(params: DealerTableReqModal) {
      const url = await DealerExportApi(params);
      downloadByUrl({ url });
    },
    async oemExportAction(params: OemTableReqModal) {
      const url = await OemExportApi(params);
      downloadByUrl({ url });
    },
    async oemActExportAction(params: ChannelSearchModal) {
      const url = await OemActExportApi(params);
      downloadByUrl({ url });
    },
    async dealerActExportAction(params: ChannelSearchModal) {
      const url = await DealerActExportApi(params);
      downloadByUrl({ url });
    },

    // 活动详情页
    // 决裁编号
    async getPlanningNumberAction(params: string) {
      const res = await GetPlanningNumberApi(params);
      const budgetPlanCodeOption = res.map((item: string) => ({
        value: item,
        label: item,
      }));
      return budgetPlanCodeOption;
    },

    // 区域经销商级联
    async getDealerCasDefAction() {
      return await GetAreaDlrApi();
    },
  },
});
