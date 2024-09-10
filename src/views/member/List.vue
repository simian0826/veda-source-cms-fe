<template>
  <div>
    <div class="font-size-[20px] mb-4 flex justify-between">
      <div>Member List</div>
      <Button type="primary" @click="openMemberModal()">New</Button>
    </div>

    <div class="p-4 w-full bg-white member-container">
      <div class="member-card-wrapper">
        <Card
          class="member-item"
          hoverable
          :key="index"
          v-for="(item, index) in memberList"
        >
          <template #cover>
            <img class="member-image" alt="example" :src="item.image" />
          </template>
          <template #actions>
            <EditOutlined key="edit" @click="openMemberModal(item)" />
            <DeleteOutlined key="delete" @click="handleDelete(item.id)" />
          </template>
          <CardMeta>
            <template #title>
              <div>{{ item.name }}</div>
            </template>
            <template #description>
              <Tooltip placement="bottom">
                <div class="member-description">
                  {{ item.description }}
                </div>

                <template #title>
                  <span>{{ item.description }}</span>
                </template>
              </Tooltip>
            </template>
          </CardMeta>
        </Card>
      </div>

      <div class="flex justify-end mt-4">
        <Pagination
          :total="pagenigation.total"
          :show-total="() => `total ${pagenigation.total} members`"
          show-size-changer
          show-quick-jumper
          :current="pagenigation.page"
          :page-size="pagenigation.pageSize"
          @change="handlePageChange"
        />
      </div>
    </div>
    <Modal v-model:open="memberModal" :title="modalType">
      <template #footer>
        <Button @click="handleCancel">Cancel</Button>
        <Button type="primary" :loading="createLoading" @click="handleCreate">
          {{ modalType }}
        </Button>
      </template>

      <div class="form-container">
        <Form :model="memberForm" :label-col="{ style: { width: '100px' } }">
          <Form.Item
            label="Name"
            name="name"
            :rules="[{ required: true, message: 'Please input member name!' }]"
          >
            <Input v-model:value="memberForm.name" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            :rules="[
              { required: true, message: 'Please input member description!' },
            ]"
          >
            <Textarea
              :auto-size="{ minRows: 2, maxRows: 5 }"
              v-model:value="memberForm.description"
            />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            :rules="[
              { required: true, message: 'Please upload member image!' },
            ]"
          >
            <Upload
              :action="Api.AntUpload"
              :headers="uploadHeader"
              list-type="picture-card"
              :max-count="1"
              v-model:file-list="memberImage"
              @change="handleFileChange"
            >
              <div v-if="!memberForm.image">
                <PlusOutlined />
                <div style="margin-top: 8px">Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import {
  Card,
  CardMeta,
  Tooltip,
  Modal,
  Button,
  Form,
  Upload,
  Input,
  Textarea,
  Pagination,
  message,
} from "ant-design-vue";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";

import { onMounted, ref, createVNode } from "vue";
import { Member } from "/@/api/member/model";
import { Pagenigation } from "/@/api/model/baseModel";
import { useUserStore } from "/@/store/modules/user";
import { Api } from "/@/api/product";

import {
  getMemberListApi,
  createMemberApi,
  updateMemberApi,
  deleteMemberApi,
} from "/@/api/member/index";
import type { UploadProps, UploadChangeParam } from "ant-design-vue";

const userStore = useUserStore();
const uploadHeader = {
  Authorization: userStore.getToken,
};

const memberModal = ref(false);
const modalType = ref<"Create" | "Update">("Create");
const createLoading = ref(false);
const listLoading = ref(false);

const memberList = ref<Member[]>([]);
const memberForm = ref<Member>({
  name: "",
  description: "",
  image: "",
});
const memberImage = ref<UploadProps["fileList"]>([]);
const pagenigation = ref<Pagenigation>({ page: 1, pageSize: 10, total: 0 });
const openMemberModal = (member?: Member) => {
  memberModal.value = true;
  if (member) {
    modalType.value = "Update";
    memberForm.value = member;
    memberImage.value = [
      {
        uid: "1",
        name: member.image.substring(member.image.lastIndexOf("/") + 1),
        status: "done",
        url: member.image,
        thumbUrl: member.image,
      },
    ];
  } else {
    modalType.value = "Create";

    memberForm.value = {
      name: "",
      description: "",
      image: "",
    };
    memberImage.value = [];
  }
};
const handleCreate = async () => {
  memberModal.value = false;
  let res;
  try {
    createLoading.value = true;
    if (modalType.value === "Create") {
      res = await createMemberApi(memberForm.value);
    } else {
      res = await updateMemberApi(memberForm.value);
    }
    if (res) {
      message.success(modalType.value + " member successfully");
      fetchMemberList(true);
    } else {
      message.error(modalType.value + "member failed");
    }
  } catch (e) {
    message.error(modalType.value + "member failed");
    console.error(e);
  } finally {
    createLoading.value = false;
  }
};
const handleCancel = () => {
  memberModal.value = false;
};

const handleDelete = (id) => {
  Modal.confirm({
    title: "Warning?",
    icon: createVNode(ExclamationCircleOutlined),
    content: "Are you sure you want to delete this member?",
    onOk: async () => {
      const res = await deleteMemberApi(Number(id));
      if (res) {
        message.success("Delete member successfully");
        fetchMemberList(true);
      } else {
        message.error("Delete member failed");
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onCancel() {},
  });
};

const handleFileChange = (params: UploadChangeParam) => {
  console.log(params);
  const { file, fileList } = params;
  if (file.status === "done" || file.status === "removed") {
    memberForm.value.image = "";

    if (fileList.length > 0) {
      let fileUrl = "";

      if (fileList[0].url) {
        fileUrl = fileList[0].url;
      } else {
        fileUrl = fileList[0].response.data[0].url;
      }
      memberForm.value.image = fileUrl;
    }
  }
  // const formData = new FormData();
  // formData.append("file", file);
  // console.log(formData, "formData");
};

const handlePageChange = (page, size) => {
  pagenigation.value.page = page;
  pagenigation.value.pageSize = size;

  fetchMemberList();
};

const fetchMemberList = async (isInit = false) => {
  if (isInit) {
    pagenigation.value.page = 1;
    memberList.value = [];
    pagenigation.value.total = 0;
    pagenigation.value.pageSize = 10;
  }

  try {
    listLoading.value = true;
    const res = await getMemberListApi({
      page: pagenigation.value.page,
      pageSize: pagenigation.value.pageSize,
    });

    if (res.list.length > 0) {
      memberList.value.push(...res.list);
    }
    pagenigation.value.total = res.total;
    pagenigation.value.page++;
  } finally {
    listLoading.value = false;
  }
};

onMounted(async () => {
  fetchMemberList(true);
});
</script>

<style lang="less" scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.member-container {
  .member-card-wrapper {
    flex-wrap: wrap;
    display: grid;
    // grid-template-columns: repeat(8, 1fr);
    grid-gap: 40px 40px;
    @media (max-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 1920px) {
      grid-template-columns: repeat(6, 1fr);
    }
    @media (min-width: 1921px) {
      grid-template-columns: repeat(8, 1fr);
    }

    .member-item {
      .member-image {
        width: 100%;
        aspect-ratio: 4 / 3;
        object-fit: cover;
        object-position: 0 0;
      }
      .member-description {
        min-height: 66px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
