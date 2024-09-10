<template>
  <div class="">
    <!-- title -->
    <h2>{{ computedTitle }}</h2>
    <div class="p-4 bg-white flex">
      <Spin wrapperClassName="w-full" :spinning="loading">
        <Form
          name="basic"
          class="w-full p-4"
          :rules="rules"
          :disabled="mode === 'detail'"
          :label-col="{ style: { width: '150px' } }"
          :model="formState"
          @finish="handleFinish"
        >
          <FormItem label="product name" name="name">
            <Input v-model:value="formState.name" placeholder="please enter" />
          </FormItem>
          <FormItem label="product category" name="category">
            <Select
              v-model:value="formState.category"
              :options="categoryOptions"
              @change="handleChangeCategory"
              placeholder="please select"
            />
          </FormItem>
          <FormItem label="product description" name="description">
            <Textarea
              v-model:value="formState.description"
              placeholder="please enter"
            />
          </FormItem>
          <FormItem label="product images" name="imgs">
            <Upload
              :headers="uploadHeader"
              v-model:file-list="imgList"
              :beforeUpload="beforeUploadHandler"
              :action="Api.AntUpload"
              list-type="picture-card"
              @change="
                (params) => {
                  handleFileChange(params, 'imgs');
                }
              "
            >
              <div v-if="imgList && imgList.length < 3">
                <plus-outlined />
                <div style="margin-top: 8px">Upload</div>
              </div>
            </Upload>
          </FormItem>
          <FormItem label="product certifacate" name="certificate">
            <Upload
              :headers="uploadHeader"
              v-model:file-list="certificationList"
              :action="Api.AntUpload"
              list-type="picture-card"
              @change="
                (params) => {
                  handleFileChange(params, 'certificate');
                }
              "
            >
              <div v-if="certificationList && certificationList.length < 3">
                <plus-outlined />
                <div style="margin-top: 8px">Upload</div>
              </div>
            </Upload>
          </FormItem>
          <FormItem
            v-for="(item, index) in formState.properties"
            :key="item.name"
            :name="['properties', index]"
            :label="item.name"
            :rules="[
              {
                type: 'array',
                required: true,
                message: 'please set at least one property',
                trigger: 'blur',
                validator: propertyValidator,
              },
            ]"
          >
            <PropertyTag
              v-model:items="item.items"
              :disabled="mode === 'detail'"
            />
          </FormItem>
          <Card
            v-for="(item, index) in formState.additionalProperties"
            :key="index"
            class="mb-4 px-0 py-4 pb-0"
          >
            <FormItem
              :name="['additionalProperties', index, 'name']"
              label="property name"
              :rules="[
                {
                  type: 'array',
                  required: true,
                  message: 'property name can not be empty',
                  trigger: 'change',
                  validator: addtionalPropertyNameValidator,
                },
              ]"
            >
              <Input v-model:value="item.name" class="w-[200px]" />
              <Button
                danger
                :icon="h(MinusCircleOutlined)"
                class="h-[36px] ml-4"
                @click="handleDeleteProperty(index)"
              />
            </FormItem>
            <FormItem
              label="property values"
              :name="['additionalProperties', index, 'items']"
              :rules="[
                {
                  required: true,
                  message: 'property item can not be empty',
                  trigger: 'blur',
                  validator: addtionalPropertyItemValidator,
                },
              ]"
            >
              <PropertyTag
                v-model:items="item.items"
                :disabled="mode === 'detail'"
              />
            </FormItem>
          </Card>
          <FormItem v-if="mode !== 'detail'">
            <Button @click="handleAddProperty">add new porperty</Button>
          </FormItem>
          <FormItem>
            <div class="w-full flex justify-end">
              <Button
                class="mr-2"
                v-if="mode !== 'detail'"
                type="primary"
                html-type="submit"
                :loading="operationLoading"
              >
                Submit
              </Button>
              <Button
                v-else
                :disabled="false"
                type="primary"
                @click="
                  () => {
                    mode = 'edit';
                  }
                "
                class="mr-2"
              >
                Edit
              </Button>
              <Button
                v-if="mode != 'add'"
                :disabled="false"
                class="mr-2"
                type="primary"
                danger
                @click="
                  () => {
                    handleDelete();
                  }
                "
              >
                Delete
              </Button>
              <Button
                class="mr-2"
                v-if="mode !== 'detail'"
                @click="
                  () => {
                    mode = 'detail';
                  }
                "
              >
                Detail
              </Button>
              <Button @click="router.go(-1)" :disabled="false">Go Back</Button>
            </div>
          </FormItem>
        </Form>
      </Spin>
    </div>
  </div>
