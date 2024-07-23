import {
  GetGroupCodeGroupsApi,
  NewGroupCodeGroupsApi,
  UpdateGroupCodeGroupsApi,
  DeleteGroupCodeGroupsApi,
  GetGroupCodesListApi,
  DeleteGroupCodeApi,
  DownloadGroupCodeApi,
  BatchDownloadQrCodeApi,
  GetGroupChatsApi,
  GetTagGroupsApi,
  ValidGroupNameApi,
  AddTagGroupsApi,
  DeleteTagGroupApi,
  NewGroupCodesApi,
  GetGroupCodeDetailApi,
  EditGroupCodeApi,
  UpdateTagsApi,
} from "/@/api/wecomManage/groupCode";
import type {
  GroupCodeModel,
  GroupCodesParams,
  GroupChatsParams,
  AddTagGroupParams,
  NewGroupCodesParams,
  UpdateTagsParams,
} from "/@/api/wecomManage/model/groupCodeModel";
import { defineStore } from "pinia";
import { store } from "/@/store";
interface groupCodeStatus {
  groupCodeList: GroupCodeModel[];
}
export const useWecomStore = defineStore({
  id: "group-code",
  state: (): groupCodeStatus => ({
    groupCodeList: [],
  }),
  actions: {
    async updateTags(params: UpdateTagsParams) {
      return await UpdateTagsApi(params);
    },
    async editGroupCode(id: number, params: NewGroupCodesParams) {
      return await EditGroupCodeApi(id, params);
    },
    async getGroupCodeDetail(id: number) {
      return await GetGroupCodeDetailApi(id);
    },
    async newGroupCodes(params: NewGroupCodesParams) {
      return await NewGroupCodesApi(params);
    },
    async deleteTagGroup(id: number) {
      return await DeleteTagGroupApi(id);
    },
    async addTagGroups(params: AddTagGroupParams) {
      return await AddTagGroupsApi(params);
    },
    async validGroupName(groupName: string) {
      return await ValidGroupNameApi(groupName);
    },
    async getTagGroups() {
      return await GetTagGroupsApi();
    },
    async getGroupChatsList(params: GroupChatsParams) {
      return await GetGroupChatsApi(params);
    },
    async batchDownloadQrCode(params: number[]) {
      return await BatchDownloadQrCodeApi(params);
    },
    async downloadGroupCodeApi(id: number) {
      return await DownloadGroupCodeApi(id);
    },
    async deleteGroupCodeApi(id: number) {
      return await DeleteGroupCodeApi(id);
    },
    async getGroupCodesList(params: GroupCodesParams) {
      return await GetGroupCodesListApi(params);
    },
    async deleteGroupCodeGroups(id: number) {
      return await DeleteGroupCodeGroupsApi(id);
    },
    async updateGroupCodeGroups(params: { groupName: string }, id: number) {
      return await UpdateGroupCodeGroupsApi(params, id);
    },
    async newGroupCodeGroups(params: { groupName: string }) {
      return await NewGroupCodeGroupsApi(params);
    },
    // 获取分组
    async getGroupCodeGroups() {
      return await GetGroupCodeGroupsApi();
    },
  },
});

export function useWecomStoreWithOut() {
  return useWecomStore(store);
}
