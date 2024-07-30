<template>
  <div class="login-page-container">
    <canvas ref="canvasRef" class="wave-container"></canvas>
    <!-- <div
          class="ring"
          v-for="(item, index) in rings"
          :key="index"
          :style="{
            ...item.style,
          }"
        ></div> -->
    <Row justify="center" align="middle">
      <Col :span="7" class="text-center mt-20">
        <div class="logo-text mb-20">VEDA SOURCE CMS</div>
        <div class="relative p-4 login-form-container">
          <LoginForm />
        </div>
      </Col>
    </Row>
  </div>
</template>
<script lang="ts" setup>
import LoginForm from "./LoginForm.vue";
import { Row, Col } from "ant-design-vue";
import * as simplexNoise from "simplex-noise";
import { onUnmounted, ref } from "vue";
import { timeBasedExecution } from "/@/utils";
import { drawCircle } from "/@/utils/canvasUtil";
import { onMounted } from "vue";
import { useEventListener } from "/@/hooks/event/useEventListener";

const noise2D = simplexNoise.createNoise2D(Math.random);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const addRing = (i: number) => {
  const n1 = noise2D(i * 0.003, i * 0.0033);
  const n2 = noise2D(i * 0.002, i * 0.001);
  const circleProperties: Record<string, number> = {
    n1,
    n2,
    i,
    r: 15,
  };
  drawCircle(canvasRef.value as HTMLCanvasElement, circleProperties);
};

const { removeEvent: resizeRemove } = useEventListener({
  name: "resize",
  listener: () => {
    if (canvasRef.value) {
      canvasRef.value.width = window.innerWidth;
      canvasRef.value.height = window.innerHeight;
      timeBasedExecution(30, 1000, addRing);
    }
  },
});

onMounted(() => {
  if (canvasRef.value) {
    canvasRef.value.width = window.innerWidth;
    canvasRef.value.height = window.innerHeight;
    timeBasedExecution(30, 1000, addRing);
  }
});
onUnmounted(() => {
  resizeRemove();
});

defineProps({
  sessionTimeout: {
    type: Boolean,
  },
});
</script>
<style lang="less">
@logo-prefix-cls: ~"@{namespace}-app-logo";
.login-page-container {
  .wave-container {
    position: fixed;
    overflow: hidden;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    align-items: center;
    .ring {
      position: relative;
      flex-shrink: 0;

      width: 20px;
      height: 20px;

      border-radius: 50%;
      margin: -19px auto;
      will-change: opacity;

      opacity: 0;
      transition: transform 1s cubic-bezier(0.14, 0.15, 0.13, 0.99);
      filter: blur(0.1px);
    }
  }

  .login-logo {
    width: 100%;
  }
  .logo-text {
    font-size: 40px;
    font-weight: bold;
    width: 100%;
    color: #111;
  }
  .login-form-container {
    border: 1px solid #eee;
    border-radius: 4px;
    box-shadow: 0 10px 10px #f9f9f9;
    background-color: #fff;
  }

  .container {
    .@{logo-prefix-cls} {
      display: flex;
      width: 60%;
      height: 80px;

      &__title {
        font-size: 24px;
        color: #fff;
      }

      img {
        width: 48px;
      }
    }
  }

  .ant-divider-inner-text {
    font-size: 12px;
    color: @text-color-secondary;
  }
}

input:not([type="checkbox"]) {
  min-width: 360px;

  @media (max-width: @screen-xl) {
    min-width: 320px;
  }

  @media (max-width: @screen-lg) {
    min-width: 260px;
  }

  @media (max-width: @screen-md) {
    min-width: 240px;
  }

  @media (max-width: @screen-sm) {
    min-width: 160px;
  }
}

input {
  min-width: unset;
}
</style>
