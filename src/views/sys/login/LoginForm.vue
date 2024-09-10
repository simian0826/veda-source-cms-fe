<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="getShow"
    @keypress.enter="handleLogin"
  >
    <FormItem name="account" class="enter-x">
      <Input
        v-model:value="formData.account"
        :placeholder="'account'"
        class="fix-auto-fill"
      >
        <template #prefix>
          <UserOutlined />
        </template>
      </Input>
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        visibilityToggle
        v-model:value="formData.password"
        :placeholder="'password'"
      >
        <template #prefix>
          <LockOutlined />
        </template>
      </InputPassword>
    </FormItem>

    <!-- <ARow class="enter-x">
      <ACol :span="12">
        <FormItem class="text-left">
          <Checkbox v-model:checked="rememberMe" size="small">记住我</Checkbox>
        </FormItem>
      </ACol>
      <ACol :span="12">
        <FormItem :style="{ 'text-align': 'right' }">
          <Button
            type="link"
            size="small"
            @click="setLoginState(LoginStateEnum.RESET_PASSWORD)"
          >
            忘记密码?
          </Button>
        </FormItem>
      </ACol>
    </ARow> -->

    <FormItem class="enter-x">
      <Button
        type="primary"
        size="large"
        block
        @click="handleLogin"
        :loading="loading"
      >
        LOGIN
      </Button>
      <!-- <Button size="large" class="mt-4 enter-x" block @click="handleRegister">
      </Button> -->
    </FormItem>
  </Form>
</template>
<script lang="ts" setup>
import { reactive, ref, toRaw, unref, computed } from "vue";

import { Form, Input, /** Row, Col, Checkbox, */ Button } from "ant-design-vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";

import LoginFormTitle from "./LoginFormTitle.vue";

import { useMessage } from "/@/hooks/web/useMessage";

import { useUserStore } from "/@/store/modules/user";
import {
  LoginStateEnum,
  useLoginState,
  useFormRules,
  useFormValid,
} from "./useLogin";
import { useDesign } from "/@/hooks/web/useDesign";
//import { onKeyStroke } from '@vueuse/core';

// const ACol = Col;
// const ARow = Row;
const FormItem = Form.Item;
const InputPassword = Input.Password;
const { notification, createErrorModal } = useMessage();
const { prefixCls } = useDesign("login");
const userStore = useUserStore();

const { /* setLoginState */ getLoginState } = useLoginState();
const { getFormRules } = useFormRules();

const formRef = ref();
const loading = ref(false);
// const rememberMe = ref(false);

const formData = reactive({
  account: "admin",
  password: "123456",
});

const { validForm } = useFormValid(formRef);

//onKeyStroke('Enter', handleLogin);

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

async function handleLogin() {
  const data = await validForm();
  if (!data) return;
  try {
    loading.value = true;
    const result = await userStore.login(
      toRaw({
        password: data.password,
        username: data.account,
        mode: "none", //不要默认的错误提示
      }),
    );
    if (result) {
      notification.success({
        message: "LOGIN was successfully",
        description: `Welcome: ${userStore.getUserInfo.username}`,
        duration: 3,
      });
    }
  } catch (error: any) {
    createErrorModal({
      title: "ERROR",
      content: error.message || "NETWORK ERROR!",
      getContainer: () =>
        document.body.querySelector(`.${prefixCls}`) || document.body,
    });
  } finally {
    loading.value = false;
  }
}
</script>
