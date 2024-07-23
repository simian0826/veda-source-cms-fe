import {
  GetUserListApi,
  GetDealerGroupsOptionsApi,
  GetDealerPostsOptionsApi,
  UserInfoUpdateApi,
  GetUserDetailApi,
  GetRoleOptionsApi,
  GetDeptTreeTop4Api,
  GetSevenRegionApi,
  GetAllProvinceByRidApi,
  GetCityByPidApi,
  GetDealerByCidApi,
} from "/@/api/userManage/userList";
import {
  GetRoleNameApi,
  GetRoleDetailApi,
  DisableApi,
  EnableApi,
  GetRoleListApi,
  SaveRoleApi,
  BindUserRoleApi,
  DeleteUserRoleApi,
  DataPermissionFilterApi,
  GetRoleMenuApi,
  UpdateDataPermissionApi,
  InsertDataPermissionApi,
  DataPermissionListApi,
  UpdatePrivilegeValueApi,
  SaveMenuPermissionApi,
} from "/@/api/userManage/roleList";
import type {
  UserListResModel,
  UserListParamsModel,
  UserUpdateModel,
  DealerFilterParamsModel,
  PostItemModel,
  DltItemModel,
  RoleItemModel,
  DeptFilterDictModel,
  AreaItemModel,
} from "/@/api/userManage/model/userListModel";
import type {
  RoleListParamsModel,
  SaveRoleParamsModel,
  BindUserRoleParamsModel,
  DataPermissionParams,
  InsertDataPermissionParams,
  UpdatePrivileParam,
  SaveMenuPermissionParams,
} from "/@/api/userManage/model/roleListModel";
import { defineStore } from "pinia";
import { store } from "/@/store";
import type {
  Option,
  UserFilterDict,
} from "../../views/userManagement/types/user";

function transFromList(list: DeptFilterDictModel[]) {
  const newList: Option[] = [];
  list.forEach((element, index) => {
    newList[index] = {
      label: element.deptName,
      value: element.deptCode,
    };
    if (element.childrenDept) {
      newList[index]["children"] = transFromList(element.childrenDept);
    }
  });
  return newList;
}
interface UserManageState {
  userList: Nullable<UserListResModel>;
  userFilterDict: Nullable<UserFilterDict[]>;
  roleFilterDict: Nullable<UserFilterDict[]>;
}

