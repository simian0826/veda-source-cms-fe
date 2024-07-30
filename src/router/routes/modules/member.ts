import type { AppRouteModule } from "/@/router/types";

import { LAYOUT } from "/@/router/constant";
// import { HomeFilled } from "@ant-design/icons-vue";
const member: AppRouteModule[] = [
  {
    path: "/member",
    name: "dashboard",
    component: LAYOUT,
    redirect: "/member/list",
    meta: {
      antIcon: "PictureOutlined",
      title: "Member",
    },
    children: [
      {
        path: "list",
        name: "Member List",
        meta: {
          title: "Member List",
        },
        component: () => import("/@/views/member/List.vue"),
      },
    ],
  },
];

export default member;
