<template>
  <div>
    <div class="font-size-[20px] mb-4">user list</div>
    <div class="p-4 w-full bg-white flex user-container">
      <UserCard
        v-for="(item, index) in userList"
        :key="index"
        :userInfo="item"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import UserCard from "./UserCard.vue";
import cardBg from "/@/assets/bg.jpg";
const userList = ref([]);

onMounted(() => {
  let _arr: any = [];
  for (let i = 0; i < 15; i++) {
    _arr.push({
      id: i,
      name: `name ${i}`,
      desc: "this is something happened in my life...",
      background: cardBg,
    });
  }
  userList.value = _arr;
});
</script>

<style lang="less" scoped>
.user-container {
  flex-wrap: wrap;
  gap: 40px;
}
</style>
