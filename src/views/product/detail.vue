<template>
  <div class="">
    <!-- title -->
    <h2>{{ computedTitle }}</h2>
    <div class="p-4 bg-white flex">
      <Form
        name="basic"
        class="w-full p-4"
        :rules="rules"
        :disabled="mode === 'view'"
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
        <FormItem label="product images" name="imgList">
          <Upload
            v-model:file-list="imgList"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            list-type="picture-card"
            @change="handleFileChange"
          >
            <div v-if="imgList.length < 3">
              <plus-outlined />
              <div style="margin-top: 8px">Upload</div>
            </div>
          </Upload>
        </FormItem>
        <FormItem label="product certifacate" name="certificationList">
          <Upload
            v-model:file-list="certificationList"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            list-type="picture-card"
            @change="handleFileChange"
          >
            <div v-if="certificationList.length < 3">
              <plus-outlined />
              <div style="margin-top: 8px">Upload</div>
            </div>
          </Upload>
        </FormItem>
        <FormItem
          v-for="(item, index) in formState.properties"
          :key="item.label"
          :name="['properties', index, 'items']"
          :label="item.label"
          :rules="[
            {
              type: 'array',
              required: true,
              message: 'please set at least one property',
              trigger: 'blur',
            },
          ]"
        >
          <PropertyTag v-model:items="item.items" :disabled="mode === 'view'" />
        </FormItem>
        <Card
          v-for="(item, index) in formState.additionalProperties"
          :key="index"
          class="mb-4 px-0 py-4 pb-0"
        >
          <FormItem
            :name="['additionalProperties', index, 'label']"
            :label="`property name ${index + 1}`"
            :rules="[
              {
                type: 'array',
                required: true,
                message: 'property name can not be empty',
                trigger: 'blur',
              },
            ]"
          >
            <Input v-model:value="item.label" class="w-[200px]" />
            <Button
              :icon="h(MinusCircleOutlined)"
              class="h-[36px] ml-4"
              @click="handleDeleteProperty(index)"
            >
              delete
            </Button>
          </FormItem>
          <FormItem
            :label="`property values ${index + 1}`"
            :name="['additionalProperties', index, 'items']"
            :rules="[
              {
                required: true,
                message: 'property values can not be empty',
                trigger: 'change',
              },
            ]"
          >
            <PropertyTag
              v-model:items="item.items"
              :disabled="mode === 'view'"
            />
          </FormItem>
        </Card>
        <FormItem>
          <Button @click="handleAddProperty">add new porperty</Button>
        </FormItem>
        <FormItem :wrapper-col="{ offset: 8, span: 16 }">
          <Button type="primary" html-type="submit">Submit</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script lang="ts" setup>
// TODO: 详情，新增，编辑页面
import { useRoute } from "vue-router";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons-vue";
import { computed, ref, reactive, h } from "vue";
import { onMountedOrActivated } from "/@/hooks/core/onMountedOrActivated";
import PropertyTag from "./components/PropertyTag.vue";
import type { Rule } from "ant-design-vue/es/form";
import {
  getCategoryDict,
  getAllCategoryProperties,
} from "/@/api/product/product";
import {
  Form,
  Card,
  FormItem,
  Input,
  Select,
  Upload,
  Textarea,
  Button,
} from "ant-design-vue";
const route = useRoute();
const mode = route.query.mode;
console.log(route, "router");
// file validator
const imgValidator = async (_rule: Rule, _value: string[]) => {
  if (imgList.value.length !== 3) {
    return Promise.reject("please upload three pictures");
  } else {
    return Promise.resolve();
  }
};
// certification validator
const certificationValidator = async (_rule: Rule, value: string[]) => {
  if (certificationList.value.length !== 3) {
    return Promise.reject("please upload three pictures");
  } else {
    return Promise.resolve();
  }
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
  // imgList: [
  //   {
  //     required: true,
  //     validator: imgValidator,
  //   },
  // ],
  // certificationList: [
  //   {
  //     required: true,
  //     validator: certificationValidator,
  //   },
  // ],
};

const transferInfoToForm = (properties: any) => {
  properties.forEach((pro) => {
    let _str: any = [];
    pro.items.length &&
      pro.items.forEach((subPro) => {
        _str.push(subPro.value);
      });
    formState.properties.push({
      label: pro.name,
      items: _str,
    });
  });
  console.log(formState, "formState");
};
const formState = reactive<any>({
  name: "",
  category: "",
  description: "",
  properties: [],
  additionalProperties: [],
});
const imgList = ref([]);
const certificationList = ref([]);
const categoryOptions = ref([]);
const categoryPropertiesMap = ref({});
onMountedOrActivated(async () => {
  await getOptions();
  await getAllCategoryPropertiesMap();
  transferInfoToForm(categoryPropertiesMap.value);
});

// change properties by select category
const handleChangeCategory = (val) => {
  console.log(val, categoryPropertiesMap.value[val], "val");
  if (!val) return;
  const _proArr = categoryPropertiesMap.value[val];
  const _arr: any = [];
  _proArr.forEach((pro: string) => {
    _arr.push({
      label: pro,
      items: [],
    });
  });
  formState.properties = _arr;
  console.log(_proArr, "xxx");
};
// get all category properties
const getAllCategoryPropertiesMap = async () => {
  const res = await getAllCategoryProperties();
  console.log(res, "properties res");
  categoryPropertiesMap.value = res;
};
// get dict options
const getOptions = async () => {
  const res = await getCategoryDict();
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
    case "view":
      return "product detail";
    case "edit":
      return "update product";
    default:
      return "";
  }
});
const handleAddProperty = () => {
  formState.additionalProperties.push({
    label: "",
    items: [],
  });
};
// delete additional property
const handleDeleteProperty = (index) => {
  formState.additionalProperties.splice(index, 1);
};
// file change
const handleFileChange = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  console.log(formData, "formData");
};
// submit
const handleFinish = () => {
  console.log(formState, "success");
};
</script>

<style lang="less" scoped></style>
