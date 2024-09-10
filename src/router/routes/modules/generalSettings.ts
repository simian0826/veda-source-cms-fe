import type { AppRouteModule } from "/@/router/types";

import { LAYOUT } from "/@/router/constant";
const generalSettings: AppRouteModule[] = [
  {
    path: "/general",
    name: "general",
    component: LAYOUT,
    redirect: "/general/settings",
    meta: {
      orderNo: 1,
      antIcon: "MailOutlined",
      title: "General Setting",
      hideChildrenInMenu: true,
    },
    children: [
      {
        path: "settings",
        name: "Settings",
        meta: {
          title: "contactUs List",
        },
        component: () => import("/@/views/generalSettings/index.vue"),
      },
    ],
  },
];

export default generalSettings;
