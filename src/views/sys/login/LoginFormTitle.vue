<template>
  <h2 class="mb-3 mt-3 text-2xl font-bold text-center enter-x">
    {{ getFormTitle }}
  </h2>
</template>
<script lang="ts" setup>
import { computed, unref } from "vue";
import { LoginStateEnum, useLoginState } from "./useLogin";

const { getLoginState } = useLoginState();

const getFormTitle = computed(() => {
  const titleObj = {
    [LoginStateEnum.RESET_PASSWORD]: "RESET PASSWORD",
    [LoginStateEnum.LOGIN]: "LOGIN",
    [LoginStateEnum.REGISTER]: "REGISTER",
    [LoginStateEnum.MOBILE]: "MOBILE LOGIN",
    [LoginStateEnum.QR_CODE]: "QR CODE LOGIN",
  };
  return titleObj[unref(getLoginState)];
});
</script>
