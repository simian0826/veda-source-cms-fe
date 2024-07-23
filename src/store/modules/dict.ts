import type { DictResult } from "/@/api/sys/model/dictModel";
import { defineStore } from "pinia";
import { store } from "/@/store";
import { getDictFieldsApi } from "/@/api/sys/dict";

import { DictEnum } from "/@/enums/dictEnum";

export interface DictStatus {
  dict?: DictResult;
}

export const useDictStore = defineStore({
  id: "app-dict",
  state: (): DictStatus => ({
    dict: {},
  }),

  getters: {
    getDict(): DictResult | undefined {
      return this.dict;
    },
  },

  actions: {
    /**
     * @description: 设置dict status
     */
    setDict(param: DictResult) {
      this.dict = param;
    },
    /**
     * @description: 批量获取字典表字段
     */
    async fetchDictBatch(fields?: DictEnum[]): Promise<DictResult | undefined> {
      try {
        let res;
        const dictKeys = Object.keys(this.dict ?? {}) as DictEnum[];
        //dict原本没有数据就直接获取
        if (dictKeys.length === 0) {
          res = await getDictFieldsApi(fields);
          this.setDict(res);
        } else {
          const needFetchFields: DictEnum[] = [];
          if (fields && fields.length > 0) {
            for (const field of fields) {
              if (!dictKeys.includes(field)) needFetchFields.push(field);
            }
          } else {
            //如果没传参数，则是获取全部字典表
            res = await getDictFieldsApi();
            this.setDict(res);
            return this.dict;
          }
          //有额外新增的字段，只获取新增字段，否则直接返回原本的dict
          if (needFetchFields.length > 0) {
            const newFieldsData = await getDictFieldsApi(needFetchFields);
            this.setDict({ ...this.dict, ...newFieldsData });
          }
        }
        return this.dict;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useDictStore(store);
}
