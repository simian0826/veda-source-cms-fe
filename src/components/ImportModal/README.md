下载/导入 弹窗

## 版本

- 1.0.2

## 何时使用

- 弹出一个 可以选择活动名称和上传模板弹窗给用户选择操作

## API

```html
<template>
    <a-button type="primary" @click="onOpen">test</a-button>
    <ImportModal ref="importModalRef" v-bind="importModalProps" />
</template>
<script  lang="ts" setup>
import { nextTick, ref, unref, computed } from "vue";
import { ImportModal } from "/@/components/ImportModal";

const importModalRef = ref();
const importModalProps = computed(() => {
      const props = {
        activityOptionsPromise:()=>{}
        importPromise:()=>{}
        downloadPromise()=>{}
      }
})

function onOpen(){
  nextTick(() => {
    importModalRef.value.openModal(true);
  });
}

<script>
```

### Select props

| 参数                   | 说明                                                                                                                                                          | 类型    | 默认值                   |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------ |
| activityValue          | 活动名称选择器组件 value                                                                                                                                      | string  | number                   |
| activityType           | 活动名称选择器组件类型。`ACTIVITY_TYPE.SELECT`:下拉框，`ACTIVITY_TYPE.CASCADER`: 级联下拉框                                                                   | enum    | `ACTIVITY_TYPE.CASCADER` |
| activityOptionsPromise | 获取活动名称的                                                                                                                                                | Promise | Promise                  |
| importPromise          | 导入 Promise                                                                                                                                                  | Promise | -                        |
| downloadPromise        | 下载 Promise                                                                                                                                                  | Promise | -                        |
| modalProps             | 弹窗组件的 Props,继承于 Antd => `Modal`的 Props                                                                                                               | -       | -                        |
| uploadProps            | 上传组件的 Props,继承于 Antd => `UploadDragger`的 Props                                                                                                       | -       | -                        |
| optionsProps           | 活动名称 Props,`activityType=ACTIVITY_TYPE.SELECT`则继承于 Antd => `Select`的 Props；`activityType=ACTIVITY_TYPE.CASCADER`则继承于 Antd => `Cascader`的 Props | -       | -                        |

### 事件

| 事件名称        | 说明           | 回调参数          |
| --------------- | -------------- | ----------------- |
| onSubmitSuccess | 上传成功的回调 | `(value) => void` |
| onSubmitError   | 上传失败的回调 | `(error) => void` |

## 更新日志

v1.0.2

- 增加 `activityValue` 参数，用于给 CASCADER 组件赋值

## 备注

- 组件内设有默认值，只需提供对应 activityOptionsPromise，importPromise，downloadPromise，就可以直接使用。
- 活动名称暂不支持多选
- 因为活动名称 Options 基于一些历史原因没有父级 ID，组件内有对 value 相关处理，使用 activityValue 只能 number 和 string 类型
