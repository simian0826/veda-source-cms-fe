<template>
  <div>
    <div class="font-size-[20px] mb-4">General Settings</div>
    <!-- form  -->
    <div class="p-4 bg-white flex w-full">
      <Tabs
        class="w-full"
        v-model:activeKey="activeKey"
        @change="handleTabChange"
      >
        <TabPane :key="TabType.Home" tab="Home">
          <Spin wrapperClassName="w-full" :spinning="loading">
            <Form
              v-if="homePageContent"
              name="basic"
              class="w-full p-4"
              :label-col="{ style: { width: '150px' } }"
              :model="homePageContent"
              @finish="handleHomeFinish"
            >
              <FormItem name="processItems" label="Process Items">
                <Row :gutter="[16, 24]">
                  <template v-if="homePageContent.processItems">
                    <Col
                      :span="6"
                      :key="index"
                      v-for="(item, index) in homePageContent.processItems"
                    >
                      <Card>
                        <FormItem
                          :name="['processItems', index, 'title']"
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
                          :name="['processItems', index, 'detailText']"
                          :rules="{
                            required: true,
                            message: 'Missing description',
                          }"
                        >
                          <div class="mb-1 color-bluegray500">Description</div>

                          <Textarea
                            v-model:value="item.detailText"
                            placeholder="please enter"
                            :autoSize="{ minRows: 4, maxRows: 4 }"
                          />
                        </FormItem>

                        <FormItem
                          :name="['processItems', index, 'image']"
                          :rules="{
                            type: 'array',
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

                        <template #actions>
                          <DeleteOutlined
                            key="delete"
                            @click="handleDeleteProcessItem(index)"
                          />
                        </template>
                      </Card>
                    </Col>
                    <Col
                      :span="6"
                      v-if="homePageContent.processItems.length < 3"
                    >
                      <Card
                        class="card-container !h-full"
                        hoverable
                        :bodyStyle="{ width: '100%', height: '100%' }"
                        @click="addNewProcessItem"
                      >
                        <div class="add-card">
                          <PlusOutlined />
                        </div>
                      </Card>
                    </Col>
                  </template>
                </Row>
              </FormItem>

              <FormItem name="introductionItems" label="Introduction Items">
                <Row :gutter="[16, 24]">
                  <template v-if="homePageContent.introductionItems">
                    <Col
                      :span="12"
                      :key="index"
                      v-for="(item, index) in homePageContent.introductionItems"
                    >
                      <Card>
                        <FormItem
                          :name="['introductionItems', index, 'title']"
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
                          :name="['introductionItems', index, 'subTitle']"
                          :rules="{
                            required: true,
                            message: 'Missing subTitle',
                          }"
                        >
                          <div class="mb-1 color-bluegray500">SubTitle</div>
                          <Input
                            v-model:value="item.subTitle"
                            placeholder="please enter"
                          />
                        </FormItem>
                        <FormItem
                          :name="['introductionItems', index, 'description']"
                          :rules="{
                            required: true,
                            message: 'Missing description',
                          }"
                        >
                          <div class="mb-1 color-bluegray500">Description</div>

                          <Textarea
                            v-model:value="item.description"
                            placeholder="please enter"
                            :autoSize="{ minRows: 4, maxRows: 4 }"
                          />
                        </FormItem>

                        <Row :gutter="[16, 24]">
                          <Col :span="12">
                            <FormItem
                              :name="['introductionItems', index, 'image']"
                              :rules="{
                                type: 'array',
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
                          </Col>
                          <Col :span="12">
                            <div class="mb-1 color-bluegray500">Product</div>
                            <FormItem
                              :name="['introductionItems', index, 'product']"
                              :rules="{
                                required: true,
                                message: 'Missing product',
                              }"
                            >
                              <Card
                                v-if="item.product"
                                class="!h-full"
                                :bodyStyle="{ width: '100%', height: '100%' }"
                              >
                                <div class="flex align-center">
                                  <Image
                                    :width="100"
                                    :src="item.product.imgs[0]"
                                  />
                                  <div class="ml-2 flex-1">
                                    <div class="font-semibold mb-2">
                                      {{ item.product.name }}
                                    </div>
                                    <div>{{ item.product.category }}</div>
                                  </div>
                                  <MinusCircleOutlined
                                    @click="handleDeleteProduct(index)"
                                    class="cursor-pointer color-red400"
                                  />
                                </div>
                              </Card>
                              <Card
                                v-else
                                class="!h-full"
                                hoverable
                                :bodyStyle="{ width: '100%', height: '100%' }"
                                @click="handleOpenProductModal(index)"
                              >
                                <div class="add-card text-center">
                                  <PlusOutlined />
                                </div>
                              </Card>
                            </FormItem>
                          </Col>
                        </Row>

                        <Row :gutter="[16, 24]">
                          <Col :span="12">
                            <FormItem
                              :name="['introductionItems', index, 'infoLeft']"
                              :rules="{
                                required: true,
                                message: 'Missing Left Info',
                              }"
                            >
                              <div class="w-full text-center">Left Info</div>
                              <FormItem
                                :name="[
                                  'introductionItems',
                                  index,
                                  'infoLeft',
                                  'info',
                                ]"
                                :rules="{
                                  required: true,
                                  message: 'Missing Info',
                                }"
                              >
                                <div class="mb-1 color-bluegray500">Info</div>
                                <Input
                                  v-model:value="item.infoLeft.info"
                                  placeholder="please enter"
                                />
                              </FormItem>
                              <FormItem
                                :name="[
                                  'introductionItems',
                                  index,
                                  'infoLeft',
                                  'supplementary',
                                ]"
                                :rules="{
                                  required: true,
                                  message: 'Missing supplementary',
                                }"
                              >
                                <div class="mb-1 color-bluegray500">
                                  Supplementary
                                </div>
                                <Input
                                  v-model:value="item.infoLeft.supplementary"
                                  placeholder="please enter"
                                />
                              </FormItem>
                            </FormItem>
                          </Col>
                          <Col :span="12">
                            <FormItem
                              :name="['introductionItems', index, 'infoRight']"
                              :rules="{
                                required: true,
                                message: 'Missing Right Info',
                              }"
                            >
                              <div class="w-full text-center">Right Info</div>

                              <FormItem
                                :name="[
                                  'introductionItems',
                                  index,
                                  'infoRight',
                                  'info',
                                ]"
                                :rules="{
                                  required: true,
                                  message: 'Missing Right Info',
                                }"
                              >
                                <div class="mb-1 color-bluegray500">Info</div>
                                <Input
                                  v-model:value="item.infoRight.info"
                                  placeholder="please enter"
                                />
                              </FormItem>
                              <FormItem
                                :name="[
                                  'introductionItems',
                                  index,
                                  'infoRight',
                                  'supplementary',
                                ]"
                                :rules="{
                                  required: true,
                                  message: 'Missing Right Info',
                                }"
                              >
                                <div class="mb-1 color-bluegray500">
                                  Supplementary
                                </div>
                                <Input
                                  v-model:value="item.infoRight.supplementary"
                                  placeholder="please enter"
                                />
                              </FormItem>
                            </FormItem>
                          </Col>
                        </Row>

                        <template #actions>
                          <DeleteOutlined
                            key="delete"
                            @click="handleDeleteProcessItem(index)"
                          />
                        </template>
                      </Card>
                    </Col>
                    <Col
                      :span="6"
                      v-if="homePageContent.processItems.length < 3"
                    >
                      <Card
                        class="card-container !h-full"
                        hoverable
                        :bodyStyle="{ width: '100%', height: '100%' }"
                        @click="addNewProcessItem"
                      >
                        <div class="add-card">
                          <PlusOutlined />
                        </div>
                      </Card>
                    </Col>
                  </template>
                </Row>
              </FormItem>

              <FormItem
                name="productCategoryItems"
                label="Category Items"
                :rules="{
                  len: 6,
                  type: 'array',
                  required: true,
                  message: 'Product category item size must be 6',
                }"
              >
                <Row :gutter="[16, 24]">
                  <template v-if="homePageContent.productCategoryItems">
                    <Col
                      :span="6"
                      :key="index"
                      v-for="(
                        item, index
                      ) in homePageContent.productCategoryItems"
                    >
                      <Card>
                        <FormItem
                          :name="['productCategoryItems', index, 'title']"
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
                          :name="['productCategoryItems', index, 'category']"
                          :rules="{
                            required: true,
                            message: 'Missing Category',
                          }"
                        >
                          <div class="mb-1 color-bluegray500">Category</div>

                          <Select
                            v-model:value="item.category"
                            placeholder="please enter"
                            :options="categories"
                          />
                        </FormItem>

                        <FormItem
                          :name="['productCategoryItems', index, 'image']"
                          :rules="{
                            type: 'array',
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

                        <template #actions>
                          <DeleteOutlined
                            key="delete"
                            @click="handleDeleteProductCategoryItem(index)"
                          />
                        </template>
                      </Card>
                    </Col>
                    <Col
                      :span="6"
                      v-if="homePageContent.productCategoryItems.length < 6"
                    >
                      <Card
                        class="card-container !h-full"
                        hoverable
                        :bodyStyle="{ width: '100%', height: '100%' }"
                        @click="addNewProductCategoryItem"
                      >
                        <div class="add-card">
                          <PlusOutlined />
                        </div>
                      </Card>
                    </Col>
                  </template>
                </Row>
              </FormItem>
              <FormItem label="Client Logos" name="clientLogos">
                <Upload
                  :headers="uploadHeader"
                  v-model:file-list="homePageContent.clientLogos"
                  :action="Api.AntUpload"
                  list-type="picture-card"
                  :max-count="6"
                >
                  <div
                    v-if="
                      homePageContent.clientLogos &&
                      homePageContent.clientLogos.length < 4
                    "
                  >
                    <PlusOutlined />
                    <div style="margin-top: 8px">Upload</div>
                  </div>
                </Upload>
              </FormItem>
              <FormItem label="Leaders" name="leaders">
                <Row :gutter="[16, 24]">
                  <Col
                    :span="6"
                    :key="index"
                    v-for="(item, index) in homePageContent.leaders"
                  >
                    <Card class="member-item position-relative" hoverable>
                      <template #cover>
                        <img
                          class="member-image"
                          alt="example"
                          :src="item.image"
                        />
                      </template>
                      <template #actions>
                        <DeleteOutlined
                          key="delete"
                          @click="handleDeleteLeader(index)"
                        />
                      </template>
                      <CardMeta>
                        <template #title>
                          <div>{{ item.name }}</div>
                        </template>
                        <template #description>
                          <Tooltip placement="bottom">
                            <div class="member-description">
                              {{ item.description }}
                            </div>

                            <template #title>
                              <span>{{ item.description }}</span>
                            </template>
                          </Tooltip>
                        </template>
                      </CardMeta>
                    </Card>
                  </Col>
                  <Col :span="6" v-if="homePageContent.leaders.length < 2">
                    <Card
                      class="card-container !h-full"
                      hoverable
                      :bodyStyle="{ width: '100%', height: '100%' }"
                      @click="handleOpenMemberModal"
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
                  <Button type="primary" html-type="submit">Submit</Button>
                </div>
              </FormItem>
            </Form>
          </Spin>
        </TabPane>
        <TabPane :key="TabType.AboutUs" tab="About Us">
          <Spin wrapperClassName="w-full" :spinning="loading">
            <Form
              name="basic"
              class="w-full p-4"
              :label-col="{ style: { width: '150px' } }"
              :model="aboutUs"
              @finish="handleAboutUsFinish"
              v-if="aboutUs"
            >
              <FormItem name="qualityItems" label="QualityItems">
                <Row :gutter="[16, 24]">
                  <template v-if="aboutUs.qualityItems">
                    <Col
                      :span="6"
                      :key="index"
                      v-for="(item, index) in aboutUs.qualityItems"
                    >
                      <Card>
                        <FormItem
                          :name="['qualityItems', index, 'title']"
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
                          :name="['qualityItems', index, 'desc']"
                          :rules="{
                            required: true,
                            message: 'Missing description',
                          }"
                        >
                          <div class="mb-1 color-bluegray500">Description</div>

                          <Textarea
                            v-model:value="item.desc"
                            placeholder="please enter"
                            :autoSize="{ minRows: 3, maxRows: 6 }"
                          />
                        </FormItem>

                        <FormItem
                          :name="['qualityItems', index, 'image']"
                          :rules="{
                            type: 'array',
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

                        <template #actions>
                          <DeleteOutlined
                            key="delete"
                            @click="handleDeleteQualityItem(index)"
                          />
                        </template>
                      </Card>
                    </Col>
                    <Col :span="6" v-if="aboutUs.qualityItems.length < 4">
                      <Card
                        class="card-container !h-full"
                        hoverable
                        :bodyStyle="{ width: '100%', height: '100%' }"
                        @click="addNewQualityItem"
                      >
                        <div class="add-card">
                          <PlusOutlined />
                        </div>
                      </Card>
                    </Col>
                  </template>
                </Row>
              </FormItem>
              <FormItem label="Header" name="needHelpHeader">
                <Input
                  v-model:value="aboutUs.needHelpHeader"
                  placeholder="please enter"
                />
              </FormItem>
              <FormItem label="Description" name="needHelpDesc">
                <Textarea
                  v-model:value="aboutUs.needHelpDesc"
                  placeholder="please enter"
                  :autoSize="{ minRows: 3, maxRows: 6 }"
                />
              </FormItem>
              <FormItem label="Team Member" name="teamMembers">
                <Row :gutter="[16, 24]">
                  <Col
                    :span="6"
                    :key="index"
                    v-for="(item, index) in aboutUs.teamMembers"
                  >
                    <Card class="member-item position-relative" hoverable>
                      <template #cover>
                        <img
                          class="member-image"
                          alt="example"
                          :src="item.image"
                        />
                      </template>
                      <template #actions>
                        <DeleteOutlined
                          key="delete"
                          @click="handleDeleteTeamMember(index)"
                        />
                      </template>
                      <CardMeta>
                        <template #title>
                          <div>{{ item.name }}</div>
                        </template>
                        <template #description>
                          <Tooltip placement="bottom">
                            <div class="member-description">
                              {{ item.description }}
                            </div>

                            <template #title>
                              <span>{{ item.description }}</span>
                            </template>
                          </Tooltip>
                        </template>
                      </CardMeta>
                    </Card>
                  </Col>
                  <Col :span="6" v-if="aboutUs.teamMembers.length < 4">
                    <Card
                      class="card-container !h-full"
                      hoverable
                      :bodyStyle="{ width: '100%', height: '100%' }"
                      @click="handleOpenMemberModal"
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
                  <Button type="primary" html-type="submit">Submit</Button>
                </div>
              </FormItem>
            </Form>
          </Spin>
        </TabPane>
        <TabPane :key="TabType.BasicInfo" tab="Basic Info">
          <Spin wrapperClassName="w-full" :spinning="loading">
            <Form
              name="basic"
              class="w-full p-4"
              :label-col="{ style: { width: '150px' } }"
              :model="basicInfo"
              @finish="handleBasicInfoFinish"
            >
              <FormItem
                name="email"
                label="Email"
                :rules="[
                  {
                    type: 'email',
                    required: true,
                    message: 'Please enter a valid email',
                    trigger: ['blur', 'change'],
                  },
                ]"
              >
                <Input v-model:value="basicInfo.email" />
              </FormItem>
              <FormItem
                name="address"
                label="Address"
                :rules="[
                  {
                    required: true,
                    message: 'Please enter an address',
                    trigger: ['blur', 'change'],
                  },
                ]"
              >
                <Input v-model:value="basicInfo.address" />
              </FormItem>
              <FormItem>
                <div class="w-full flex justify-end">
                  <Button :loading="loading" type="primary" html-type="submit">
                    Submit
                  </Button>
                </div>
              </FormItem>
            </Form>
          </Spin>
        </TabPane>
      </Tabs>
      <Modal
        width="60%"
        @ok="handleComfirmChooseMember"
        v-model:open="memberModal"
        title="Choose Memeber"
      >
        <div class="member-container">
          <Row :gutter="[16, 24]">
            <Col :span="6" :key="index" v-for="(item, index) in memberList">
              <Card
                class="member-item position-relative"
                hoverable
                @click="handleChooseMember(item)"
              >
                <CheckSquareOutlined
                  class="selected-icon"
                  v-if="
                    selectedMembers.find(
                      (selectedMember) => selectedMember.id == item.id,
                    )
                  "
                />

                <template #cover>
                  <img class="member-image" alt="example" :src="item.image" />
                </template>

                <CardMeta>
                  <template #title>
                    <div>{{ item.name }}</div>
                  </template>
                  <template #description>
                    <Tooltip placement="bottom">
                      <div class="member-description">
                        {{ item.description }}
                      </div>

                      <template #title>
                        <span>{{ item.description }}</span>
                      </template>
                    </Tooltip>
                  </template>
                </CardMeta>
              </Card>
            </Col>
          </Row>
          <Row justify="end" class="mt-2">
            <Pagination
              :total="memberPagenigation.total"
              :show-total="() => `total ${memberPagenigation.total} members`"
              show-size-changer
              show-quick-jumper
              :current="memberPagenigation.page"
              :page-size="memberPagenigation.pageSize"
              @change="handleMemberPageChange"
            />
          </Row>
        </div>
      </Modal>

      <Modal
        width="60%"
        @ok="handleComfirmChooseProduct"
        v-model:open="productModal"
        title="Choose Product"
      >
        <div class="product-container">
          <div class="mb-4">
            <span><strong>category:</strong></span>
            <Select
              :value="selectedCategory"
              :options="filterCategories"
              class="w-[200px] ml-4"
              @change="categoryChangeHandler"
            />
          </div>
          <Row :gutter="[16, 24]">
            <Col :span="6" :key="index" v-for="(item, index) in productList">
              <Card
                class="member-item position-relative"
                hoverable
                @click="handleChooseProduct(item)"
              >
                <CheckSquareOutlined
                  class="selected-icon"
                  v-if="selectedProduct && selectedProduct.id == item.id"
                />

                <template #cover>
                  <img class="member-image" alt="example" :src="item.imgs[0]" />
                </template>

                <CardMeta>
                  <template #title>
                    <div>{{ item.name }}</div>
                  </template>
                  <template #description>
                    <Tooltip placement="bottom">
                      <div class="member-description">
                        {{ item.category }}
                      </div>

                      <template #title>
                        <span>{{ item.category }}</span>
                      </template>
                    </Tooltip>
                  </template>
                </CardMeta>
              </Card>
            </Col>
          </Row>
          <Row justify="end" class="mt-2">
            <Pagination
              :total="productPagenigation.total"
              :show-total="() => `total ${productPagenigation.total} product`"
              show-size-changer
              show-quick-jumper
              :current="productPagenigation.page"
              :page-size="productPagenigation.pageSize"
              @change="handleProductPageChange"
            />
          </Row>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  PlusOutlined,
  DeleteOutlined,
  MinusCircleOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons-vue";
