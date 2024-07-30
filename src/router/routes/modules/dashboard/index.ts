import type { AppRouteModule } from "/@/router/types";

import { LAYOUT } from "/@/router/constant";
// import { HomeFilled } from "@ant-design/icons-vue";
const dashboard: AppRouteModule[] = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: LAYOUT,
    redirect: "/dashboard/index",
    meta: {
      orderNo: 10000,
      antIcon: "HomeFilled",
      title: "Home",
      // hideChildrenInMenu: true,
    },
    children: [
      {
        path: "index",
        name: "index",
        meta: {
          title: "仪表盘",
          hideMenu: true,
        },
        component: () => import("/@/views/dashboard/index.vue"),
      },
    ],
  },
];

export default dashboard;
