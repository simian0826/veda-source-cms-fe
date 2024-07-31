<template>
  <div>
    <div class="font-size-[20px] mb-4">Member List</div>
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
  </div>
</template>

<script lang="ts" setup>
import { Card, Tooltip } from "ant-design-vue";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";
import { Member } from "/@/api/member/model";
import { BasicPageParams } from "/@/api/model";
import { getMemberListApi } from "/@/api/member/index";
const { Meta } = Card;
const memberList = ref<Member>([]);
const pagenigation = ref<BasicPageParams>({ page: 0, pageSize: 8 });
onMounted(async () => {
  const res = await getMemberListApi(pagenigation.value);
  memberList.value = res.list;
});
</script>

<style lang="less" scoped>
.member-container {
  flex-wrap: wrap;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 40px 40px;

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
