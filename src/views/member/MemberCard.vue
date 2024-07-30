<template>
  <div
    class="flex flex-col justify-around h-50 w-50 user-card"
    :style="{ backgroundImage: `url(${userInfo?.background})` }"
  >
    <span>{{ userInfo?.name }}</span>
    <span>{{ userInfo?.desc }}</span>
    <div class="action-box">
      <span>delete</span>
      <span>udpate</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  userInfo: {
    type: Object,
  },
});
</script>

<style lang="less" scoped>
.user-card {
  background-color: sandybrown;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  &:hover {
    .action-box {
      display: block;
    }
  }
  .action-box {
    display: none;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    z-index: 99;
  }
}
</style>
