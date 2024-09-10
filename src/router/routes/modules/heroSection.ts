import type { AppRouteModule } from "/@/router/types";

import { LAYOUT } from "/@/router/constant";
const heroSection: AppRouteModule[] = [
  {
    path: "/hero",
    name: "Hero",
    component: LAYOUT,
    redirect: "/hero/config",
    meta: {
      orderNo: 2,
      antIcon: "PictureOutlined",
      title: "Hero Section",
      hideChildrenInMenu: true,
    },
    children: [
      {
        path: "config",
        name: "config",
        meta: {
          title: "Configuration",
        },
        component: () => import("/@/views/hero/index.vue"),
      },
    ],
  },
];

export default heroSection;