import {
  convertImageUrlToUploadParam,
  convertImageUploadParamToUrl,
} from "/@/utils";
import { onMounted, ref } from "vue";
import {
  Form,
  Card,
  CardMeta,
  FormItem,
  Input,
  Upload,
  Textarea,
  Button,
  Spin,
  message,
  Tabs,
  TabPane,
  Row,
  Col,
  Modal,
  Pagination,
  Image,
  Select,
} from "ant-design-vue";
import {
  getHomePageApi,
  updateHomePageApi,
  getBasicInfoApi,
  updateBasicInfoApi,
  getAboutUsApi,
  updateAboutUsApi,
} from "/@/api";
import { Product } from "/@/api/product/model";
import { getProductListApi, getCategoryDictApi } from "/@/api/product";
import { getMemberListApi } from "/@/api/member/index";
import type {
  BasicInfo,
  HomePageContentVO,
  HomePageContentDTO,
  AboutUsPageVO,
  AboutUsPageDTO,
  Pagenigation,
  Dict,
  HomeProductionCategoryItemVO,
  AboutUsQualityItemVO,
  HomeProcessItem,
  HomeIntroductionItemDTO,
  HomeProductionCategoryItem,
  AboutUsQualityItem,
} from "/@/api/model/baseModel";
import type { Member } from "/@/api/member/model";
import { Api } from "/@/api/product";
import { useUserStore } from "/@/store/modules/user";
enum TabType {
  // auto width
  Home = "Home",
  // fixed width
  AboutUs = "aboutUs",
  BasicInfo = "basicInfo",
}

