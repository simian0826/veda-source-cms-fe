export interface ChannelGroupCodeItemModel {
  createBy: string;
  createTime: string;
  dealerId: string;
  id: number;
  isDeleted: number;
  name: string;
  revision: number;
  updateBy: string;
  updateTime: string;
}

export interface MenberItemModel {
  mobile: string;
  pinCode: string;
  userId: string;
  userName: string;
}

export interface ChannelListParams {
  groupId: number | string;
  crId: number | string;
  pageNum: number;
  pageSize: number;
}

export interface ChannelResItemModel {
  codeId: number;
  name: string;
  qrCode: string;
  qrCodeConfigId: string;
  customerCount: number;
  createTime: string;
}
export interface ChannelResModel {
  total: number;
  list: ChannelResItemModel[];
}

export interface CustomerListItemModel {
  addVTime: string;
  clcCodeId: number;
  crId: string;
  crName: string;
  createTime: string;
  customerName: string;
  dealerId: string;
  id: number;
  wxId: string;
  wxNickName: string;
}
export interface CustomerListResModel {
  total: number;
  list: CustomerListItemModel[];
}
