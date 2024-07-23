import { defineStore } from "pinia";

import { OPTION_VALUE_CODE, TAB_TYPE, PAGE_TYPE } from "/@/enums/clueEnum";
import {
  OemExportApi,
  GetImpartBatchList,
  GetImpartDetailList,
  getCarSeriesList,
  getOemLeadCampList,
  getOemLeadChannelList,
} from "/@/api/clue/importList";
import {
  BatchFormValueModal,
  BatchTableReqModal,
  PageModal,
} from "/@/api/clue/model/importList";
import { SelectOptionsModel } from "/@/api/model/baseModel";

interface clueState {
  activeKey: string;
  currentPage: PageModal;
  batchFormValue: BatchFormValueModal;
  importType: SelectOptionsModel[];
  tempImportId: string | undefined;
}

export const useClueStore = defineStore({
  id: "clue",
  state: (): clueState => ({
    activeKey: TAB_TYPE.IMPORT_BATCH,
    currentPage: {
      [PAGE_TYPE.IMPORT_BATCH_PAGE]: 1,
      [PAGE_TYPE.IMPORT_DETAIL_PAGE]: 1,
      [PAGE_TYPE.IMPORT_BATCHL_SIZE]: 10,
      [PAGE_TYPE.IMPORT_DETAIL_SIZE]: 10,
    },
    batchFormValue: {
      [OPTION_VALUE_CODE.IMPORT_TYPE]: "10",
    },
    importType: [],
    tempImportId: undefined,
  }),
  actions: {
    setActiveKey(key: string): void {
      this.activeKey = key;
    },
    async oemExportAction(params) {
      return await OemExportApi(params);
    },
    setCurPage({ name, page }): void {
      this.currentPage[name] = page;
    },
    setBatchFormValue({ name, val }): void {
      this.batchFormValue[name] = val;
    },
    setTempImportId(value: string) {
      this.tempImportId = value;
    },
    async getImpartBatchListAction(params: BatchTableReqModal) {
      return await GetImpartBatchList(params);
    },
    async getImpartDetailListAction(params: BatchTableReqModal) {
      return await GetImpartDetailList(params);
    },
    async getCarSeriesListAction() {
      return await getCarSeriesList();
    },
    async getOemLeadCampListAction() {
      return await getOemLeadCampList();
    },
    async getOemLeadChannelListAction() {
      return await getOemLeadChannelList();
    },
  },
});
