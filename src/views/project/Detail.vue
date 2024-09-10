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
          <FormItem label="Title" name="title">
            <Input v-model:value="formState.title" placeholder="please enter" />
          </FormItem>
          <FormItem label="Subtitle" name="subtitle">
            <Input
              v-model:value="formState.subtitle"
              placeholder="please enter"
            />
          </FormItem>
          <FormItem label="Type" name="type">
            <Radio.Group
              v-model:value="formState.type"
              button-style="solid"
              @change="typeChangeHandler"
            >
              <Radio.Button value="completed">Completed</Radio.Button>
              <Radio.Button value="onGoing">OnGoing</Radio.Button>
            </Radio.Group>
          </FormItem>
          <FormItem label="Location" name="location">
            <Input
              v-model:value="formState.location"
              placeholder="please enter"
            />
          </FormItem>
          <FormItem label="Description" name="description">
            <Textarea
              v-model:value="formState.description"
              placeholder="please enter"
            />
          </FormItem>
          <FormItem label="Project Images" name="projectImages">
            <Upload
              :headers="uploadHeader"
              v-model:file-list="formState.projectImages"
              :action="Api.AntUpload"
              list-type="picture-card"
            >
              <div
                v-if="
                  formState.projectImages && formState.projectImages.length < 3
                "
              >
                <plus-outlined />
                <div style="margin-top: 8px">Upload</div>
              </div>
            </Upload>
          </FormItem>

          <FormItem name="materials" label="Materials">
            <Row :gutter="[16, 24]">
              <Col
                :span="6"
                :key="index"
                v-for="(item, index) in formState.materials"
              >
                <Card>
                  <FormItem
                    :name="['materials', index, 'title']"
                    :rules="{
                      required: true,
                      message: 'Missing title',
                    }"
                  >
                    <div class="mb-1 color-bluegray500">Title</div>

                    <Input
                      v-model:value="item.title"
                      placeholder="please enter"
                    />
                  </FormItem>
                  <FormItem
                    :name="['materials', index, 'subtitle']"
                    :rules="{
                      required: true,
                      message: 'Missing subtitle',
                    }"
                  >
                    <div class="mb-1 color-bluegray500">Subtitle</div>

                    <Input
                      v-model:value="item.subtitle"
                      placeholder="please enter"
                    />
                  </FormItem>
                  <FormItem
                    :name="['materials', index, 'taxType']"
                    :rules="{
                      required: true,
                      message: 'Missing taxType',
                    }"
                  >
                    <div class="mb-1 color-bluegray500">Tax Type</div>

                    <Input
                      v-model:value="item.taxType"
                      placeholder="please enter"
                    />
                  </FormItem>
                  <FormItem
                    :name="['materials', index, 'image']"
                    :rules="{
                      required: true,
                      message: 'Missing image',
                    }"
                  >
                    <div class="mb-1 color-bluegray500">Image</div>

                    <Upload
                      :headers="uploadHeader"
                      v-model:file-list="item.image"
                      :action="Api.AntUpload"
                      list-type="picture-card"
                      :max-count="1"
                    >
                      <div v-if="item.image && item.image.length < 1">
                        <PlusOutlined />
                        <div style="margin-top: 8px">Upload</div>
                      </div>
                    </Upload>
                  </FormItem>

                  <template #actions v-if="mode !== 'detail'">
                    <DeleteOutlined
                      key="delete"
                      @click="handleDeleteMaterial(index)"
                    />
                  </template>
                </Card>
              </Col>
              <Col :span="6" v-if="formState.materials.length < 7">
                <Card
                  class="card-container"
                  hoverable
                  :bodyStyle="{ width: '100%', height: '100%' }"
                  @click="addNewMaterial"
                >
                  <div class="add-card">
                    <PlusOutlined />
                  </div>
                </Card>
              </Col>
            </Row>
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
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
import { computed, ref, onBeforeMount, createVNode } from "vue";
import { onMountedOrActivated } from "/@/hooks/core/onMountedOrActivated";
import type { Rule } from "ant-design-vue/es/form";
import {
  createProjectApi,
  updateProjectApi,
  deleteProjectApi,
  getProjectApi,
} from "/@/api/project";
import { Api } from "/@/api/product";
import type { Project, ProjectVO, ProjectMaterial } from "/@/api/project/model";
import {
  Form,
  Card,
  FormItem,
  Input,
  Upload,
  Textarea,
  Button,
  message,
  Modal,
  Radio,
  Row,
  Col,
  Spin,
} from "ant-design-vue";
import { useUserStore } from "/@/store/modules/user";
import {
  convertImageUrlToUploadParam,
  convertImageUploadParamToUrl,
} from "/@/utils/index";
const userStore = useUserStore();
const uploadHeader = {
  Authorization: userStore.getToken,
};
const route = useRoute();
const router = useRouter();

