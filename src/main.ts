import { createApp } from "vue";
import "uno.css";
//svg插件需要配置的代码
import "virtual:svg-icons-register";
import "ant-design-vue/dist/reset.css";
//注册全局组件
import App from "/@/App.vue";
import { setupStore } from "/@/store";
import { router, setupRouter } from "./router";
import { setupRouterGuard } from "./router/guard";
import { registerGlobComp } from "./components/registerGlobComp";

import { setupErrorHandle } from "/@/logics/error-handle";
import { setupGlobDirectives } from "./directives";
import { initAppConfigStore } from "./logics/initAppConfig";
import "/@/design/ant/antd.less";
// register Swiper custom elements

async function bootstrap() {
  const app = createApp(App);

  // Configure store
  setupStore(app);

  // Initialize internal system configuration
  // 初始化内部系统配置
  initAppConfigStore();

  // Register global components
  // 注册全局组件
  registerGlobComp(app);

  // Configure routing
  // 配置路由
  setupRouter(app);

  // router-guard
  // 路由守卫
  setupRouterGuard(router);
  // Configure global error handling
  // 配置全局错误处理
  setupErrorHandle(app);

  // Register global directive
  // 注册全局指令
  setupGlobDirectives(app);

  app.mount("#app");
}
bootstrap();
