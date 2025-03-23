<template>
  <Layout style="min-height: 100vh">
    <LayoutSider />
    <Layout>
      <LayoutHeader />
      <Content class="m-4">
        <div class="pb-4">
          <LayoutBreadcrumb />
        </div>
        <div class="page-content">
          <PageLayout />
        </div>
      </Content>
    </Layout>
  </Layout>
</template>

<script setup lang="ts">
import LayoutBreadcrumb from "./components/Breadcrumb.vue";
import LayoutSider from "./components/sider/index.vue";
import LayoutHeader from "./components/header/index.vue";
import { Layout } from "ant-design-vue";
import PageLayout from "/@/layouts/page/index.vue";

const { Content } = Layout;
</script>
<style scoped lang="less">
.page-content {
  max-height: calc(100vh - 2rem - 82px);
  height: calc(100vh - 2rem - 82px);
  overflow-y: auto;
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
