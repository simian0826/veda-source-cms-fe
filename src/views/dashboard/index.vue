<template>
  <div class="bg-white p-4" style="height: 3000px">
    <Button disabled class="mr-2">A</Button>
    <Button class="mr-2">B</Button>
    <Button class="mr-2" @click="go">C</Button>
    <Input />
    <Input.Password />
    <Select mode="tags" style="width: 20%" :options="options" />
  </div>
</template>

<script lang="ts" setup>
import { Button, Input, Select } from "ant-design-vue";
import { useRouter } from "vue-router";
// import { useUserStore } from "/@/store/modules/user";
import { useProhibitCopy } from "/@/hooks/event/useProhibitCopy";
const options = [...Array(25)].map((_, i) => ({
  value: (i + 10).toString(36) + (i + 1),
}));
const router = useRouter();
useProhibitCopy();
const go = () => {
  router.push("/dashboard/index2");
};
</script>