const userStore = useUserStore();
const activeKey = ref(TabType.Home);
const uploadHeader = {
  Authorization: userStore.getToken,
};

const loading = ref(false);

const basicInfo = ref<BasicInfo>({ email: "", address: "" });
const homePageContent = ref<HomePageContentVO>();
const aboutUs = ref<AboutUsPageVO>();
const memberModal = ref(false);
const memberList = ref<Member[]>([]);
const selectedMembers = ref<Member[]>([]);
const memberListLoading = ref(false);
const memberPagenigation = ref<Pagenigation>({
  page: 1,
  pageSize: 8,
  total: 0,
});

const categories = ref<Dict[]>([]);
const filterCategories = ref<Dict[]>([{ label: "All", value: "" }]);
const selectedCategory = ref("");
const introductionItemIndex = ref(0);
const productModal = ref(false);
const productList = ref<Product[]>([]);
const selectedProduct = ref<Product>();
const productListLoading = ref(false);

const productPagenigation = ref<Pagenigation>({
  page: 1,
  pageSize: 8,
  total: 0,
});

const categoryChangeHandler = (categoryItem: Dict) => {
  selectedCategory.value = categoryItem.value;
  fetchProductList(true);
};
const handleProductPageChange = (page, size) => {
  productPagenigation.value.page = page;
  productPagenigation.value.pageSize = size;

  fetchProductList();
};

