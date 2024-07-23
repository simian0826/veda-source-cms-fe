<template>
  <div style="display: inline-block">
    <Popover
      v-if="type === 'popover'"
      trigger="click"
      placement="bottomRight"
      :overlayInnerStyle="{ padding: '4px 0' }"
      :open="visible && !disabled"
      @openChange="(val) => (visible = val)"
    >
      <template v-slot:content>
        <Button
          class="popover__btn"
          v-for="action in actions"
          :key="action"
          :type="'text'"
          :disabled="disabled"
          @click="handleAction(action)"
        >
          {{ action }}
        </Button>
      </template>
      <a v-if="disabled" class="mr-4 disabled">垂媒外呼</a>
      <a v-else class="mr-4">垂媒外呼</a>
    </Popover>
    <span v-if="type === 'button'">
      <Button
        :disabled="disabled"
        class="button__width mr"
        v-for="action in actions"
        :type="'primary'"
        :key="action"
        @click="handleAction(action)"
      >
        {{ action }}
      </Button>
    </span>
    <Modal
      v-if="!!action"
      v-model:open="open"
      @cancel="handleCancel"
      style="width: calc(100vw - 200px); top: 50px"
    >
      <template #title>
        <span>{{ action }}</span>
      </template>
      <div class="modal__content">
        <Spin :spinning="loading">
          <iframe v-if="action !== ACTION.CALL_OF_AUTOHOME" :src="url"></iframe>
          <Autohome v-else-if="!!data" :related-id="relatedId" :data="data" />
        </Spin>
      </div>
      <template #footer></template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
// 外呼按钮组件
import { Button, message, Popover, Spin } from "ant-design-vue";
import { ACTION } from "/@/enums/taskManagementEnum";
import { ref } from "vue";
import {
  fetchNewPortyicheUrl,
  fetchPortDcdUrl,
  fetchPortQczjUrl,
} from "/@/api/taskManagement/taskPage";
import { useUserStore } from "/@/store/modules/user";
import Autohome from "/@/components/Call/src/components/Autohome.vue";
import { BasicModal as Modal } from "/@/components/Modal";

const props = defineProps({
  // 关联线索ID，用于请求数据
  relatedId: {
    type: String,
    required: true,
  },
  dealerId: {
    type: String,
    required: true,
  },
  // 支持外呼的类型
  actions: {
    type: Array as () => ACTION[],
    required: true,
  },
  // 组建类型
  type: {
    type: String as () => "button" | "popover",
    required: false,
    default: "popover",
  },
  disabled: {
    type: Boolean,
    required: false,
  },
});

const userStore = useUserStore();
const visible = ref(false);
const action = ref<ACTION>();
const url = ref<string>();
const loading = ref(false);
const data = ref();

const handleAction = async (act: ACTION) => {
  action.value = act;
  visible.value = false;
  open.value = true;

  try {
    loading.value = true;
    if (action.value === ACTION.CALL_OF_DCDAPP) {
      const res = await fetchPortDcdUrl({
        dealerId: props.dealerId,
        relatedId: props.relatedId,
        roleId: userStore.currentRole?.roleId || "",
      });
      url.value = res.profileUrl;
    } else if (action.value === ACTION.CALL_OF_YICHEHUOBAN) {
      const res = await fetchNewPortyicheUrl({
        relatedId: props.relatedId,
        roleId: userStore.currentRole?.roleId || "",
      });
      url.value = res.profileUrl;
      if (!res.retValue && res.description) {
        message.error(res.description);
      }
    } else if (action.value === ACTION.CALL_OF_AUTOHOME) {
      data.value = await fetchPortQczjUrl({
        relatedId: props.relatedId,
        roleId: userStore.currentRole?.roleId || "",
      });
    }
  } finally {
    loading.value = false;
  }
};

const open = ref(false);

const handleCancel = () => {
  open.value = false;
  url.value = undefined;
  action.value = undefined;
  data.value = undefined;
};
</script>

<style scoped lang="less">
.popover__btn {
  min-width: 180px;
  display: block;
  text-align: left;

  &:hover {
    background-color: #e8eaf3;
    color: #152a8c;
  }
}

a {
  color: @primary-color;
  &.disabled {
    color: #999999;
  }
}

.button__width {
  width: auto;
}

.modal__content {
  height: calc(100vh - 200px);
  overflow-y: auto;
  overflow-x: hidden;
}

iframe {
  border: none;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
}
</style>
