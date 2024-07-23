<template>
  <span :class="`flex items-center`">
    <img v-if="getImg" :src="getImg" class="w-18px h-18px align-top" />
    <Icon
      v-if="getIcon"
      :icon="getIcon"
      :size="14"
      :class="`${prefixCls}-wrapper__icon`"
    />
    <component
      v-if="getAntIcon"
      class=""
      style="font-size: 14px; display: flex; flex-shrink: 0"
      :is="AntdIcons[getAntIcon]"
    />
    <!-- {{ getI18nName }}  -->
    <span :class="getCollapsed ? 'ml-2' : ''">{{ getI18nName }}</span>
    <!-- {{ getCollapsed ? "" : getI18nName }} -->
  </span>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import Icon from "/@/components/Icon/src/Icon.vue";
import { useDesign } from "/@/hooks/web/useDesign";
import { contentProps } from "../props";
import * as AntdIcons from "@ant-design/icons-vue";
import { useMenuSetting } from "/@/hooks/setting/useMenuSetting";
defineOptions({ name: "MenuItemContent" });
const { getCollapsed } = useMenuSetting();

const props = defineProps(contentProps);

const { prefixCls } = useDesign("basic-menu-item-content");

const getI18nName = computed(() => props.item?.name);
const getIcon = computed(() => {
  return props.item?.img ? undefined : props.item?.icon;
});

const getAntIcon = computed(() => {
  let icon: string | undefined = "";
  if (typeof props.item?.antIcon === "function") {
    icon = (props.item?.antIcon as any).displayName as string;
  } else {
    icon = props.item?.antIcon;
  }
  return icon;
});
const getImg = computed(() => props.item?.img);
</script>
<style scoped lang="less">
.basic-menu-item-content {
  display: flex;
  align-items: center;
}
</style>
