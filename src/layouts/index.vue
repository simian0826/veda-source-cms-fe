<template>
  <Layout style="min-height: 100vh">
    <LayoutSider />
    <Layout>
      <LayoutHeader />
      <Content class="m-4">
        <div class="pb-4">
          <LayoutBreadcrumb />
        </div>
        <Watermark :content="`${userInfo.username} ${currentDateTime} `">
          <div class="page-content">
            <PageLayout />
          </div>
        </Watermark>
      </Content>
    </Layout>
  </Layout>
</template>

<script setup lang="ts">
import LayoutBreadcrumb from "./components/Breadcrumb.vue";
import LayoutSider from "./components/sider/index.vue";
import LayoutHeader from "./components/header/index.vue";
import { Layout, Watermark } from "ant-design-vue";
import { useUserStore } from "../store/modules/user";
import PageLayout from "/@/layouts/page/index.vue";
import { ref, computed } from "vue";

const { Content } = Layout;
const userStore = useUserStore();
const userInfo = userStore.getUserInfo;
console.log(userInfo.username);
const currentDate = ref(new Date());
const updateTime = () => {
  currentDate.value = new Date();
};
const formatedDateValue = (dateValue: number) => {
  return dateValue > 9 ? dateValue : "0" + dateValue;
};
const currentDateTime = computed(() => {
  return `${currentDate.value.getFullYear()}-${formatedDateValue(
    currentDate.value.getMonth() + 1,
  )}-${formatedDateValue(currentDate.value.getHours())}:${formatedDateValue(
    currentDate.value.getMinutes(),
  )}:${formatedDateValue(currentDate.value.getSeconds())}`;
});

setInterval(updateTime, 1000);

//  login out
</script>
<style scoped lang="less">
.page-content {
  max-height: calc(100vh - 2rem - 102px);
  height: calc(100vh - 2rem - 102px);
  overflow-y: scroll;
}
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  // background: #141414;
}
</style>
