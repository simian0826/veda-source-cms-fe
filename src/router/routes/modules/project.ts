import type { AppRouteModule } from "/@/router/types";

import { LAYOUT } from "/@/router/constant";
// import { HomeFilled } from "@ant-design/icons-vue";
const project: AppRouteModule[] = [
  {
    path: "/project",
    name: "Project",
    component: LAYOUT,
    redirect: "/project/list",
    meta: {
      orderNo: 5,
      antIcon: "ProjectOutlined",
      title: "Project",
    },
    children: [
      {
        path: "list",
        name: "Project List",
        meta: {
          title: "Project List",
        },
        component: () => import("/@/views/project/List.vue"),
      },
      {
        path: "detail",
        name: "Project Detail",
        meta: {
          title: "Project Detail",
          hideMenu: true,
          currentActiveMenu: "/project/list",
        },
        component: () => import("/@/views/project/Detail.vue"),
      },
    ],
  },
];

export default project;
