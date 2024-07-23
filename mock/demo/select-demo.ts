import { MockMethod } from "vite-plugin-mock";
import { getUrlPrefix, resultSuccess } from "../_util";
const urlPrefix = getUrlPrefix()?.VITE_GLOB_API_URL_PREFIX;

const demoList = (keyword, count = 20) => {
  const result = {
    list: [] as any[],
  };
  for (let index = 0; index < count; index++) {
    result.list.push({
      name: `${keyword ?? ""}选项${index}`,
      id: `${index}`,
    });
  }
  return result;
};

export default [
  {
    url: urlPrefix + "/select/getDemoOptions",
    timeout: 1000,
    method: "get",
    response: ({ query }) => {
      const { keyword, count } = query;
      return resultSuccess(demoList(keyword, count));
    },
  },
] as MockMethod[];
