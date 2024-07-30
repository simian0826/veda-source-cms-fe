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
      antIcon: "ProfileOutlined",
      title: "Product",
    },
    children: [
      {
        path: "list",
        name: "Product List",
        meta: {
          title: "Products",
        },
        component: () => import("/@/views/product/List.vue"),
      },
      {
        path: "detail",
        name: "Product List",
        meta: {
          title: "Product",
          hideMenu: true,
        },
        component: () => import("/@/views/product/Detail.vue"),
      },
    ],
  },
];

export default product;
