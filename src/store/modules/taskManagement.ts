import { defineStore } from "pinia";
import { BasicFetchResult } from "/@/api/model/baseModel";
import {
  CarSeries,
  Channel,
  OptionModel,
  TaskItemModel,
  TaskType,
  UserRole,
} from "/@/api/taskManagement/model/taskModel";
import {
  fetchCarSeries,
  fetchChannels,
  fetchTaskDetail,
  fetchTaskPage,
  fetchUserRole,
} from "/@/api/taskManagement/taskPage";
import { useUserStore } from "/@/store/modules/user";
import { DictEnum } from "/@/enums/dictEnum";
import { useDictStore } from "/@/store/modules/dict";
import { store } from "/@/store";

interface TaskManagementState {
  taskTypes: TaskType[];
  userRoles: UserRole[];
  carSeries: CarSeries[];
  campList: Channel[];
}

export const useTaskManagementStore = defineStore({
  id: "app-task-management",
  state(): TaskManagementState {
    return {
      taskTypes: [],
      userRoles: [],
      carSeries: [],
      campList: [],
    };
  },
  getters: {
    channelOptionList(): OptionModel[] {
      return this.campList
        .filter((x) => !!x.dealCamp && !!x.channelNameList)
        .map((x) => ({
          label: x.campFullName,
          value: String(x.campId),
          children: x.channelNameList.map((y) => ({
            label: y.channelName,
            value: String(y.channelId),
          })),
        }));
    },
    carSeriesOptionList(): OptionModel[] {
      return this.carSeries?.map((x) => ({
        value: String(x.id),
        label: x.seriesNameCn,
      }));
    },
    dealerOptionList(): OptionModel[] {
      const data = useDictStore().getDict?.[
        DictEnum.ALL_DEALER_GROUP_BY_AREA
      ] as unknown as {
        areaName: string;
        dlrCd: string;
        dealerShortName: string;
      }[];
      const areas = Array.from(new Set<string>(data?.map((x) => x.areaName)));
      const dealers: OptionModel[] = [];
      areas.forEach((x) => {
        const children: OptionModel[] = data
          .filter((y) => y.areaName === x)
          .map((z) => ({ value: z.dlrCd, label: z.dealerShortName }));
        dealers.push({ label: x, value: x, children });
      });
      return dealers;
    },
  },
  actions: {
    async getTaskPage(data: any): Promise<BasicFetchResult<TaskItemModel>> {
      return await fetchTaskPage(data);
    },
    async getUserRole(): Promise<UserRole[]> {
      const roles = await fetchUserRole();
      this.userRoles = roles;
      return roles;
    },
    async getCarSeries(): Promise<CarSeries[]> {
      const series = await fetchCarSeries();
      this.carSeries = series;
      return series;
    },
    async getChannels(): Promise<Channel[]> {
      // FIXME: remove hard code value when userInfo is ready
      const userInfo = useUserStore().getUserInfo;
      const campList = await fetchChannels({
        dealerCode: userInfo?.["dealerInfo"]?.["dealerCode"] || "10111",
      });
      this.campList = campList;
      return campList;
    },
    async getDetail(params): Promise<TaskItemModel[]> {
      return await fetchTaskDetail(params);
    },
  },
});

// Need to be used outside the setup
export function useTaskManagementWithOut() {
  return useTaskManagementStore(store);
}