const fetchProductList = async (isInit = false) => {
  if (isInit) {
    productPagenigation.value.page = 1;
    productList.value = [];
    productPagenigation.value.total = 0;
    productPagenigation.value.pageSize = 8;
  }

  try {
    productListLoading.value = true;
    const res = await getProductListApi({
      category: selectedCategory.value,
      page: productPagenigation.value.page,
      pageSize: productPagenigation.value.pageSize,
    });

    if (res.list.length > 0) {
      productList.value.push(...res.list);
    }
    productPagenigation.value.total = res.total;
  } finally {
    productListLoading.value = false;
  }
};

const fetchCategoryDict = async () => {
  const res = await getCategoryDictApi();

  categories.value = [...categories.value, ...res];
  filterCategories.value = [...filterCategories.value, ...res];
};

const handleOpenProductModal = (index) => {
  productModal.value = true;
  fetchProductList(true);
  introductionItemIndex.value = index;
};

const handleComfirmChooseProduct = () => {
  if (homePageContent.value && selectedProduct.value) {
    homePageContent.value.introductionItems[
      introductionItemIndex.value
    ].product = selectedProduct.value;
  }

  productModal.value = false;
};

const handleOpenMemberModal = async () => {
  memberModal.value = true;
  await fetchMemberList(true);
  if (activeKey.value == TabType.Home) {
    if (homePageContent.value) {
      selectedMembers.value = [...homePageContent.value.leaders];
    }
  } else if (activeKey.value == TabType.AboutUs) {
    selectedMembers.value = aboutUs.value?.teamMembers || [];
  }
};

