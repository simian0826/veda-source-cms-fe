<template>
  <Sider
    theme="light"
    v-bind:collapsed="getCollapsed"
    :collapsedWidth="80 || getCollapsedWidth"
    collapsible
    style="box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15)"
    @collapse="toggleCollapsed"
  >
    <template #trigger>
      <div
        class="flex flex-items-center"
        :class="getCollapsed ? 'flex-justify-center' : 'pl-4'"
      >
        <span class="mr-2">
          <MenuFoldOutlined style="font-size: 16px" v-show="!getCollapsed" />
          <MenuUnfoldOutlined style="font-size: 16px" v-show="getCollapsed" />
        </span>
        <span v-if="!getCollapsed" class="text-left" style="min-width: 80px">
          {{ getCollapsed ? "" : "收起菜单" }}
        </span>
      </div>
    </template>
    <LayoutMenu />
  </Sider>
</template>

<script setup lang="ts">
import LayoutMenu from "../menu/index.vue";
import { useMenuSetting } from "/@/hooks/setting/useMenuSetting";
import { computed, unref } from "vue";
import { Layout } from "ant-design-vue";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";

const { Sider } = Layout;

const { getCollapsed, getMiniWidthNumber, toggleCollapsed } = useMenuSetting();

const getCollapsedWidth = computed(() => {
  return unref(getMiniWidthNumber);
});
</script>
