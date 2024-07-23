export interface OptionObj {
  label: string;
  value: string | number;
}
export interface RoleCreateModel {
  roleId: string;
  roleName: string;
  roleType: string;
  mappingDeptCodes: string[];
  mappingPostCodes: string[];
  remark: string;
  status: string;
}
export interface RoleCreateListModel {
  roleTypeList: OptionObj[];
  mappingDeptCodesList: OptionObj[];
  mappingPostCodesList: OptionObj[];
  statusList: OptionObj[];
}
export interface ConfigCreateModel {
  configName: string;
  apiPostName: string;
  configId: string;
  permissionLevelInd: string;
  permissionTableName: string;
  permissionTableRemark: string;
  permissionColumnName: string;
  permissionColumnRemark: string;
  permissionColumnTypeInd: number | undefined;
  permissionJoinMethodInd: string;
  permissionRemark: string;
  permissionLevelList: OptionObj[];
  permissionColumnTypeIndList: OptionObj[];
  permissionJoinMethodIndList: OptionObj[];
}
export interface DetailModel {
  roleId: string;
  roleName: string;
  roleType: string;
  mappingDeptCodes: string[][];
  mappingPostCodes: string[];
  remark: string;
  status: string;
}
export interface AdditionalPropModel {
  roleId: number;
  roleName: string;
  roleType: string;
}
export interface RoleNameModel {
  "0"?: AdditionalPropModel[];
  "1"?: AdditionalPropModel[];
  "2"?: AdditionalPropModel[];
  "3"?: AdditionalPropModel[];
  "4"?: AdditionalPropModel[];
}

export interface MappingDeptModel {
  deptCode: string;
  deptName: string;
}
export interface MappingPostModel {
  isMajor: string;
  postName: string;
  postcode: string;
}
export interface RoleDetailModel {
  mappingDept: MappingDeptModel[];
  mappingPost: MappingPostModel[];
  remark: string;
  roleId: number;
  roleName: string;
  roleStatus: string;
  roleType: string;
}

export interface RoleListParamsModel {
  limit: number;
  mappingDeptCodes?: string[];
  mappingPostCodes?: string[];
  roleIds?: number[];
  roleTypes?: string[];
  start: number;
}

export interface RoleListResItemModel {
  createTime: string;
  mappingDeptName: string;
  mappingPostName: string;
  remark: string;
  roleId: number;
  roleName: string;
  roleType: string;
  status: string;
}
export interface RoleListResModel {
  endRow: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  list: RoleListResItemModel[];
  navigateFirstPage: number;
  navigateLastPage: number;
  navigatePages: number;
  navigatepageNums: number[];
  nextPage: number;
  pageNum: number;
  pageSize: number;
  pages: number;
  prePage: number;
  size: number;
  startRow: number;
  total: number;
}

export interface SaveRoleParamsModel {
  mappingDeptCodes: string[];
  mappingPostCodes: string[];
  remark: string;
  roleId?: string;
  roleName: string;
  roleType: string;
  status: string;
}

export interface BindUserRoleParamsModel {
  roleId: string;
  userAccountList: string[];
}

export interface RoleMenuModel {
  checkFlag: boolean;
  children: RoleMenuModel[];
  key: string;
  menuId: number;
  title: string;
}

export interface DataPermissionParams {
  configName?: string[];
  permissionLevelInd?: string[];
  permissionTableName?: string[];
  roleId: string | number;
}

export interface DataPermissionResItemModel {
  apiPostName: string;
  checkFlag: boolean;
  configId: number;
  configName: string;
  permissionColumnName: string;
  permissionLevelInd: number;
  permissionRemark: string;
  permissionTableName: string;
  privilegeValue: string;
  permissionColumnTypeInd: number;
  permissionJoinMethodInd: string;
}
export interface InsertDataPermissionParams {
  apiPostName: string;
  configId: string;
  configName: string;
  // masterDataTypeInd: string;
  permissionColumnName: string;
  permissionColumnRemark: string;
  permissionLevelInd: string;
  permissionRemark: string;
  permissionTableName: string;
  permissionJoinMethodInd: string;
  permissionColumnTypeInd: number | undefined;
  permissionTableRemark: string;
}

export interface UpdatePrivileParam {
  permissionConfigId: string;
  privilegeValue: string;
  roleId: string;
}

export interface SaveMenuPermissionParams {
  menuId: string[];
  permissionConfigId: number[] | string[];
  roleId: string;
}
