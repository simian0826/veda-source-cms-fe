<template>
  <Header
    class="flex flex-justify-end flex-items-center"
    style="background: #fff"
  >
    <Dropdown
      :trigger="['click']"
      placement="bottom"
      :arrow="{ pointAtCenter: true }"
    >
      <div class="user-dropdown-container">
        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
        <span class="ml-2">
          {{ userInfo.username }}
        </span>
      </div>

      <template #overlay>
        <AntMenu @click="clickMenuItem">
          <!-- <AntMenu.Item :key="MenuKeyEnum.USER_INFO">
            <UserOutlined />
            <span class="ml-2">用户信息</span>
          </AntMenu.Item>
          <AntMenu.Item :key="MenuKeyEnum.ROLE_SWITCH">
            <UserSwitchOutlined />
            <span class="ml-2">切换角色</span>
          </AntMenu.Item> -->
          <AntMenu.Item :key="MenuKeyEnum.LOGOUT">
            <LogoutOutlined />
            <span class="ml-2">Logout</span>
          </AntMenu.Item>
        </AntMenu>
      </template>
    </Dropdown>
  </Header>
</template>

<script setup lang="ts">
import {
  LogoutOutlined,
  // UserOutlined,
  // UserSwitchOutlined,
} from "@ant-design/icons-vue";
import { useUserStore } from "/@/store/modules/user";
import { Layout, Avatar, Dropdown, Menu as AntMenu } from "ant-design-vue";
import { router } from "/@/router";
enum MenuKeyEnum {
  LOGOUT = "logout",
  ROLE_SWITCH = "roleSwitch",
  USER_INFO = "userInfo",
}
const { Header } = Layout;
const userStore = useUserStore();
const userInfo = userStore.fetchUserInfoAction();

//  login out
function handleLoginOut() {
  userStore.confirmLoginOut();
}

function handleRoleSwitch() {
  userStore.switchRoleAction();
}

function handleUserInfo() {
  router.push("/sys/center/index");
}

//
function clickMenuItem({ key }) {
  switch (key) {
    case MenuKeyEnum.LOGOUT: {
      handleLoginOut();
      break;
    }
    case MenuKeyEnum.ROLE_SWITCH: {
      handleRoleSwitch();
      break;
    }
    case MenuKeyEnum.USER_INFO: {
      handleUserInfo();
      break;
    }
  }
}
</script>
<style scoped lang="less">
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  // background: #141414;
}

.user-dropdown-container {
  cursor: pointer;
}
</style>