const handleMemberPageChange = (page, size) => {
  memberPagenigation.value.page = page;
  memberPagenigation.value.pageSize = size;

  fetchMemberList();
};

const fetchMemberList = async (isInit = false) => {
  if (isInit) {
    memberPagenigation.value.page = 1;
    memberList.value = [];
    memberPagenigation.value.total = 0;
    memberPagenigation.value.pageSize = 8;
  }

  try {
    memberListLoading.value = true;
    const res = await getMemberListApi({
      page: memberPagenigation.value.page,
      pageSize: memberPagenigation.value.pageSize,
    });

    if (res.list.length > 0) {
      memberList.value.push(...res.list);
    }
    memberPagenigation.value.total = res.total;
  } finally {
    memberListLoading.value = false;
  }
};

const handleChooseMember = (member: Member) => {
  if (
    selectedMembers.value.find(
      (selectedMember) => selectedMember.id == member.id,
    )
  ) {
    selectedMembers.value = selectedMembers.value.filter(
      (selectedMember) => selectedMember.id != member.id,
    );
  } else {
    selectedMembers.value.push(member);
  }
};

const handleChooseProduct = (product: Product) => {
  if (!selectedProduct.value) {
    selectedProduct.value = product;
    return;
  }
  if (selectedProduct.value.id == product.id) {
    selectedProduct.value = undefined;
  } else {
    selectedProduct.value = product;
  }
  console.log("selectedProduct", selectedProduct.value);
};

