<template>
  <div>
    <div class="font-size-[20px] mb-4">
      <div>Member List</div>
      <Button @click="openMemberModal">New</Button>
    </div>

    <div class="p-4 w-full bg-white member-container">
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
          <EditOutlined key="edit" />
          <DeleteOutlined key="delete" />
        </template>
        <Meta>
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
        </Meta>
      </Card>
    </div>
    <Modal v-model:open="memberModal" :title="modalTitle">
      <template #footer>
        <Button @click="handleCancel">Cancel</Button>
        <Button type="primary" :loading="createLoading" @click="handleCreate">
          Create
        </Button>
      </template>

      <div class="form-container">
        <Form :model="memberForm">
          <Form.Item
            label="Name"
            name="name"
            :rules="[{ required: true, message: 'Please input member name!' }]"
          >
            <a-input v-model:value="memberForm.name" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            :rules="[
              { required: true, message: 'Please input member description!' },
            ]"
          >
            <a-input v-model:value="memberForm.description" />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            :rules="[
              { required: true, message: 'Please upload member image!' },
            ]"
          >
            <Upload
              v-model:file-list="memberForm.image"
              action="/veda-source/storage/upload"
              @change="handleFileChange"
            >
              <div v-if="!memberForm.image">
                <div>
                  <PlusOutlined />
                  <div style="margin-top: 8px">Upload</div>
                </div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { Card, Tooltip, Modal, Button, Form, Upload } from "ant-design-vue";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";
import { Member } from "/@/api/member/model";
import { BasicPageParams } from "/@/api/model";
import { getMemberListApi } from "/@/api/member/index";
import type { UploadProps, UploadChangeParam } from "ant-design-vue";

const { Meta } = Card;
const memberModal = ref(false);
const createLoading = ref(false);
const modalTitle = ref("Create");
const memberList = ref<Member[]>([]);
const memberForm = ref<Member>({
  name: "",
  description: "",
  image: "",
});
const pagenigation = ref<BasicPageParams>({ page: 0, pageSize: 8 });
const openMemberModal = (member?: Member) => {
  memberModal.value = true;
  if (member) {
    memberForm.value = member;
  } else {
    memberForm.value = {
      name: "",
      description: "",
      image: "",
    };
  }
};
const handleCreate = () => {};
const handleCancel = () => {};
onMounted(async () => {
  const res = await getMemberListApi(pagenigation.value);
  memberList.value = res.list;
});

const handleFileChange = (info: UploadChangeParam) => {
  console.log("info", info);
};
</script>

<style lang="less" scoped>
.member-container {
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
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
