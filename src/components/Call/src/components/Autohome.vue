<template>
  <div>
    <Row>
      <Col :span="7">
        <div class="side-bar">
          <div class="title">
            {{ name }}
            <span class="phone-number">{{ data.tel_x }}</span>
          </div>
          <div class="section">
            <div class="title">
              意向车系:
              <span style="font-weight: normal">
                {{ model }}
              </span>
            </div>
            <div>
              <Tag
                v-for="text in factoryInteractiveRealtimeLabelList"
                :key="text"
              >
                {{ text }}
              </Tag>
            </div>
          </div>
          <div class="section">
            <div class="title">语音识别</div>
            <div
              v-for="(item, index) in factoryInteractiveAsrList"
              :key="index"
            >
              {{ item.asrType == 1 ? "客服：" : "客户：" }}
              {{ item.asrText }}
            </div>
          </div>
        </div>
      </Col>
      <Col :span="17">
        <Row>
          <div class="nav-bar">
            <span class="title">思路导航</span>
            <Steps
              class="steps"
              progress-dot
              :items="factoryInteractiveNavigationList"
            />
          </div>
        </Row>
        <Row>
          <Col :span="24">
            <div class="title">智慧弹屏</div>
          </Col>
          <Col :span="24">
            <Row :gutter="5">
              <Col :span="8" style="height: 260px; overflow-y: auto">
                <div
                  v-for="(item, index) in factoryInteractiveKeyWordsList"
                  :key="index"
                  @click="factoryInteractiveKeyWordsListIndex = index"
                  class="card"
                  :style="
                    factoryInteractiveKeyWordsListIndex === index
                      ? 'border: 1px solid #1677ff'
                      : 'border: 1px solid #dddddd'
                  "
                >
                  <div>{{ item.title }}</div>
                  <div class="subtitle">
                    {{ item.subTitle }}
                  </div>
                </div>
              </Col>
              <Col :span="16">
                <iframe
                  style="height: 260px"
                  :src="
                    factoryInteractiveKeyWordsList?.[
                      factoryInteractiveKeyWordsListIndex
                    ]?.detailUrl
                  "
                ></iframe>
              </Col>
            </Row>
          </Col>
          <Col :span="24">
            <Divider />
          </Col>
          <Col :span="24">
            <div class="title">开口提示</div>
            <div
              v-for="(item, index) in factoryInteractiveQualityCheckList"
              :key="index"
            >
              <div style="padding: 5px 0">
                <span :style="'margin-right:8px;'">
                  <span :style="item.accessFlag ? 'color:#999' : 'color:#000'">
                    {{ item.title }}
                  </span>
                </span>
                <span :style="item.accessFlag ? 'color:#ddd' : 'color:#999'">
                  {{ item.contentSimple }}
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script lang="ts" setup>
import { Col, Row, Steps, Divider, Tag } from "ant-design-vue";
import { onUnmounted, ref } from "vue";
import { onMountedOrActivated } from "/@/hooks/core/onMountedOrActivated";
import useWebSocket from "/@/components/Call/src/composables/useWebSocket";
import { fetchClueDetail } from "/@/api/taskManagement/taskPage";

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      result: [],
      callResultUrl: "",
      orderId: "",
      tel_x: "",
      openWordsResult: [],
    }),
  },
  // 关联线索ID，用于请求数据
  relatedId: {
    type: String,
    required: true,
  },
});

const socket = useWebSocket();
const name = ref("");
const model = ref("");

// 智能弹屏
const factoryInteractiveKeyWordsList = ref<any>([]);
const factoryInteractiveKeyWordsListIndex = ref(0);

// 语音识别
const factoryInteractiveAsrList = ref<any>([]);

// 意向车系
const factoryInteractiveRealtimeLabelList = ref<string[]>([]);

// 思路导航
const factoryInteractiveNavigationList = ref<{ title: string; status: any }[]>([
  { title: "开场白", status: "wait" },
  { title: "需求分析", status: "wait" },
  { title: "邀约到店", status: "wait" },
  { title: "结束语", status: "wait" },
]);

// 开头提示
const factoryInteractiveQualityCheckList = ref<any>([]);

onMountedOrActivated(() => {
  factoryInteractiveKeyWordsList.value = props.data.result;
  factoryInteractiveQualityCheckList.value = props.data.openWordsResult;
  factoryInteractiveKeyWordsListIndex.value = 0;
  socket.connect(props.data.callResultUrl, (data) => {
    if (!data.cmdType || !data.cmdContent) return;
    const content = JSON.parse(data.cmdContent);
    if (data.cmdType == "factoryInteractiveKeyWords") {
      if (content.title !== "推荐.暂无知识") {
        factoryInteractiveKeyWordsList.value = [
          content,
          ...factoryInteractiveKeyWordsList.value,
        ];
        factoryInteractiveKeyWordsListIndex.value = 0;
      }
    } else if (data.cmdType == "factoryInteractiveAsr") {
      factoryInteractiveAsrList.value = [
        ...factoryInteractiveAsrList.value,
        content,
      ];
    } else if (data.cmdType == "factoryInteractiveRealtimeLabel") {
      factoryInteractiveRealtimeLabelList.value = [
        ...factoryInteractiveRealtimeLabelList.value,
        ...(content?.realtimeLabelList as string[]),
      ];
    } else if (data.cmdType == "factoryInteractiveNavigation") {
      factoryInteractiveNavigationList.value =
        factoryInteractiveNavigationList.value.map((x) => {
          return {
            ...x,
            status: content.navigationList.includes(x.title)
              ? "finish"
              : "wait",
          };
        });
    } else if (data.cmdType == "factoryInteractiveQualityCheck") {
      factoryInteractiveQualityCheckList.value =
        factoryInteractiveQualityCheckList.value.map((x) => ({
          ...x,
          accessFlag: x.contentSimple == content.contentSimple || x.accessFlag,
        }));
    }
  });

  fetchClueDetail({ dealerLeadId: props.relatedId }).then((res) => {
    name.value = res.dealerLead.customizeName;
    model.value = res.dealerLead.intendCarSeriesName;
  });
});

onUnmounted(() => {
  socket.disconnect();
});
</script>

<style scoped lang="less">
.side-bar {
  .section {
    min-height: 100px;
  }
}
.title {
  font-weight: 600;
  padding: 5px 0;
  .phone-number {
    color: #1677ff;
    font-weight: bold;
  }
}
.text {
  color: #999;
}
iframe {
  border: none;
  width: 100%;
  height: 200px;
  overflow-y: auto;
}
.nav-bar {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  .title {
    display: inline-block;
    white-space: nowrap;
  }
}

.card {
  border: 1px solid #dddddd;
  padding: 8px;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
  .subtitle {
    color: #999;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.steps {
  padding: 5px 0;

  :deep(.ant-steps-item-title) {
    font-size: 0.9rem;
  }
}
</style>
