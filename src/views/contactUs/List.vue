<template>
  <div>
    <!-- title -->
    <div class="font-size-[20px] mb-4">Contact List</div>

    <div class="bg-white p-4">
      <div class="mb-4 flex justify-between">
        <div class="w-full">
          <Form
            class="w-full"
            layout="inline"
            :model="formState"
            @finish="handleFinish"
          >
            <Row class="w-full">
              <Col :span="6">
                <FormItem label="name" name="name">
                  <Input
                    v-model:value="formState.name"
                    placeholder="please enter name"
                  />
                </FormItem>
              </Col>
              <Col :span="6">
                <FormItem label="emai" name="emai">
                  <Input
                    v-model:value="formState.email"
                    placeholder="Please enter email address"
                  />
                </FormItem>
              </Col>
              <Col :span="6">
                <FormItem label="subject" name="subject">
                  <Input
                    v-model:value="formState.subject"
                    placeholder="Please enter email address"
                  />
                </FormItem>
              </Col>
              <Col :span="6">
                <FormItem>
                  <Button type="primary" html-type="submit">Search</Button>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <Spin wrapperClassName="w-full" :spinning="listLoading">
        <Table
          :columns="columns"
          row-key="id"
          :data-source="list"
          :pagination="false"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <div>
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
  Form,
  FormItem,
  Input,
  Spin,
  Table,
  Pagination,
  Modal,
  message,
  Row,
  Col,
} from "ant-design-vue";
import { ref, onBeforeMount, createVNode } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { getContactUsListApi, deleteContactUsApi } from "/@/api/contactUs";
import type { Pagenigation } from "/@/api/model/baseModel";
import type { ContactUs } from "/@/api/contactUs/model";
const listLoading = ref(false);
const pagenigation = ref<Pagenigation>({
  page: 1,
  pageSize: 10,
  total: 0,
});
const formState = ref<ContactUs>({});
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 200,
  },
  {
    title: "Email",
    dataIndex: "email",
    width: 200,
  },
  {
    title: "Subject",
    dataIndex: "subject",
    width: 200,
  },
  {
    title: "Message",
    key: "message",
    dataIndex: "message",
  },
  {
    title: "Action",
    key: "action",
    width: 100,
  },
];

const list = ref();

// delete confirm
const confirmDelete = (id) => {
  Modal.confirm({
    title: "Warning?",
    icon: createVNode(ExclamationCircleOutlined),
    content: "Are you sure you want to delete this project?",
    onOk: async () => {
      const res = await deleteContactUsApi(Number(id));
      if (res) {
        message.success("Delete data successfully");
        fetchContactUsList(true);
      } else {
        message.error("Delete data failed");
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

  fetchContactUsList();
};

const fetchContactUsList = async (isInit = false) => {
  if (isInit) {
    pagenigation.value.page = 1;
    list.value = [];
    pagenigation.value.total = 0;
    pagenigation.value.pageSize = 10;
  }

  try {
    listLoading.value = true;
    const res = await getContactUsListApi({
      name: formState.value.name,
      email: formState.value.email,
      subject: formState.value.subject,

      page: pagenigation.value.page,
      pageSize: pagenigation.value.pageSize,
    });

    if (res.list.length > 0) {
      list.value.push(...res.list);
    }
    pagenigation.value.total = res.total;
    pagenigation.value.page++;
  } finally {
    listLoading.value = false;
  }
};

// submit
const handleFinish = async () => {
  fetchContactUsList(true);
};

onBeforeMount(async () => {
  fetchContactUsList(true);
});
</script>

<style lang="less" scoped></style>