const mode = ref(route.query.mode);

const formState = ref<ProjectVO>({
  title: "",
  subtitle: "",
  location: "",
  type: "completed",
  description: "",
  projectImages: [],
  materials: [],
});

const loading = ref(false);
const operationLoading = ref(false);
const initFormHandler = async () => {
  const { id } = route.query;
  try {
    loading.value = true;
    const res = await getProjectApi(Number(id));
    formState.value = {
      ...res,
      projectImages: convertImageUrlToUploadParam(res.projectImages),
      materials: res.materials.map((item) => {
        return {
          ...item,
          image: convertImageUrlToUploadParam(item.image),
        };
      }),
    };
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const typeChangeHandler = (e) => {
  console.log(e.target.value);
  formState.value.type = e.target.value;
};

const projectImagesValidator = async (_rule, value) => {
  if (value.length != 3) {
    return Promise.reject("Project images must be 3");
  }
  return Promise.resolve();
};

const materialsValidator = async (_rule, value) => {
  if (value.length < 1) {
    return Promise.reject("Project materials can not be empty");
  }
  return Promise.resolve();
};

const rules: Record<string, Rule[]> = {
  title: [
    {
      required: true,
      message: "project title can not be empty",
      trigger: "change",
    },
  ],
  subtitle: [
    {
      required: true,
      message: "project subtitle can not be empty",
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
  location: [
    {
      required: true,
      message: "product description can not be empty",
      trigger: "change",
    },
  ],

  projectImages: [
    {
      type: "array",
      required: true,
      trigger: "change",
      validator: projectImagesValidator,
    },
  ],
  materials: [
    {
      type: "array",
      required: true,
      trigger: "change",
      validator: materialsValidator,
    },
  ],
};

const computedTitle = computed(() => {
  switch (mode.value) {
    case "add":
      return "Add Project";
    case "detail":
      return "Project Detail";
    case "edit":
      return "Update project";
    default:
      return "";
  }
});

const addNewMaterial = () => {
  formState.value.materials.push({
    title: "",
    subtitle: "",
    taxType: "",
    image: [],
  });
};

const handleDeleteMaterial = (index) => {
  formState.value.materials.splice(index, 1);
};

// submit
const handleFinish = async () => {
  let res;
  const params: Project = {
    ...formState.value,
    projectImages: convertImageUploadParamToUrl(
      formState.value?.projectImages,
    ) as string[],
    materials: formState.value.materials.map((item) => {
      return {
        ...item,
        image: convertImageUploadParamToUrl(item.image),
      } as ProjectMaterial;
    }),
  };

  operationLoading.value = true;
  try {
    if (mode.value === "add") {
      res = await createProjectApi(params);
    }
    if (mode.value === "edit") {
      res = await updateProjectApi(params);
    }
    if (res) {
      message.success(mode.value + " project successfully");
      router.push({
        path: "/project",
        replace: true,
      });
    } else {
      message.error(mode.value + "project failed");
    }
  } catch (e) {
    console.error(e);
  } finally {
    operationLoading.value = false;
  }
};

const handleDelete = () => {
  Modal.confirm({
    title: "Warning?",
    icon: createVNode(ExclamationCircleOutlined),
    content: "Are you sure you want to delete this project?",
    okButtonProps: {
      loading: operationLoading.value,
    },
    onOk: async () => {
      const { id } = route.query;
      try {
        operationLoading.value = true;
        const res = await deleteProjectApi(Number(id));
        if (res) {
          message.success("Delete project successfully");
          router.push({
            path: "/product",
            replace: true,
          });
        } else {
          message.error("Delete project failed");
        }
      } catch (e) {
        console.error(e);
      } finally {
        operationLoading.value = false;
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onCancel() {},
  });
};

onBeforeMount(async () => {});
onMountedOrActivated(async () => {
  if (mode.value !== "add") {
    initFormHandler();
  }
});
</script>

<style lang="less" scoped>
.card-container {
  height: 365px;

  .add-card {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 100px;
    color: #666;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      color: @primary-color;
    }
  }
}
</style>
