西瓜视频播放器二次封装

## 版本

- 1.0.1

## 何时使用

- 点播兼容到 IE11+
- 直播需要浏览器支持 Media Source Extensions
- PC Web 端支持直接播放 mp4 视频，播放 HLS、FLV、MPEG-DASH 需要浏览器支持 Media Source Extensions
- iOS Web 端支持直接播放 mp4 和 HLS，不支持播放 FLV、MPEG-DASH
- Android Web 端支持直接播放 mp4 和 HLS，播放 FLV、MPEG-DASH 需要浏览器支持 Media Source Extensions
- 不同业务需求下兼容性要求可能降低，详见具体插件页面插件

## API

```html
<template>
    <div class="test">
      <VideoPlayer :videoUrl="url" />
    </div>
</template>
<script  lang="ts" setup>
import {ref} from 'vue';
import VideoPlayer from '/@/components/VideoPlayer';
const url=ref('')
<script>
```

### Select props

| 参数        | 说明                                         | 类型   | 默认值    |
| ----------- | -------------------------------------------- | ------ | --------- |
| id          | dom 元素 id                                  | string | xg-player |
| videoUrl    | 视频地址                                     | string | -         |
| poster      | 视频封面地址                                 | string | -         |
| playsinline | 是否启用内联播放模式，该配置项只在移动端生效 | string | -         |
| width       | 视频宽度                                     | string | `100%`    |
| height      | 视频高度                                     | string | `200px`   |

## 更新日志

v1.0.0
v1.0.1

- 删除预览图片触发

- 西瓜视频播放器

## 备注

-

## 参考

- https://h5player.bytedance.com/api/
