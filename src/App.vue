<template>
  <ConfigProvider
    :theme="{
      token: globalTheme,
    }"
  >
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
// import { theme } from "ant-design-vue";
import type { AliasToken } from "ant-design-vue/es/theme/internal";
import { ConfigProvider } from "ant-design-vue";
import { AppProvider } from "/@/components/Application";
import { useTitle } from "/@/hooks/web/useTitle";
import { ColorEnum } from "./enums/colorEnum";
// const { token } = theme.useToken();
// console.log(token.value);

const globalTheme: Partial<AliasToken> = {
  colorPrimary: ColorEnum.PRIMARY,
  // colorPrimary: "red",
  borderRadius: 2,
  fontFamily: "'Microsoft YaHei', sans-serif",
};

// support Multi-language

// Listening to page changes and dynamically changing site titles
useTitle();
</script>
