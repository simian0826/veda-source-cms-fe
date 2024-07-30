import type { AppRouteModule } from "/@/router/types";

import { LAYOUT } from "/@/router/constant";
const heroSection: AppRouteModule[] = [
  {
    path: "/hero",
    name: "Hero",
    component: LAYOUT,
    redirect: "/member/list",
    meta: {
      orderNo: 10000,
      antIcon: "TeamOutlined",
      title: "Hero Section",
    },
    children: [
      {
        path: "detail",
        name: "HeroDetail",
        meta: {
          title: "Configuration",
        },
        component: () => import("/@/views/hero/index.vue"),
      },
    ],
  },
];

export default heroSection;
