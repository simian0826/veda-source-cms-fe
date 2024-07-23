export interface DealerFilterParamsModel {
  pid: string | number;
  cid: string | number;
  rid: string | number;
}
export interface DealerItemModel {
  name: string;
  code: string;
}
export interface AreaItemModel {
  region: string;
  id: string;
}
export interface DeptFilterDictModel {
  childrenDept: DeptFilterDictModel[];
  deptCode: string;
  deptName: string;
  dlrCd: string;
  parentCode: string;
}
export interface RoleItemModel {
  roleName: string;
  roleId: string;
}
export interface DltItemModel {
  dlrName: string;
  dlrCd: string;
}
export interface PostItemModel {
  postName: string;
  postcode: string;
}
export interface LisItem {
  account: string;
  accountCreationTime: string;
  deptNames: string;
  dlrCd: string;
  dlrName: string;
  email: string;
  mobile: string;
  postNames: string;
  roleNames: string;
  userStatus: number;
  userType: number;
  username: string;
}
export interface UserListResModel {
  endRow: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  list: LisItem[];
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
export interface UserListParamsModel {
  account?: string;
  dealerCodes?: string[];
  dealerGroups?: number[];
  deptCodes?: string[];
  limit: number;
  postcodes?: string[];
  roleIds?: (number | string)[];
  start: number;
  userType?: number[];
  username?: string;
  unRoleId?: string;
}

export interface UserUpdateModel {
  account: string;
  roleIds: number[] | string[];
}

export interface RoleItemModel {
  account: string;
  roleId: string;
  roleName: string;
}
export interface DetailResModel {
  account: string;
  accountCreationTime: string;
  mobile: string;
  orgInfo: string;
  postName: string;
  userRoles: RoleItemModel[];
  userStatus: number;
  userType: number;
  username: string;
}

export interface DetailModel {
  account: string;
  accountCreationTime: string;
  mobile: string;
  orgInfo: string;
  postName: string;
  userRoles: string[];
  userStatus: string;
  userType: string;
  username: string;
}
