import type { AppRouteModule } from "/@/router/types";

import { LAYOUT } from "/@/router/constant";
// import { HomeFilled } from "@ant-design/icons-vue";
const product: AppRouteModule[] = [
  {
    path: "/product",
    name: "dashboard",
    component: LAYOUT,
    redirect: "/product/list",
    meta: {
      orderNo: 10000,
      antIcon: "HomeFilled",
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
    ],
  },
];

export default product;
