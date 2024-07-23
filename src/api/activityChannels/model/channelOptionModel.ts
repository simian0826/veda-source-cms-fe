import { OptionModel } from "./activityChannelModel";
import { OPTION_VALUE_CODE } from "/@/enums/activityChannelEnum";

export interface DefOptionModal {
  [OPTION_VALUE_CODE.CHANNEL_ID]: OptionModel[];
  [OPTION_VALUE_CODE.CHANNEL_FIELD_NAME]: OptionModel[];
  [OPTION_VALUE_CODE.CHANNEL_FORMAT_NAME]: OptionModel[];
  [OPTION_VALUE_CODE.CHANNEL_LOCATION_NAME]: OptionModel[];
  [OPTION_VALUE_CODE.CHANNEL_DOMAIN_NAME]: OptionModel[];
}

export interface ValueModal {
  [OPTION_VALUE_CODE.CHANNEL_ID]?: string;
  [OPTION_VALUE_CODE.CHANNEL_FIELD_NAME]?: string;
  [OPTION_VALUE_CODE.CHANNEL_FORMAT_NAME]?: string;
  [OPTION_VALUE_CODE.CHANNEL_LOCATION_NAME]?: string;
  [OPTION_VALUE_CODE.CHANNEL_DOMAIN_NAME]?: string;
  [OPTION_VALUE_CODE.CHANNEL_FIELD_TYPE_NAME]?: string;
  [OPTION_VALUE_CODE.CREATETIME]?: [string, string];
}

export interface OemOptoinModal extends DefOptionModal {
  [OPTION_VALUE_CODE.OEM_LEAD_FLAG]: OptionModel[];
  [OPTION_VALUE_CODE.DLR_LEAD_FLAG]: OptionModel[];
  [OPTION_VALUE_CODE.DLR_CARD_FLAG]: OptionModel[];
  [OPTION_VALUE_CODE.CHANNEL_ACTIVATE_FLAG]: OptionModel[];
  [OPTION_VALUE_CODE.DEPT_USER]: OptionModel[];
  [OPTION_VALUE_CODE.CHANNEL_FIELD_TYPE_NAME]: OptionModel[];
}

export interface OemValueModal extends ValueModal {
  [OPTION_VALUE_CODE.OEM_LEAD_FLAG]?: string;
  [OPTION_VALUE_CODE.DLR_LEAD_FLAG]?: string;
  [OPTION_VALUE_CODE.DLR_CARD_FLAG]?: string;
  [OPTION_VALUE_CODE.CHANNEL_ACTIVATE_FLAG]?: string;
  [OPTION_VALUE_CODE.DEPT_USER]?: string[];
}

export interface DealerOptionModal extends DefOptionModal {
  [OPTION_VALUE_CODE.DEALER_BRIEF]: OptionModel[];
}

export interface DealerValueModal extends ValueModal {
  [OPTION_VALUE_CODE.DEALER_BRIEF]?: string[];
}
