<template>
  <Result title="ADMS2 系统登录中">
    <template #icon>
      <LoadingOutlined spin />
    </template>
  </Result>
</template>
<script lang="ts" setup>
import { Result } from "ant-design-vue";
import { LoadingOutlined } from "@ant-design/icons-vue";
import { useRoute } from "vue-router";
import { useUserStore } from "/@/store/modules/user";

const route = useRoute();
// const router = useRouter();

const userStore = useUserStore();
const { meta } = route;

userStore.fetchExternalSSOUrlAction(meta.system as string);
console.log(meta.system);
</script>
