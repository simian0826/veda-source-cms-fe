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
          </AntMenu.Item>-->
          <AntMenu.Item :key="MenuKeyEnum.CHANGE_PASSWORD">
            <KeyOutlined />
            <span class="ml-2">Change Password</span>
          </AntMenu.Item>
          <AntMenu.Item :key="MenuKeyEnum.LOGOUT">
            <LogoutOutlined />
            <span class="ml-2">Logout</span>
          </AntMenu.Item>
        </AntMenu>
      </template>
    </Dropdown>

    <Modal
      v-model:open="modal"
      width="600px"
      title="Change Password"
      @ok="handlePasswordChangeConfirm"
    >
      <Form
        name="basic"
        ref="formRef"
        class="w-full p-4"
        :label-col="{ style: { width: '150px' } }"
        :model="form"
      >
        <FormItem
          name="oldPassword"
          label="Old Password"
          :rules="{
            required: true,
            message: 'Missing old password',
          }"
        >
          <InputPassword
            v-model:value="form.oldPassword"
            placeholder="please enter"
          />
        </FormItem>
        <FormItem
          name="confirmPassword"
          label="Confirm Password"
          :rules="{
            required: true,
            message: 'Missing confirmation password',
          }"
        >
          <InputPassword
            v-model:value="form.confirmPassword"
            placeholder="please enter"
          />
        </FormItem>
        <FormItem
          name="newPassword"
          label="New Password"
          :rules="{
            required: true,
            message: 'Missing new password',
          }"
        >
          <InputPassword
            v-model:value="form.newPassword"
            placeholder="please enter"
          />
        </FormItem>
      </Form>
    </Modal>
  </Header>
</template>

<script setup lang="ts">
import {
  LogoutOutlined,
  KeyOutlined,
  // UserOutlined,
  // UserSwitchOutlined,
} from "@ant-design/icons-vue";
import { useUserStore } from "/@/store/modules/user";
import {
  Layout,
  Avatar,
  Dropdown,
  Menu as AntMenu,
  Modal,
  Form,
  FormItem,
  InputPassword,
  message,
} from "ant-design-vue";
import { ref } from "vue";
import type { ChangePasswordDTO } from "/@/api/sys/model/userModel";
type ChangePasswordForm = ChangePasswordDTO & {
  confirmPassword: string;
};
enum MenuKeyEnum {
  LOGOUT = "logout",
  CHANGE_PASSWORD = "changePassword",
  USER_INFO = "userInfo",
}
const { Header } = Layout;
const userStore = useUserStore();
const userInfo = userStore.fetchUserInfoAction();

const modal = ref(false);
const form = ref<ChangePasswordForm>({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const formRef = ref();

//  login out
function handleLoginOut() {
  userStore.confirmLoginOut();
}

function handlePasswordChange() {
  modal.value = true;
}

function handlePasswordChangeConfirm() {
  // TODO: password change logic

  formRef.value
    .validate()
    .then(() => {
      if (form.value.newPassword !== form.value.confirmPassword) {
        message.error("Passwords do not match");
        return;
      }
      userStore.changePasswordAction({
        oldPassword: form.value.oldPassword,
        newPassword: form.value.newPassword,
      });
    })
    .catch((error) => {
      console.log("error", error);
    });
}

//
function clickMenuItem({ key }) {
  switch (key) {
    case MenuKeyEnum.LOGOUT: {
      handleLoginOut();
      break;
    }
    case MenuKeyEnum.CHANGE_PASSWORD: {
      handlePasswordChange();
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
