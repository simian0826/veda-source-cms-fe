<template>
  <div>
    <!-- title -->
    <div class="font-size-[20px] mb-4">product list</div>
    <!-- filter -->
    <header class="p-4 mb-4 bg-white flex justify-between">
      <div>
        <span>category:</span>
        <Select class="w-[200px] ml-4" />
      </div>
      <Button type="primary">Search</Button>
    </header>
    <!-- main -->
    <div class="bg-white p-4">
      <div class="mb-4 flex justify-end">
        <Button
          type="primary"
          @click="addNewProduct"
          :icon="h(PlusCircleOutlined)"
        >
          New
        </Button>
      </div>
      <Table
        :columns="columns"
        row-key="id"
        :data-source="list"
        :pagination="false"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <div>
              <Button type="link" @click="jumpTo(record.id, 'view')">
                view
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
      <div class="flex justify-end">
        <Pagination
          :total="pagination.total"
          :show-total="(tableTotal) => `total ${tableTotal} items`"
          show-size-changer
          show-quick-jumper
          :current="pagination.current"
          :page-size="pagination.pageSize"
          @change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Button, Select, Table, Pagination } from "ant-design-vue";
import { ref, h } from "vue";
import { PlusCircleOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();
const columns = [
  {
    title: "name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "category",
    dataIndex: "category",
  },
  {
    title: "action",
    key: "action",
    width: 250,
  },
];
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0,
});
const list = ref([
  {
    id: "xxx",
  },
]);
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
  console.log("id", id);
};
// pager change
const handlePageChange = (page, size) => {
  pagination.value.current = page;
  pagination.value.pageSize = size;
};
</script>

<style lang="less" scoped></style>
