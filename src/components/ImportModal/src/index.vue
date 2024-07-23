<template>
  <Modal @cancel="onCancel" v-bind="getModalBindValue">
    <template v-if="!isEmpty(error)">
      <Alert
        class="mb-2"
        v-for="(msg, index) in error"
        :key="index"
        :message="msg"
        type="error"
        showIcon
      />
    </template>
    <div class="mb-6">
      <div class="mb-2">
        <span class="required" :style="{ color: 'red' }">*</span>
        活动名称
      </div>
      <Cascader
        v-if="props.activityType === ACTIVITY_TYPE.CASCADER"
        :options="activityOptions"
        v-bind="getOptionsBindValue"
        v-model:value="activitySelecedValues"
        @change="onActivityChange"
      >
        <template #suffixIcon v-if="loading">
          <LoadingOutlined spin />
        </template>
        <template #notFoundContent v-if="loading">
          <span>
            <LoadingOutlined spin class="mr-1" />
            请等待...
          </span>
        </template>
      </Cascader>
      <Select
        v-else
        v-model:value="activityState"
        :options="activityOptions"
        v-bind="getOptionsBindValue"
        @change="onActivityChange"
        :style="{ width: '200px' }"
      />
    </div>
    <UploadDragger
      name="file"
      v-bind="getUploadBindValue"
      :before-upload="beforeUpload"
      @remove="handleRemove"
    >
      <p class="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p class="ant-upload-text">点击该区域或将文件拖入该区域进行文件上传</p>
      <p class="ant-upload-hint z-50">
        点击
        <a href="javascript:void(0)" @click.stop="onDownload">下载模版</a>
      </p>
    </UploadDragger>
    <template #footer>
      <div>
        <Button key="back" @click="onCancel">取消</Button>
        <Button
          key="submit"
          type="primary"
          @click="onSubmit"
          :loading="loading"
          :disabled="loading || submitting"
        >
          确认
        </Button>
      </div>
    </template>
  </Modal>
