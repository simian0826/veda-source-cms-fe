<template>
  <div>
    <div class="font-size-[20px] mb-4">HeroSection Configuration</div>
    <!-- form  -->
    <div class="p-4 bg-white flex w-full">
      <Spin wrapperClassName="w-full" :spinning="loading">
        <Form
          name="basic"
          class="w-full p-4"
          :label-col="{ style: { width: '150px' } }"
          :model="formState"
          @finish="handleFinish"
        >
          <Card
            v-for="(item, index) in formState"
            :key="index"
            class="mb-4 px-0 pb-0"
            :title="item.module"
          >
            <!-- hero header -->
            <FormItem
              :name="[index, 'header']"
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
              :name="[index, 'content']"
              label="content"
              :rules="[
                {
                  required: true,
                  message: 'content can not be empty',
                  trigger: ['blur', 'change'],
                },
              ]"
            >
              <Textarea
                v-model:value="item.content"
                placeholder="please enter"
              />
            </FormItem>
            <FormItem label="hero background" :name="[index, 'background']">
              <Upload
                :headers="uploadHeader"
                v-model:file-list="backgrounds[item.module]"
                :action="Api.AntUpload"
                @change="
                  (params) => {
                    handleFileChange(params, item.module);
                  }
                "
                list-type="picture-card"
              >
                <div v-if="item.background.length === 0">
                  <PlusOutlined />
                  <div style="margin-top: 8px">Upload</div>
                </div>
              </Upload>
            </FormItem>
          </Card>
          <FormItem>
            <div class="w-full flex justify-end">
              <Button type="primary" html-type="submit">Submit</Button>
            </div>
          </FormItem>
        </Form>
      </Spin>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PlusOutlined } from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";
import {
  Form,
  Card,
  FormItem,
  Input,
  Upload,
  Textarea,
  Button,
  Spin,
  message,
} from "ant-design-vue";
import { getHeroSectionsApi, updateHeroSectionApi } from "/@/api";
import type { HeroSection, SystemModule } from "/@/api/model/baseModel";
import type { UploadChangeParam, UploadProps } from "ant-design-vue";
import { Api } from "/@/api";
import { useUserStore } from "/@/store/modules/user";
import { convertImageUrlToUploadParam } from "/@/utils/index";

type ModuleUploadProps = {
  [key in SystemModule]?: UploadProps["fileList"];
};

const userStore = useUserStore();

const uploadHeader = {
  Authorization: userStore.getToken,
};
const formState = ref<HeroSection[]>();
const loading = ref(false);
const backgrounds = ref<ModuleUploadProps>({} as ModuleUploadProps);

const handleFileChange = (params: UploadChangeParam, type: SystemModule) => {
  console.log(params);
  const { file, fileList } = params;
  if (file.status === "done" || file.status === "removed") {
    console.log(backgrounds.value);

    let heroSection = formState.value?.find((item) => item.module === type);
    if (heroSection) {
      formState.value?.forEach((item, index) => {
        if (item.module === type && formState.value) {
          formState.value[index].background = "";
          if (fileList.length > 0) {
            fileList.forEach((item) => {
              let fileUrl = "";
              if (item.url) {
                fileUrl = item.url;
              } else {
                fileUrl = item.response.data[0].url;
              }
              heroSection.background = fileUrl;
            });
          }
          formState.value[index] = heroSection;
        }
      });
    }
  }
  // const formData = new FormData();
  // formData.append("file", file);
  // console.log(formData, "formData");
};
onMounted(async () => {
  try {
    loading.value = true;
    const res = await getHeroSectionsApi();
    if (res) {
      formState.value = res;

      if (formState.value.length > 0) {
        formState.value.forEach((item) => {
          backgrounds.value[item.module] = convertImageUrlToUploadParam(
            item.background,
          );
        });
      }
      console.log(backgrounds.value);
      loading.value = false;
    }
  } catch (error) {
    console.error("getHeroSections error", error);
  } finally {
    loading.value = false;
  }
});

const handleFinish = async () => {
  if (!formState.value) {
    return;
  }
  console.log(formState.value, "form data ");

  try {
    loading.value = true;
    const res = await updateHeroSectionApi(formState.value);
    if (res) {
      message.success("Update successfully");
    }
  } catch (error) {
    message.error("Update failed");
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="less" scoped></style>