</template>

<script lang="ts" setup>
// TODO: 详情，新增，编辑页面
import { useRoute, useRouter } from "vue-router";
import {
  PlusOutlined,
  MinusCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
import { computed, ref, h, onBeforeMount, createVNode } from "vue";
import { onMountedOrActivated } from "/@/hooks/core/onMountedOrActivated";
import PropertyTag from "./components/PropertyTag.vue";
import type { Rule } from "ant-design-vue/es/form";
import {
  getCategoryDictApi,
  getAllCategoryPropertiesApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,
  getProductApi,
} from "/@/api/product";
import { Api } from "/@/api/product";
import type { Dict } from "/@/api/model/baseModel";
import type { ProductDTO } from "/@/api/product/model";
import type { UploadChangeParam, UploadProps } from "ant-design-vue";
import {
  Form,
  Card,
  FormItem,
  Input,
  Select,
  Upload,
  Textarea,
  Button,
  message,
  Modal,
  Spin,
} from "ant-design-vue";
import { useUserStore } from "/@/store/modules/user";
import { convertImageUrlToUploadParam } from "/@/utils/index";

const userStore = useUserStore();
const uploadHeader = {
  Authorization: userStore.getToken,
};
const route = useRoute();
const router = useRouter();

const mode = ref(route.query.mode);

const loading = ref(false);
const operationLoading = ref(false);

const formState = ref<ProductDTO>({
  name: "",
  category: undefined,
  description: "",
  imgs: [],
  certificate: [],
  properties: [],
  additionalProperties: [],
});
const imgList = ref<UploadProps["fileList"]>([]);
const certificationList = ref<UploadProps["fileList"]>();
const initFormHandler = async () => {
  const { id } = route.query;
  try {
    loading.value = true;
    const res = await getProductApi(Number(id));
    formState.value = res;
    imgList.value = convertImageUrlToUploadParam(formState.value.imgs);

    certificationList.value = formState.value.certificate
      ? convertImageUrlToUploadParam(formState.value.certificate)
      : [];
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const imgsValidator = async (_rule, value) => {
  if (value.length != 3) {
    return Promise.reject("Product images must be 3");
  }
  return Promise.resolve();
};
const certificateValidator = async (_rule, value) => {
  if (value.length > 3) {
    return Promise.reject("Certification should be less than 3");
  }
  return Promise.resolve();
};

const propertyValidator = async (_rule, value) => {
  if (value.items.length === 0) {
    return Promise.reject("Please set at least one property");
  }
  return Promise.resolve();
};
const addtionalPropertyNameValidator = async (_rule, value) => {
  if (!value) {
    return Promise.reject("Please input the property name");
  } else {
    return Promise.resolve();
  }
};
const addtionalPropertyItemValidator = async (_rule, value) => {
  if (value.length === 0) {
    return Promise.reject("Please set at least one property");
  }
  return Promise.resolve();
};
const rules: Record<string, Rule[]> = {
  name: [
    {
      required: true,
      message: "product name can not be empty",
      trigger: "change",
    },
  ],
  category: [
    {
      required: true,
      message: "product category can not be empty",
      trigger: "change",
    },
  ],
  description: [
    {
      required: true,
      message: "product description can not be empty",
      trigger: "change",
    },
  ],
  properties: [
    {
      type: "array",
      required: true,
      message: "property name can not be empty",
      trigger: "change",
    },
  ],
  additionalProperties: [
    {
      type: "array",
      required: true,
      message: "property name can not be empty",
      trigger: "change",
    },
  ],
  imgs: [
    {
      type: "array",
      required: true,
      trigger: "change",
      validator: imgsValidator,
    },
  ],
  certificate: [
    {
      type: "array",

      required: true,
      message: "Product certification can not be empty",
      trigger: "change",
      validator: certificateValidator,
    },
  ],
};

const transferInfoToForm = (properties: any) => {
  properties.length > 0 &&
    properties.forEach((pro) => {
      let _str: any = [];
      pro.items.length &&
        pro.items.forEach((subPro) => {
          _str.push(subPro.value);
        });
      formState.value.properties.push({
        name: pro.name,
        items: _str,
      });
    });
};

const categoryOptions = ref<Dict[]>([]);
const categoryPropertiesMap = ref({});

// change properties by select category
const handleChangeCategory = (val) => {
  if (!val) return;
  const _proArr = categoryPropertiesMap.value[val];
  const _arr: any = [];
  _proArr.forEach((pro: string) => {
    _arr.push({
      name: pro,
      items: [],
    });
  });
  formState.value.properties = _arr;
};
// get all category properties
const getAllCategoryPropertiesMap = async () => {
  try {
    const res = await getAllCategoryPropertiesApi();
    categoryPropertiesMap.value = res;
  } catch (e) {
    console.error(e);
  }
};
// get dict options
const getOptions = async () => {
  const res = await getCategoryDictApi();
  categoryOptions.value = res || [];
};
// format property value
// const formatPropertyValue = (items: string[]) => {
//   let _arr: any = [];
//   items.forEach((value) => {
//     _arr.push({
//       label: value,
//       value: value,
//     });
//   });
// };
const computedTitle = computed(() => {
  switch (mode.value) {
    case "add":
      return "Add Product";
    case "detail":
      return "Product Detail";
    case "edit":
      return "Update Product";
    default:
      return "";
  }
});
const handleAddProperty = () => {
  formState.value.additionalProperties.push({
    name: "",
    items: [],
  });
};
// delete additional property
const handleDeleteProperty = (index) => {
  formState.value.additionalProperties.splice(index, 1);
};

const beforeUploadHandler = () => {
  console.log("beforeUploadHandler");
};
// file change
const handleFileChange = (
  params: UploadChangeParam,
  type: "imgs" | "certificate",
) => {
  console.log(params);
  const { file, fileList } = params;
  if (file.status === "done" || file.status === "removed") {
    formState.value[type] = [];

    if (fileList.length > 0) {
      fileList.forEach((item) => {
        let fileUrl = "";
        if (item.url) {
          fileUrl = item.url;
        } else {
          fileUrl = item.response.data[0].url;
        }
        formState.value[type]?.push(fileUrl);
      });
    }
  }
  // const formData = new FormData();
  // formData.append("file", file);
  // console.log(formData, "formData");
};
// submit
const handleFinish = async () => {
  try {
    operationLoading.value = true;
    let res;

    if (mode.value === "add") {
      res = await createProductApi(formState.value);
    }
    if (mode.value === "edit") {
      res = await updateProductApi(formState.value);
    }
    if (res) {
      message.success(mode.value + " product successfully");
      router.push({
        path: "/product",
        replace: true,
      });
    } else {
      message.error(mode.value + "product failed");
    }
  } catch (e) {
    message.error(mode.value + "product failed");

    console.error(e);
  } finally {
    operationLoading.value = false;
  }
};

const handleDelete = () => {
  Modal.confirm({
    title: "Warning?",
    icon: createVNode(ExclamationCircleOutlined),
    content: "Are you sure you want to delete this product?",
    okButtonProps: {
      loading: operationLoading.value,
    },
    onOk: async () => {
      const { id } = route.query;
      const res = await deleteProductApi(Number(id));
      if (res) {
        message.success("Delete product successfully");
        router.push({
          path: "/product",
          replace: true,
        });
      } else {
        message.error("Delete product failed");
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onCancel() {},
  });
};

onBeforeMount(async () => {});
onMountedOrActivated(async () => {
  await getOptions();
  await getAllCategoryPropertiesMap();

  transferInfoToForm(categoryPropertiesMap.value);
  if (mode.value !== "add") {
    initFormHandler();
  }
});
</script>

<style lang="less" scoped></style>
