<template>
  <div>
    <!-- title -->
    <div class="font-size-[20px] mb-4">Project List</div>

    <div class="bg-white p-4">
      <div class="mb-4 flex justify-between">
        <div>
          <span class="mr-2"><strong>Type:</strong></span>
          <Radio.Group
            v-model:value="selectedType"
            button-style="solid"
            @change="typeChangeHandler"
          >
            <Radio.Button value="">All</Radio.Button>
            <Radio.Button value="completed">Completed</Radio.Button>
            <Radio.Button value="onGoing">OnGoing</Radio.Button>
          </Radio.Group>
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
          :data-source="projectList"
          :pagination="false"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'projectImages'">
              <div class="flex flex-justify-start">
                <img
                  class="w-[100px] mr-4"
                  v-for="item in record.projectImages"
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
  Table,
  Pagination,
  Modal,
  message,
  Radio,
} from "ant-design-vue";
import { ref, h, onBeforeMount, createVNode } from "vue";
import {
  PlusCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { getProjectListApi, deleteProjectApi } from "/@/api/project";

import type { Pagenigation } from "/@/api/model/baseModel";

const router = useRouter();
const listLoading = ref(false);
const selectedType = ref("");
const pagenigation = ref<Pagenigation>({
  page: 1,
  pageSize: 10,
  total: 0,
});
const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    width: 250,
  },
  {
    title: "Type",
    dataIndex: "type",
    width: 50,
  },
  {
    title: "Location",
    dataIndex: "location",
    width: 150,
  },
  {
    title: "Project Images",
    key: "projectImages",
    dataIndex: "projectImages",
  },
  {
    title: "Action",
    key: "action",
    width: 250,
  },
];

const projectList = ref();
// to detail
const jumpTo = (id, type) => {
  router.push({
    path: `/project/detail`,
    query: {
      id,
      mode: type,
    },
  });
};
// to new
const addNewProduct = () => {
  router.push({
    path: `/project/detail`,
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
    content: "Are you sure you want to delete this project?",
    onOk: async () => {
      const res = await deleteProjectApi(Number(id));
      if (res) {
        message.success("Delete project successfully");
        fetchProductList(true);
      } else {
        message.error("Delete project failed");
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
    projectList.value = [];
    pagenigation.value.total = 0;
    pagenigation.value.pageSize = 10;
  }

  try {
    listLoading.value = true;
    const res = await getProjectListApi({
      type: selectedType.value,
      page: pagenigation.value.page,
      pageSize: pagenigation.value.pageSize,
    });

    if (res.list.length > 0) {
      projectList.value.push(...res.list);
    }
    pagenigation.value.total = res.total;
    pagenigation.value.page++;
  } finally {
    listLoading.value = false;
  }
};

const typeChangeHandler = (e) => {
  console.log(e.target.value);
  selectedType.value = e.target.value;
  fetchProductList(true);
};

onBeforeMount(async () => {
  fetchProductList(true);
});
</script>

<style lang="less" scoped></style>
