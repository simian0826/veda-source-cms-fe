export interface GroupCodeModel {
  createBy: string;
  createTime: string;
  dealerId: string;
  groupName: string;
  id: number;
  isDeleted: number;
  revision: number;
  updateBy: string;
  updateTime: string;
}

export interface GroupCodesParams {
  pageNum: number;
  pageSize: number;
  groupCodeName: string;
  groupId?: number;
}
export interface GroupChatsParams {
  pageNum: number;
  pageSize: number;
  groupName: string;
}
export interface GroupChatsResItemModel {
  id: number;
  customerNum: number;
  memberNum: number;
  chatId: string;
  owner: string;
  name: string;
  ownerName: string;
  status: number;
  notice: string;
  createTime: string;
}
export interface GroupChatsResModel {
  total: number;
  list: GroupChatsResItemModel[];
}
interface tag {
  groupCodeId: number;
  tagId: number;
  name: string;
  select: boolean;
}
export interface GroupCodesList {
  id: number;
  groupCodeName: string;
  codeUrl: string;
  groupId: number;
  groupName: string;
  // autoCreateRoom: number,
  roomBaseName: string;
  roomBaseId: number;
  chatGroupNum: number;
  // chatGroupMemberTotalNum: number,
  // customerTotalNum: number,
  // memberTotalNum: number,
  createTime: string;
  tags: tag[];
}
export interface GroupCodesResponse {
  total: number;
  list: GroupCodesList[];
}

export interface TagsModel {
  id: number;
  groupId: number;
  name: string;
  select: boolean;
}
export interface TagGroupItemModel {
  id: number;
  dealerId: string;
  ewGroupId: number;
  groupName: string;
  ewTags: TagsModel[];
}

export interface TagModel {
  name: string;
}
export interface AddTagGroupParams {
  ewTags: TagModel[];
  groupName: string;
}

export interface CodeTagsModel {
  groupCodeId: number;
  name: string;
  tagId: number;
}
export interface NewGroupCodesParams {
  chatIds: string[];
  codeGroupId: string;
  groupCodeName: string;
  id?: number;
  roomBaseId: number;
  roomBaseName: string;
  tags: CodeTagsModel[];
}

export interface UserModel {
  dealerId: string;
  pinCode: string;
  userId: string;
  username: string;
}
export interface GroupCodeDetailModel {
  autoCreateRoom: number;
  chatGroupMemberTotalNum: number;
  chatGroupNum: number;
  codeUrl: string;
  createTime: string;
  customerTotalNum: number;
  // exitChatGroupTotalMemberNum: number;
  groupChats: GroupChatsResItemModel[];
  groupCodeName: string;
  groupId: number;
  groupName: string;
  id: number;
  // joinChatGroupTotalMemberNum: number;
  // memberTotalNum: number;
  // oldChatGroupMemberTotalNum: number;
  roomBaseId: number;
  roomBaseName: string;
  tags: CodeTagsModel[];
  // todayJoinMemberTotalNum: number;
  // todayQuitMemberTotalNum: number;
  users: UserModel[];
}

export interface UpdateTagItemModel {
  // groupId: number;
  // id: number;
  // del: number;
  name: string;
}
export interface UpdateTagsParams {
  id: number;
  name: string;
  ewTagDTOS: UpdateTagItemModel[];
}
