import { ImportModalProps } from "./typing.js";
import { Cascader } from "ant-design-vue";

// 防抖时间点
const DEBOUNCE_TIME = 80;

// 导入文件错误码，拍脑门定的，后面可能会改
enum SUBMIT_CODE {
  FAIL = 500,
  SUCCESS = 200,
}

enum ACTIVITY_TYPE {
  SELECT,
  CASCADER,
}

const defaultsProps: ImportModalProps = {
  activityType: ACTIVITY_TYPE.CASCADER,
  modalProps: {
    title: "导入",
    open: false,
    wrapClassName: "import-modal",
    destroyOnClose: true,
  },
  optionsProps: {
    // fieldNames: { label: 'label', value: 'value', children: 'children' },
    placeholder: "请选择",
    showCheckedStrategy: Cascader.SHOW_CHILD,
  },
  uploadProps: {
    maxCount: 1,
    multiple: false,
  },
};

export { DEBOUNCE_TIME, ACTIVITY_TYPE, SUBMIT_CODE, defaultsProps };
