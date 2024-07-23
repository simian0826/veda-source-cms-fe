import { OptionModel } from "./activityChannelModel";
import { OPTION_VALUE_CODE, PAGE_TYPE } from "/@/enums/activityChannelEnum";

export interface DefOptionModal {
  [OPTION_VALUE_CODE.CAMP_ID]: OptionModel[];
  [OPTION_VALUE_CODE.CAMP_NAME]: OptionModel[];
  [OPTION_VALUE_CODE.CHANNEL_ID]: OptionModel[];
  [OPTION_VALUE_CODE.CAMP_STAGE_IND]: OptionModel[];
  [OPTION_VALUE_CODE.BUSSINESS_CTGRY_CODE]: OptionModel[];
}

export interface ValueModal {
  [OPTION_VALUE_CODE.CAMP_ID]?: string;
  [OPTION_VALUE_CODE.CAMP_NAME]?: string;
  [OPTION_VALUE_CODE.BUSSINESS_CTGRY_CODE]?: string;
  [OPTION_VALUE_CODE.CHANNEL_ALL_ID]?: string[][];
  [OPTION_VALUE_CODE.CREATETIME]?: [string, string];
  [OPTION_VALUE_CODE.CAMP_STAGE_IND]?: string;
}

export interface OemActOptionModal extends DefOptionModal {
  [OPTION_VALUE_CODE.OPERATION_COMPANY_ID]: OptionModel[];
  [OPTION_VALUE_CODE.CONTACT_MOBILE]: OptionModel[];
  [OPTION_VALUE_CODE.CONTACT_PERSON_NAME]: OptionModel[];
  [OPTION_VALUE_CODE.DLR_SHARE_FLAG]: OptionModel[];
  [OPTION_VALUE_CODE.DEPT_USER]: OptionModel[];
}

export interface DealerActOptionModal extends DefOptionModal {
  [OPTION_VALUE_CODE.DEALER_BRIEF]: OptionModel[];
}

export interface OemActValueModal extends ValueModal {
  [OPTION_VALUE_CODE.OPERATION_COMPANY_ID]?: string;
  [OPTION_VALUE_CODE.DLR_SHARE_FLAG]?: string;
  [OPTION_VALUE_CODE.DEPT_USER]?: string[];
  [OPTION_VALUE_CODE.DEALER_BRIEF]?: string[];
}

export type DealerActValueModal = ValueModal;

export interface PageModal {
  [PAGE_TYPE.OEM_CHANNEL_PAGE]?: number;
  [PAGE_TYPE.DEALE_CHANNEL_PAGE]?: number;
  [PAGE_TYPE.OEM_ACT_PAGE]?: number;
  [PAGE_TYPE.DEALER_ACT_PAGE]?: number;
  [PAGE_TYPE.OEM_CHANNEL_SIZE]?: number;
  [PAGE_TYPE.DEALER_CHANNEL_SIZE]?: number;
  [PAGE_TYPE.OEM_ACT_SIZE]?: number;
  [PAGE_TYPE.DEALER_ACT_SIZE]?: number;
}
