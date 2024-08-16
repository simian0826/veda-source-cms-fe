<template>
  <div class="">
    <!-- title -->
    <h2>{{ computedTitle }}</h2>
    <div class="p-4 bg-white flex">
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
            action="/veda-source/storage/uploadFileByAntd"
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
            action="/veda-source/storage/uploadFileByAntd"
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
              :icon="h(MinusCircleOutlined)"
              class="h-[36px] ml-4"
              @click="handleDeleteProperty(index)"
            >
              delete
            </Button>
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
        <FormItem>
          <Button @click="handleAddProperty">add new porperty</Button>
        </FormItem>
        <FormItem :wrapper-col="{ offset: 8, span: 16 }">
          <Button v-if="mode !== 'detail'" type="primary" html-type="submit">
            Submit
          </Button>
          <Button v-else type="primary">Edit</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script lang="ts" setup>
// TODO: 详情，新增，编辑页面
import { useRoute } from "vue-router";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons-vue";
import { computed, ref, h, onBeforeMount } from "vue";
import { onMountedOrActivated } from "/@/hooks/core/onMountedOrActivated";
import PropertyTag from "./components/PropertyTag.vue";
import type { Rule } from "ant-design-vue/es/form";
import {
  getCategoryDictApi,
  getAllCategoryPropertiesApi,
  createProductApi,
  getProductApi,
} from "/@/api/product";
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
} from "ant-design-vue";
import { useUserStore } from "/@/store/modules/user";

const userStore = useUserStore();
const uploadHeader = {
  Authorization: userStore.getToken,
};
const route = useRoute();
const mode = route.query.mode;

const formState = ref<ProductDTO>({
  name: "",
  category: "",
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

  const res = await getProductApi(Number(id));
  formState.value = res;

  imgList.value = formState.value.imgs.map((item, index) => ({
    uid: String(index),
    name: item.substring(item.lastIndexOf("/") + 1),
    status: "done",
    url: item,
    thumbUrl: item,
  }));

  certificationList.value = formState.value.certificate.map((item, index) => ({
    uid: String(index),
    name: item.substring(item.lastIndexOf("/") + 1),
    status: "done",
    url: item,
    thumbUrl: item,
  }));
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
  console.log(value);

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
  console.log(formState.value, "formState");
};

const categoryOptions = ref<Dict[]>([]);
const categoryPropertiesMap = ref({});

// change properties by select category
const handleChangeCategory = (val) => {
  console.log(val, categoryPropertiesMap.value[val], "val");
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
  console.log(_proArr, "xxx");
};
// get all category properties
const getAllCategoryPropertiesMap = async () => {
  const res = await getAllCategoryPropertiesApi();
  console.log(res, "properties res");
  categoryPropertiesMap.value = res;
};
// get dict options
const getOptions = async () => {
  const res = await getCategoryDictApi();
  console.log("category dict res", res);
  categoryOptions.value = res || [];
};
// format property value
const formatPropertyValue = (items: string[]) => {
  let _arr: any = [];
  items.forEach((value) => {
    _arr.push({
      label: value,
      value: value,
    });
  });
};
const computedTitle = computed(() => {
  switch (mode) {
    case "add":
      return "new product";
    case "detail":
      return "product detail";
    case "edit":
      return "update product";
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
        formState.value[type].push(fileUrl);
      });
    }
  }
  // const formData = new FormData();
  // formData.append("file", file);
  // console.log(formData, "formData");
};
// submit
const handleFinish = async () => {
  console.log(formState.value, "success");

  // const requestParams: ProductDTO = {
  //   ...formState,
  //   additionalProperties: formState.additionalProperties.map((property) => {
  //     return {
  //       name: property.name,
  //       items: property.items.map((item) => {
  //         return {
  //           label: item,
  //           value: item,
  //         };
  //       }),
  //     };
  //   }) as unknown as ProductProperty[],
  //   properties: formState.properties.map((property) => {
  //     return {
  //       name: property.name,
  //       items: property.items.map((item) => {
  //         return {
  //           label: item,
  //           value: item,
  //         };
  //       }),
  //     };
  //   }) as unknown as ProductProperty[],
  // };
  let res;
  if (mode === "add") {
    res = await createProductApi(formState.value);
  }
  if (mode === "edit") {
  }
  if (res) {
    message.success(mode + " product successfully");
  } else {
    message.error(mode + "product successfully");
  }

  console.log(res, "res");
};

onBeforeMount(async () => {});
onMountedOrActivated(async () => {
  await getOptions();
  await getAllCategoryPropertiesMap();

  transferInfoToForm(categoryPropertiesMap.value);
  if (mode !== "add") {
    initFormHandler();
  }
});
</script>

<style lang="less" scoped></style>
../../api/product