const handleComfirmChooseMember = () => {
  if (activeKey.value == TabType.Home) {
    if (homePageContent.value) {
      homePageContent.value.leaders = [...selectedMembers.value];
    }
  } else if (activeKey.value == TabType.AboutUs) {
    if (aboutUs.value) {
      aboutUs.value.teamMembers = [...selectedMembers.value] || [];
    }
  }
  memberModal.value = false;
};

const handleTabChange = (key) => {
  if (key == TabType.Home) {
    fetchHomePageData();
  } else if (key == TabType.AboutUs) {
    fetchAboutUs();
  } else {
    fetchBasicInfo();
  }
};

const fetchHomePageData = async () => {
  try {
    loading.value = true;
    const res = await getHomePageApi();
    if (res) {
      let tempData: HomePageContentVO = {
        introductionItems: [],
        processItems: [],
        productCategoryItems: [],
        clientLogos: [],
        leaders: [],
      };
      tempData.processItems = res.processItems.map((item) => {
        return {
          ...item,
          image: convertImageUrlToUploadParam(item.image),
        };
      });
      tempData.introductionItems = res.introductionItems.map((item) => {
        return {
          ...item,
          image: convertImageUrlToUploadParam(item.image),
        };
      });
      console.log(tempData.introductionItems);

      tempData.productCategoryItems = res.productCategoryItems.map(
        (item): HomeProductionCategoryItemVO => {
          // return {
          //   ...item,
          //   image: convertImageUrlToUploadParam(item.image),
          // } ;
          return {
            title: item.title,
            category: item.category,
            image: convertImageUrlToUploadParam(item.image),
          };
        },
      );
      tempData.clientLogos = convertImageUrlToUploadParam(res.clientLogos);

      homePageContent.value = tempData;
      console.log(homePageContent.value);

      loading.value = false;
    }
  } catch (error) {
    console.error("get Home data error", error);
  } finally {
    loading.value = false;
  }
};