export const useUserManageStore = defineStore({
  id: "user-manage",
  state: (): UserManageState => ({
    userList: null,
    userFilterDict: null,
    roleFilterDict: null,
  }),
  getters: {
    // 获取用户列表
  },
  actions: {
    // role list
    saveMenuPermissionApi(params: SaveMenuPermissionParams) {
      return SaveMenuPermissionApi(params);
    },
    updatePrivilegeValue(params: UpdatePrivileParam) {
      return UpdatePrivilegeValueApi(params);
    },
    insertDataPermission(params: InsertDataPermissionParams) {
      return InsertDataPermissionApi(params);
    },
    updateDataPermission(params: InsertDataPermissionParams) {
      return UpdateDataPermissionApi(params);
    },
    getDataPermissionList(params: DataPermissionParams) {
      return DataPermissionListApi(params);
    },
    getRoleMenu(roleId: string) {
      return GetRoleMenuApi(roleId);
    },
    dataPermissionFilter(filterType: string) {
      return DataPermissionFilterApi(filterType);
    },
    deleteUserRole(params: BindUserRoleParamsModel) {
      return DeleteUserRoleApi(params);
    },
    bindUserRole(params: BindUserRoleParamsModel) {
      return BindUserRoleApi(params);
    },
    setRoleFilterDict(list: UserFilterDict[]) {
      this.roleFilterDict = list;
    },
    async enable(roleId: string) {
      return await EnableApi(roleId);
    },
    async disable(roleId: string) {
      return await DisableApi(roleId);
    },
    async getRoleDetail(roleId: string) {
      return await GetRoleDetailApi(roleId);
    },
    async createAndEdit(params: SaveRoleParamsModel) {
      return await SaveRoleApi(params);
    },
    async getRoleList(params: RoleListParamsModel) {
      return await GetRoleListApi(params);
    },
    async getRoleNameOptions() {
      return await GetRoleNameApi();
    },
    async getRoleFilterDict() {
      // 获取前四级部门(FIMC组织信息)
      const deptTreeTop4 = await GetDeptTreeTop4Api();
      // 获取经销商岗位下拉列表
      const dealerPosts = await GetDealerPostsOptionsApi();
      const roleFilterDict = [
        {
          field: "mappingDeptCodes",
          list: transFromList(deptTreeTop4),
        },
        {
          field: "mappingPostCodes",
          list: dealerPosts.map((item: PostItemModel) => {
            return {
              label: item.postName,
              value: item.postcode,
            };
          }),
        },
      ];
      this.setRoleFilterDict(roleFilterDict);
      return roleFilterDict;
    },

    // user list
    setuserFilterDict(list: UserFilterDict[]) {
      this.userFilterDict = list;
    },
    async getUserList(
      params: UserListParamsModel,
    ): Promise<UserListResModel | null> {
      return await GetUserListApi(params);
    },

    async getDealerGroupsOptions() {
      return await GetDealerGroupsOptionsApi();
    },
    async getDealerFilter(level: number, params: DealerFilterParamsModel) {
      switch (level) {
        // case 1:
        // return await GetSevenRegionApi();
        case 1:
          return await GetAllProvinceByRidApi(params.rid);
        case 2:
          return await GetCityByPidApi(params.pid);
        case 3:
          return await GetDealerByCidApi(params.cid);
        default:
          break;
      }
    },
    async getUserFilterDict() {
      // 初始状态获取下拉
      // 获取经销商投资人集团下拉列表
      const dealerGroups = await GetDealerGroupsOptionsApi();
      // 获取经销商岗位下拉列表
      const dealerPosts = await GetDealerPostsOptionsApi();
      // 获取用户角色下拉选项
      const roleOptions = await GetRoleOptionsApi();
      // 获取前四级部门(FIMC组织信息)
      const deptTreeTop4 = await GetDeptTreeTop4Api();
      const areaOption = await GetSevenRegionApi();
      console.log("transFromList==", transFromList(deptTreeTop4));
      const userFilterDict = [
        {
          field: "deptCodes",
          list: transFromList(deptTreeTop4),
        },
        {
          field: "dealerGroups",
          list: dealerGroups.map((item: DltItemModel) => {
            return {
              label: item.dlrName,
              value: item.dlrCd,
            };
          }),
        },
        {
          field: "postcodes",
          list: dealerPosts.map((item: PostItemModel) => {
            return {
              label: item.postName,
              value: item.postcode,
            };
          }),
        },
        {
          field: "roleIds",
          list: roleOptions.map((item: RoleItemModel) => {
            return {
              label: item.roleName,
              value: item.roleId,
            };
          }),
        },
        {
          field: "dealerCodes",
          list: areaOption.map((item: AreaItemModel) => {
            return {
              label: item.region,
              value: item.id,
              isLeaf: false,
            };
          }),
        },
      ];
      this.setuserFilterDict(userFilterDict);
      return userFilterDict;
    },
    async roleOptionList(type: string) {
      const roleOptions = await GetRoleOptionsApi(type);
      return roleOptions.map((item: RoleItemModel) => {
        return {
          label: item.roleName,
          value: item.roleId,
        };
      });
    },
    async userInfoUpdate(params: UserUpdateModel) {
      return await UserInfoUpdateApi(params);
    },
    async getUserDetail(account: string) {
      return await GetUserDetailApi(account);
    },
  },
});
export function UserManageStateWithOut() {
  return useUserManageStore(store);
}