</template>
<script setup lang="ts">
import {
  ref,
  unref,
  toRaw,
  watch,
  watchEffect,
  computed,
  defineOptions,
  defineProps,
  defineEmits,
  defineExpose,
  onMounted,
} from "vue";
import {
  UploadDragger,
  Button,
  Alert,
  Modal,
  UploadProps,
  Cascader,
  Select,
  message,
} from "ant-design-vue";
import { InboxOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import { useDebounceFn } from "@vueuse/core";
import { isFunction, isEmpty } from "lodash-es";
import {
  ImportModalProps,
  ImportModalEmits,
  ActivityOptionsModel,
  RequestParamsModel,
} from "./typing.js";
import {
  defaultsProps,
  DEBOUNCE_TIME,
  ACTIVITY_TYPE,
  SUBMIT_CODE,
} from "./data";
import { getSelecedValues } from "./utils";

defineOptions({ name: "ImportModal", inheritAttrs: false });
const props = withDefaults(
  defineProps<ImportModalProps>(),
  //@ts-ignore
  defaultsProps,
);

const emits = defineEmits<ImportModalEmits>();

const openRef = ref(false);
const loading = ref(false);
const submitting = ref(false);
const error = ref<string[] | null>(null);
const activityState = ref<string | number>("");
const activityOptions = ref<ActivityOptionsModel[]>([]);
const activitySelecedValues = ref([]);

const getModalBindValue = computed((): Recordable => {
  const attr = {
    ...defaultsProps.modalProps,
    ...props.modalProps,
    open: unref(openRef),
  };
  return attr;
});

const getOptionsBindValue = computed((): Recordable => {
  const attr = {
    ...defaultsProps.optionsProps,
    ...props.optionsProps,
  };
  return attr;
});

const getUploadBindValue = computed((): Recordable => {
  const attr = {
    ...defaultsProps.uploadProps,
    ...props.uploadProps,
  };
  return attr;
});

const fileList: any = ref([]);

const getActivityOpts = async () => {
  const { activityOptionsPromise } = props;
  if (!activityOptionsPromise || !isFunction(activityOptionsPromise)) return;
  activityOptions.value = [];
  loading.value = true;
  const res = await activityOptionsPromise();
  if (Array.isArray(res)) {
    activityOptions.value = res;
    if (!!props.activityValue) {
      activitySelecedValues.value = getSelecedValues(props.activityValue, res);
      // 最子级的ID
      const len = unref(activitySelecedValues).length;
      activityState.value = unref(activitySelecedValues)[len - 1];
    }
  }
  loading.value = false;
};

const onActivityChange = (keys) => {
  activitySelecedValues.value = keys;
  if (keys && !isEmpty(keys)) {
    error.value = null;
    if (props.activityType === ACTIVITY_TYPE.CASCADER) {
      // 最子级的ID
      const len = keys.length;
      activityState.value = keys[len - 1];
    }
  } else {
    if (props.activityType === ACTIVITY_TYPE.CASCADER) {
      activityState.value = "";
    }
  }
};

const beforeUpload: UploadProps["beforeUpload"] = (file) => {
  fileList.value = file;
  return false;
};

const handleRemove: UploadProps["onRemove"] = () => {
  fileList.value = null;
  // const index = fileList.value.indexOf(file);
  // const newFileList = fileList.value.slice();
  // newFileList.splice(index, 1);
  // fileList.value = newFileList;
};

const formatImportErrorList = (errors) => {
  let errorArr: string[] = [];
  const { map } = errors;
  if (!isEmpty(map)) {
    for (let row in map) {
      const list: string[] = map[row].split(";");
      list.forEach((item) => {
        !!item && errorArr.push(`[第 ${row} 行]：${item}`);
      });
    }
    const len = errorArr.length;
    if (len > 3) {
      errorArr.splice(3, len);
      errorArr.push(`错误总条数：${len}，请按照模板使用说明填写再导入`);
    }
    error.value = errorArr;
  }
};

const onSubmit = useDebounceFn(async () => {
  if (!validate()) return;
  if (!isEmpty(fileList.value)) {
    const formData = new FormData();
    const { importPromise } = props;
    const multipartFile = toRaw(fileList.value);
    // @ts-ignore
    formData.append("campId", activityState.value);
    formData.append("multipartFile", multipartFile);
    loading.value = true;
    try {
      const res = await importPromise(formData);
      const { data, code } = res;
      if (code === SUBMIT_CODE.FAIL) {
        formatImportErrorList(data);
        emits("onSubmitError", data);
      } else {
        message.success("上传成功");
        onCancel();
        emits("onSubmitSuccess", data);
      }
      loading.value = false;
    } catch (e) {
      loading.value = false;
      // emits("onSubmitError", e);
    }
  } else {
    error.value = ["请先上传文件"];
  }
}, DEBOUNCE_TIME);

const onDownload = useDebounceFn(async () => {
  if (validate()) {
    loading.value = true;
    const { downloadPromise } = props;
    const params: RequestParamsModel = {
      campId: unref(activityState),
    };
    try {
      await downloadPromise(params);
      loading.value = false;
    } catch (err) {
      loading.value = false;
    }
  }
}, DEBOUNCE_TIME);

function validate() {
  const campId = unref(activityState);
  if (!campId && isEmpty(campId)) {
    error.value = ["请选择活动名称，在进行模板下载/导入上传"];
    return false;
  }
  return true;
}

function openModal(type: boolean) {
  openRef.value = type;
}

function onCancel(e?: Event) {
  e?.stopPropagation();
  activityState.value = "";
  error.value = null;
  fileList.value = null;
  openRef.value = false;
  emits("onCancel", false);
}

onMounted(() => {});

watchEffect(() => {
  openRef.value = !!props.modalProps.open;
});

watch(
  () => openRef.value, // 被观察的源
  (newValue) => {
    // 回调函数，newCount是新值，oldCount是旧值
    if (newValue) {
      getActivityOpts();
    }
  },
);

// watch(
//   () => props.activityValue,
//   (newValue) => {
//     if (
//       newValue &&
//       isEmpty(newValue) &&
//       (isNumber(newValue) || isString(newValue))
//     ) {
//       activitySelecedValues.value = getSelecedValues(activityOptions, newValue);
//     }
//   },
// );

defineExpose({ openModal });
</script>

<style lang="less" src="./index.less" />
