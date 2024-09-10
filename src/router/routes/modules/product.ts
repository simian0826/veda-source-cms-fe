import type { AppRouteModule } from "/@/router/types";

import { LAYOUT } from "/@/router/constant";
// import { HomeFilled } from "@ant-design/icons-vue";
const product: AppRouteModule[] = [
  {
    path: "/product",
    name: "Product",
    component: LAYOUT,
    redirect: "/product/list",
    meta: {
      orderNo: 4,
      antIcon: "ProfileOutlined",
      title: "Product",
    },
    children: [
      {
        path: "list",
        name: "Product List",
        meta: {
          title: "Product List",
        },
        component: () => import("/@/views/product/List.vue"),
      },
      {
        path: "detail",
        name: "Product Detail",
        meta: {
          title: "Product Detail",
          hideMenu: true,
          currentActiveMenu: "/product/list",
        },
        component: () => import("/@/views/product/Detail.vue"),
      },
    ],
  },
];

export default product;
