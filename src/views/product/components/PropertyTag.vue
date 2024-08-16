<template>
  <div class="flex">
    <template v-for="tag in state.tags" :key="tag">
      <Tooltip v-if="tag.label.length > 20" :title="tag.label">
        <Tag
          :closable="!disabled && state.tags.length !== 1"
          class="py-1 px-4"
          @close="handleClose(tag)"
        >
          {{ `${tag.label.slice(0, 20)}...` }}
        </Tag>
      </Tooltip>
      <Tag
        v-else
        class="py-1 px-4"
        :closable="!disabled && state.tags.length !== 1"
        @close="handleClose(tag)"
      >
        {{ tag.label }}
      </Tag>
    </template>
    <div v-if="!disabled">
      <Input
        v-if="state.inputVisible"
        ref="inputRef"
        v-model:value="state.inputValue"
        type="text"
        size="small"
        :style="{ width: '78px', height: '30px', minHeight: '30px !important' }"
        @blur="handleInputConfirm"
        @keyup.enter="handleInputConfirm"
      />
      <Tag
        v-else
        class="py-1 px-4"
        style="background: #fff; border-style: dashed"
        @click="showInput"
      >
        <plus-outlined />
        New Tag
      </Tag>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, nextTick, PropType, watch } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { Tag, Tooltip, Input } from "ant-design-vue";
import type { Dict } from "/@/api/model/baseModel";
const inputRef = ref();
const props = defineProps({
  items: {
    type: Array as PropType<Dict[]>,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
watch(
  () => props.items,
  (newVal) => {
    state.tags = newVal;
  },
);
const state = reactive<any>({
  tags: props.items,
  inputVisible: false,
  inputValue: "",
});
const emits = defineEmits(["update:items"]);
const handleClose = (removedTag: string) => {
  const tags = state.tags.filter((tag) => tag !== removedTag);
  //   state.tags = tags;
  emits("update:items", tags);
};

const showInput = () => {
  state.inputVisible = true;
  nextTick(() => {
    inputRef.value.focus();
  });
};

const handleInputConfirm = () => {
  const inputValue = state.inputValue;
  let tags = state.tags;
  if (inputValue && tags.indexOf(inputValue) === -1) {
    tags = [...tags, { label: inputValue, value: inputValue }];
  }
  emits("update:items", tags);
  Object.assign(state, {
    // tags,
    inputVisible: false,
    inputValue: "",
  });
};
</script>
