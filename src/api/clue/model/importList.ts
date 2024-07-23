import { OPTION_VALUE_CODE, PAGE_TYPE } from "/@/enums/clueEnum";

export interface ValueModal {
  [OPTION_VALUE_CODE.IMPORT_BATCH_ID]?: string;
  [OPTION_VALUE_CODE.IMPORT_TYPE]?: string;
  [OPTION_VALUE_CODE.IMPORT_DATE_TIME]?: string;
  [OPTION_VALUE_CODE.FILE_NAME]?: string;
  [OPTION_VALUE_CODE.DEALER_NAME]?: string;
  [OPTION_VALUE_CODE.DLRACCOUNT_NAME]?: string;
}

export type BatchFormValueModal = ValueModal;

export interface BatchTableReqModal extends ValueModal {
  pageNum: number | undefined;
  pageSize: number | undefined;
  // startDate?: string;
  // endDate?: string;
}

export interface PageModal {
  [PAGE_TYPE.IMPORT_BATCH_PAGE]?: number;
  [PAGE_TYPE.IMPORT_DETAIL_PAGE]?: number;
  [PAGE_TYPE.IMPORT_BATCHL_SIZE]?: number;
  [PAGE_TYPE.IMPORT_DETAIL_SIZE]?: number;
}
