<template>
  <div>
    <!-- title -->
    <div class="font-size-[20px] mb-4">Product List</div>

    <div class="bg-white p-4">
      <div class="mb-4 flex justify-between">
        <div>
          <span><strong>category:</strong></span>
          <Select
            :value="selectedCategory"
            :options="categories"
            class="w-[200px] ml-4"
            @change="categoryChangeHandler"
          />
        </div>
        <Button
          type="primary"
          @click="addNewProduct"
          :icon="h(PlusCircleOutlined)"
        >
          New
        </Button>
      </div>
      <Spin wrapperClassName="w-full" :spinning="listLoading">
        <Table
          :columns="columns"
          row-key="id"
          :data-source="productList"
          :pagination="false"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'images'">
              <div class="flex flex-justify-start">
                <img
                  class="w-[100px] mr-4"
                  v-for="item in record.imgs"
                  :src="item"
                  :key="item"
                />
              </div>
            </template>

            <template v-else-if="column.key === 'action'">
              <div>
                <Button type="link" @click="jumpTo(record.id, 'detail')">
                  Detail
                </Button>
                <Button type="link" @click="jumpTo(record.id, 'edit')">
                  Edit
                </Button>
                <Button type="link" @click="confirmDelete(record.id)">
                  Delete
                </Button>
              </div>
            </template>
          </template>
        </Table>
      </Spin>

      <div class="flex justify-end mt-2">
        <Pagination
          :total="pagenigation.total"
          :show-total="() => `total ${pagenigation.total} items`"
          show-size-changer
          show-quick-jumper
          :current="pagenigation.page"
          :page-size="pagenigation.pageSize"
          @change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  Button,
  Select,
  Table,
  Pagination,
  Modal,
  message,
  Spin,
} from "ant-design-vue";
import { ref, h, onBeforeMount, createVNode } from "vue";
import {
  PlusCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import {
  getProductListApi,
  getCategoryDictApi,
  deleteProductApi,
} from "/@/api/product";

import type { Dict, Pagenigation } from "/@/api/model/baseModel";

const router = useRouter();
const listLoading = ref(false);
const categories = ref<Dict[]>([{ label: "All", value: "" }]);
const selectedCategory = ref();
const pagenigation = ref<Pagenigation>({
  page: 1,
  pageSize: 10,
  total: 0,
});
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 250,
  },
  {
    title: "Category",
    dataIndex: "category",
    width: 250,
  },

  {
    title: "Product Images",
    key: "images",
    dataIndex: "imgs",
  },
  {
    title: "Action",
    key: "action",
    width: 250,
  },
];

const productList = ref();
// to detail
const jumpTo = (id, type) => {
  router.push({
    path: `/product/detail`,
    query: {
      id,
      mode: type,
    },
  });
};
// to new
const addNewProduct = () => {
  router.push({
    path: `/product/detail`,
    query: {
      mode: "add",
    },
  });
};
// delete confirm
const confirmDelete = (id) => {
  Modal.confirm({
    title: "Warning?",
    icon: createVNode(ExclamationCircleOutlined),
    content: "Are you sure you want to delete this product?",
    onOk: async () => {
      const res = await deleteProductApi(Number(id));
      if (res) {
        message.success("Delete product successfully");
        fetchProductList(true);
      } else {
        message.error("Delete product failed");
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onCancel() {},
  });
};
// pager change
const handlePageChange = (page, size) => {
  pagenigation.value.page = page;
  pagenigation.value.pageSize = size;

  fetchProductList();
};

const fetchProductList = async (isInit = false) => {
  if (isInit) {
    pagenigation.value.page = 1;
    productList.value = [];
    pagenigation.value.total = 0;
    pagenigation.value.pageSize = 10;
  }

  try {
    listLoading.value = true;
    const res = await getProductListApi({
      category: selectedCategory.value,
      page: pagenigation.value.page,
      pageSize: pagenigation.value.pageSize,
    });

    if (res.list.length > 0) {
      productList.value.push(...res.list);
    }
    pagenigation.value.total = res.total;
    pagenigation.value.page++;
  } finally {
    listLoading.value = false;
  }
};

const fetchCategoryDict = async () => {
  const res = await getCategoryDictApi();

  categories.value = [...categories.value, ...res];
};

const categoryChangeHandler = (categoryItem: Dict) => {
  selectedCategory.value = categoryItem;
  fetchProductList(true);
};

onBeforeMount(async () => {
  await fetchCategoryDict();
  if (categories.value.length > 0) {
    selectedCategory.value = categories.value[0].value;
    fetchProductList(true);
  }
});
</script>

<style lang="less" scoped></style>
