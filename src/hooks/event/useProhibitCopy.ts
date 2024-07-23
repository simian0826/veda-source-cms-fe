import { onUnmounted } from "vue";
import { useEventListener } from "/@/hooks/event/useEventListener";
import { message } from "ant-design-vue";

export function useProhibitCopy() {
  const { removeEvent: copyRemove } = useEventListener({
    name: "copy",
    listener: async (event: ClipboardEvent) => {
      console.log("Clipboard cleared");
      event.preventDefault(); // 阻止默认的复制行为
      event.clipboardData?.clearData(); // 清空剪贴板数据
      try {
        // 使用异步方式将文本写入剪切板
        await navigator.clipboard.writeText("");
        message.warning("当前页面信息无权复制");
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    },
  });
  onUnmounted(() => {
    copyRemove();
  });
  return copyRemove;
}