const fetchBasicInfo = async () => {
  try {
    loading.value = true;
    const res = await getBasicInfoApi();
    if (res) {
      basicInfo.value = res;

      loading.value = false;
    }
  } catch (error) {
    console.error("get basic info data error", error);
  } finally {
    loading.value = false;
  }
};
const fetchAboutUs = async () => {
  try {
    loading.value = true;
    const res = await getAboutUsApi();
    if (res) {
      const tempData: AboutUsPageVO = {
        qualityItems: [],
        needHelpHeader: "",
        needHelpDesc: "",
        teamMembers: [],
      };
      tempData.qualityItems = res.qualityItems.map(
        (item): AboutUsQualityItemVO => {
          return {
            title: item.title,
            desc: item.desc,
            image: convertImageUrlToUploadParam(item.image),
          };
        },
      );
      aboutUs.value = tempData;
      console.log(aboutUs.value);

      loading.value = false;
    }
  } catch (error) {
    console.error("get About us data error", error);
  } finally {
    loading.value = false;
  }
};

const handleDeleteQualityItem = (index) => {
  aboutUs.value && aboutUs.value.qualityItems.splice(index, 1);
};

const addNewQualityItem = () => {
  aboutUs.value &&
    aboutUs.value.qualityItems.push({
      title: "",
      desc: "",
      image: [],
    });
};

