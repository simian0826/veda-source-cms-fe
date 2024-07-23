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
// import { PageEnum } from "/@/enums/pageEnum";
import { useUserStore } from "/@/store/modules/user";
import { PageEnum } from "/@/enums/pageEnum";
const route = useRoute();
// const router = useRouter();
const { query } = route;
const userStore = useUserStore();

if (query.code) {
  console.log("code", query.code);
  userStore.ssoLoginAction({ code: query.code as string });
} else {
  console.log("no code");
  window.location.href = PageEnum.SSO_LOGIN_PAGE;
  // window.location.href =
  //   "https://auth-sit.ftms.com.cn/portal-sso/oauth/authorize?response_type=code&state=state&redirect_uri=https://adms2-sit.ftms.com.cn/gen2/ssoLogin&scope=read&client_id=adms2_sit";
}
// if (auth) {
//   console.log("auth", auth);
// } else {

// }

// if (query.code) {

//   userStore.ssoLoginAction({ code: query.code as string });
// } else {
//   router.push({ path: PageEnum.BASE_LOGIN });
// }
</script>
