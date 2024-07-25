<template>
  <div>
    <div class="font-size-[20px] mb-4">hero update</div>
    <!-- form  -->
    <div class="p-4 bg-white flex">
      <Form
        name="basic"
        class="w-full p-4"
        :label-col="{ style: { width: '150px' } }"
        :model="formState"
        @finish="handleFinish"
      >
        <Card
          v-for="(item, index) in formState.heroes"
          :key="index"
          class="mb-4 px-0 pb-0"
          :title="item.module"
        >
          <!-- hero header -->
          <FormItem
            :name="['heroes', index, 'header']"
            label="header"
            :rules="[
              {
                required: true,
                message: 'header can not be empty',
                trigger: ['blur', 'change'],
              },
            ]"
          >
            <Input v-model:value="item.header" />
          </FormItem>
          <FormItem
            :name="['heroes', index, 'content']"
            label="content"
            :rules="[
              {
                required: true,
                message: 'content can not be empty',
                trigger: ['blur', 'change'],
              },
            ]"
          >
            <Textarea v-model:value="item.content" placeholder="please enter" />
          </FormItem>
          <FormItem
            label="hero background"
            :name="['heroes', index, 'background']"
          >
            <Upload
              v-model:file-list="item.background"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              list-type="picture-card"
            >
              <div v-if="item.background.length === 0">
                <PlusOutlined />
                <div style="margin-top: 8px">Upload</div>
              </div>
            </Upload>
          </FormItem>
        </Card>
        <FormItem :wrapper-col="{ offset: 8, span: 16 }">
          <Button type="primary" html-type="submit">Submit</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PlusOutlined } from "@ant-design/icons-vue";
import { onMounted, reactive } from "vue";
import {
  Form,
  Card,
  FormItem,
  Input,
  Upload,
  Textarea,
  Button,
} from "ant-design-vue";
const formState = reactive<any>({
  heroes: [],
});
onMounted(() => {
  setTimeout(() => {
    formState.heroes = [
      {
        id: 1,
        background: [],
        header: "Value engineering made hassle free",
        content:
          "Veda Sourcing is your one-stop solution for producing materials from all across the world",
        module: "home",
      },
      {
        id: 2,
        background: [],
        header: "Value engineering made hassle free project",
        content:
          "Veda Sourcing is your one-stop solution for producing materials from all across the world project",
        module: "project",
      },
      {
        id: 3,
        background: [],
        header: "Value engineering made hassle free product",
        content:
          "Veda Sourcing is your one-stop solution for producing materials from all across the world product",
        module: "product",
      },

      {
        id: 4,
        background: [],
        header: "Value engineering made hassle free about us",
        content:
          "Veda Sourcing is your one-stop solution for producing materials from all across the world about us",
        module: "about us",
      },
      {
        id: 5,
        background: [],
        header: "Value engineering made hassle free contact us",
        content:
          "Veda Sourcing is your one-stop solution for producing materials from all across the world contact us",
        module: "contact us",
      },
    ];
  }, 3000);
});

const handleFinish = async () => {
  console.log(formState.heroes, "form data ");
};
</script>

<style lang="less" scoped></style>