const addNewProcessItem = () => {
  homePageContent.value &&
    homePageContent.value.processItems.push({
      title: "",
      detailText: "",
      image: [],
    });
};
const addNewProductCategoryItem = () => {
  homePageContent.value?.productCategoryItems.push({
    title: "",
    category: "",
    image: [],
  });
};

const handleDeleteTeamMember = (index) => {
  aboutUs.value && aboutUs.value.teamMembers.splice(index, 1);
};
const handleDeleteLeader = (index) => {
  homePageContent.value && homePageContent.value.leaders.splice(index, 1);
};
const handleDeleteProcessItem = (index) => {
  homePageContent.value && homePageContent.value.processItems.splice(index, 1);
};
const handleDeleteProduct = (index) => {
  if (homePageContent.value) {
    homePageContent.value.introductionItems[index].product = undefined;
  }
};
const handleDeleteProductCategoryItem = (index) => {
  homePageContent.value &&
    homePageContent.value.productCategoryItems.splice(index, 1);
};

const handleHomeFinish = async () => {
  if (!homePageContent.value) {
    return;
  }
  console.log(homePageContent.value, "home page data ");

  try {
    loading.value = true;
    let params: HomePageContentDTO = {
      processItems: homePageContent.value.processItems.map(
        (item): HomeProcessItem => {
          return {
            ...item,
            image: convertImageUploadParamToUrl(item.image) as string,
          };
        },
      ),
      introductionItems: homePageContent.value.introductionItems.map(
        (item): HomeIntroductionItemDTO => {
          return {
            ...item,
            image: convertImageUploadParamToUrl(item.image) as string,
            productId: item.product?.id,
          };
        },
      ),
      productCategoryItems: homePageContent.value.productCategoryItems.map(
        (item): HomeProductionCategoryItem => {
          return {
            ...item,
            image: convertImageUploadParamToUrl(item.image) as string,
          };
        },
      ),
      leaders: homePageContent.value.leaders.map((item) => item.id) as number[],
      clientLogos: convertImageUploadParamToUrl(
        homePageContent.value.clientLogos,
      ) as string[],
    };
    const res = await updateHomePageApi(params);
    if (res) {
      message.success("Update successfully");
    }
  } catch (error) {
    message.error("Update failed");
  } finally {
    loading.value = false;
  }
};

const handleBasicInfoFinish = async () => {
  if (!basicInfo.value) {
    return;
  }

  try {
    loading.value = true;
    const res = await updateBasicInfoApi(basicInfo.value);
    if (res) {
      message.success("Update successfully");
    }
  } catch (error) {
    message.error("Update failed");
  } finally {
    loading.value = false;
  }
};
const handleAboutUsFinish = async () => {
  if (!aboutUs.value) {
    return;
  }
  try {
    loading.value = true;
    const params: AboutUsPageDTO = {
      ...aboutUs.value,
      qualityItems: aboutUs.value.qualityItems.map(
        (item): AboutUsQualityItem => {
          return {
            ...item,
            image: convertImageUploadParamToUrl(item.image) as string,
          };
        },
      ),
      teamMembers: aboutUs.value.teamMembers.map((item) => item.id) as number[],
    };
    console.log(params, "about us params");
    const res = await updateAboutUsApi(params);
    if (res) {
      message.success("Update successfully");
    }
  } catch (error) {
    message.error("Update failed");
    console.error("Update failed", error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  fetchHomePageData();
  fetchCategoryDict();
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

.member-item {
  &.selected {
    border: 1px solid lighten(@primary-color, 20%);
    box-shadow: 0 0 4px lighten(@primary-color, 40%);
  }

  .selected-icon {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 20px;
    color: lighten(@primary-color, 30%);
  }
  .member-image {
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    object-position: 0 0;
  }
  .member-description {
    min-height: 66px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
