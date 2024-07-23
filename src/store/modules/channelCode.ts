import {
  GetChannelLiveCodeGroupApi,
  NewChannelLiveCodeGroupApi,
  UpdateGroupNameApi,
  RemoveChannelLiveCodeGroupApi,
  GetListCrApi,
  GetChannelLiveCodeListApi,
  QrCodeDownloadApi,
  QrCodeDownloadBatchApi,
  RemovechannelLiveCodeApi,
  GetCustomerListApi,
} from "/@/api/wecomManage/channelCode";
import type { ChannelListParams } from "/@/api/wecomManage/model/channelCodeModel";
import { defineStore } from "pinia";
import { store } from "/@/store";

export const useChannelStore = defineStore({
  id: "channel-code",
  actions: {
    async getCustomerList(id: number, pageNum: number, pageSize: number) {
      return await GetCustomerListApi(id, pageNum, pageSize);
    },
    async removechannelLiveCode(id: number) {
      return await RemovechannelLiveCodeApi(id);
    },
    async qrCodeDownloadBatch(params: { ids: number[] }) {
      return await QrCodeDownloadBatchApi(params);
    },
    async qrCodeDownload(id: number) {
      return await QrCodeDownloadApi(id);
    },
    async getChannelLiveCodeListApi(params: ChannelListParams) {
      return await GetChannelLiveCodeListApi(params);
    },
    async getListCr() {
      return await GetListCrApi();
    },
    async removeChannelLiveCodeGroup(id: number) {
      return await RemoveChannelLiveCodeGroupApi(id);
    },
    async updateGroupName(params: { name: string; id: number }, id: number) {
      return await UpdateGroupNameApi(params, id);
    },
    async newChannelLiveCodeGroup(groupName: string) {
      return await NewChannelLiveCodeGroupApi(groupName);
    },
    async getChannelLiveCodeGroup() {
      return await GetChannelLiveCodeGroupApi();
    },
  },
});

export function channelStoreWithOut() {
  return useChannelStore(store);
}
