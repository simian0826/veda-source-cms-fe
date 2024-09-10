/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface SSOLoginParams {
  code: string;
}

export interface RoleInfo {
  roleName: string;
  roleSubType?: string;
  roleId: number;
  roleType: string;
}

export interface DealerInfo {
  regionCode?: string;
  regionName?: string;
  provinceCode?: string;
  provinceName?: string;
  cityCode?: string;
  cityName?: string;
  dealerCode: string;
  dealerName?: string;
}
/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  username: string;
  token: string;
  role: RoleInfo;
}

/**
 * @description: Get user information return value
 */
export interface postInfo {
  postCode: string;
  postName: string;
}
export interface GetUserInfoModel {
  userId?: string | number; // 用户id
  username?: string; // 用户名
  account?: string; //用户账号
  deptName?: string; // 部门名称 - FTMC组织信息
  deptCode?: string; // 部门代码
  roles?: RoleInfo[]; //角色列表，第一个是主岗角色
  posts?: postInfo[]; // 岗位
  phone?: string | number;
  dealerInfo?: DealerInfo; //经销商信息
  userType?: number; //用户类型
  roleName?: string; // 角色名称
  roleType?: string; // 角色类型
  roleSubType?: string | number; //角色id
  officeName?: string; // 科室名称
  officeCode?: string; // 科室代码
}

export type ChangePasswordDTO = {
  oldPassword: string;
  newPassword: string;
};
