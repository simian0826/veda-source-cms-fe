import type { AppRouteModule } from "/@/router/types";

import { LAYOUT } from "/@/router/constant";
// import { HomeFilled } from "@ant-design/icons-vue";
const contactUs: AppRouteModule[] = [
  {
    path: "/contactUs",
    name: "contactUs",
    component: LAYOUT,
    redirect: "/contactUs/list",
    meta: {
      orderNo: 6,
      antIcon: "MailOutlined",
      title: "Contact Us",
      hideChildrenInMenu: true,
    },
    children: [
      {
        path: "list",
        name: "contactUs List",
        meta: {
          title: "contactUs List",
        },
        component: () => import("/@/views/contactUs/List.vue"),
      },
    ],
  },
];

export default contactUs;
