import type { ErrorMessageMode } from "/#/axios";
import { defineStore } from "pinia";
import { store } from "/@/store";
import { PageEnum } from "/@/enums/pageEnum";
import {
  CURRENT_ROLES_KEY,
  ROLES_KEY,
  TOKEN_KEY,
  USER_INFO_KEY,
  LOGIN_TYPE_KEY,
} from "/@/enums/cacheEnum";
import { clearAuthCache, getAuthCache, setAuthCache } from "/@/utils/auth";
import {
  GetUserInfoModel,
  LoginParams,
  RoleInfo,
  SSOLoginParams,
} from "/@/api/sys/model/userModel";
import {
  changeRoleApi,
  doLogoutApi,
  getUserInfoApi,
  loginApi,
  ssoLoginApi,
  refreshTokenApi,
  doSSOLogoutApi,
  fetchExternalSSOUrlApi,
} from "/@/api/sys/user";
import { useMessage } from "/@/hooks/web/useMessage";
import { router } from "/@/router";
import { usePermissionStore } from "/@/store/modules/permission";
import { RouteRecordRaw } from "vue-router";
import { PAGE_NOT_FOUND_ROUTE } from "/@/router/routes/basic";
import { isArray /** isEmpty, isNull */ } from "/@/utils/is";
import { Modal, List } from "ant-design-vue";
import { h, ref, toRaw } from "vue";
import { lighten } from "/@/utils/color";
import { ColorEnum } from "/@/enums/colorEnum";
import { LoginTypeEnum } from "/@/enums/appEnum";

interface UserState {
  userInfo: Nullable<GetUserInfoModel>;
  token?: string;
  roleList: RoleInfo[];
  currentRole: Nullable<RoleInfo>;
  sessionTimeout?: boolean;
  lastUpdateTime: number;
  roleType?: string;
  loginType?: LoginTypeEnum;
}

export const useUserStore = defineStore({
  id: "app-user",
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // roleList
    roleList: [],
    currentRole: null,
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
    loginType: undefined,
  }),
  getters: {
    getUserInfo(): GetUserInfoModel {
      return (
        this.userInfo || getAuthCache<GetUserInfoModel>(USER_INFO_KEY) || {}
      );
    },

    getLoginType(): LoginTypeEnum {
      return (
        this.loginType ||
        getAuthCache<LoginTypeEnum>(LOGIN_TYPE_KEY) ||
        LoginTypeEnum.ACCOUT_LOGIN
      );
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY);
    },
    getRoleList(): RoleInfo[] {
      return this.roleList.length > 0
        ? this.roleList
        : getAuthCache<RoleInfo[]>(ROLES_KEY);
    },
    getCurrentRole(): Nullable<RoleInfo> {
      return this.currentRole || getAuthCache<RoleInfo>(CURRENT_ROLES_KEY);
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info;
      setAuthCache(TOKEN_KEY, info);
    },
    setLoginType(loginType?: LoginTypeEnum) {
      this.loginType = loginType ?? LoginTypeEnum.ACCOUT_LOGIN;
      setAuthCache(LOGIN_TYPE_KEY, loginType);
    },
    setRoleList(roleList: RoleInfo[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setCurrentRole(role: Nullable<RoleInfo>) {
      this.currentRole = role;

      setAuthCache(CURRENT_ROLES_KEY, role);
    },
    setUserInfo(info: GetUserInfoModel | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    getCurrentRoleAction() {
      return this.currentRole || getAuthCache<RoleInfo>(CURRENT_ROLES_KEY);
    },
    fetchUserInfoAction(): GetUserInfoModel {
      return (
        this.userInfo || getAuthCache<GetUserInfoModel>(USER_INFO_KEY) || {}
      );
    },
    async refreshTokenAction() {
      try {
        const newToken = await refreshTokenApi();
        this.setToken(newToken);
        return true;
      } catch (err) {
        throw new Error("登录凭证更新失败");
      }
    },
    resetState() {
      this.setCurrentRole(null);
      this.userInfo = null;
      this.token = "";
      this.roleList = [];
      this.sessionTimeout = false;
    },
    /**
     * @description: login
     */
    async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const data = await loginApi(loginParams, mode);

        const { token } = data;

        // save token
        this.setToken(token);
        this.setLoginType(LoginTypeEnum.ACCOUT_LOGIN);
        this.setCurrentRole(null);
        return this.afterLoginAction({ goHome });
      } catch (error) {
        return Promise.reject(error);
      }
    },

    /**
     * @description: sso login action
     */
    async ssoLoginAction(
      params: SSOLoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...ssoLoginParams } = params;
        const data = await ssoLoginApi(ssoLoginParams, mode);
        const { token } = data;
        // save token
        this.setToken(token);
        this.setLoginType(LoginTypeEnum.SSO_LOGIN);
        this.setCurrentRole(null);

        return this.afterLoginAction({ goHome });
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * @description 切换角色
     */
    async switchRoleAction() {
      const ListItem = List.Item;
      const selectedRole = ref<RoleInfo | null>(this.getCurrentRoleAction());

      const renderRoleList = ({ item }) => {
        return h(
          ListItem,
          {
            style: {
              cursor: "pointer",
            },
            onClick: () => {
              selectedRole.value = item;
            },
          },
          h(
            "span",
            {
              style: {
                color:
                  selectedRole.value?.roleId === item.roleId
                    ? lighten(ColorEnum.PRIMARY, 30)
                    : "black",
              },
            },
            { default: () => item.roleName },
          ),
        );
      };

      Modal.info({
        title: "切换角色",
        icon: null,
        content: h(
          List,
          { dataSource: this.getRoleList },
          { renderItem: renderRoleList, default: () => {} },
        ),
        maskClosable: true,
        closable: true,

        okText: "切换",
        onOk: async () => {
          if (
            this.getCurrentRoleAction()?.roleId === selectedRole.value?.roleId
          ) {
            return;
          }
          if (
            await this.changeTokenByRoleAction(
              selectedRole.value?.roleId as number,
            )
          ) {
            const permissionStore = usePermissionStore();
            permissionStore.setDynamicAddedRoute(false);
            this.setCurrentRole(toRaw(selectedRole.value));
            await this.afterLoginAction({ goHome: true });
            window.location.reload();
          }
          // const permissionStore = usePermissionStore();
          // permissionStore.setDynamicAddedRoute(false);
          // this.setCurrentRole(toRaw(selectedRole.value));
          // this.afterLoginAction({ goHome: true });
        },
      });
    },

    async changeTokenByRoleAction(roleId: number) {
      try {
        const token = await changeRoleApi({
          roleId,
        });

        this.setToken(token);
        return true;
      } catch (e) {
        return false;
      }
    },

    async afterLoginAction(
      params: {
        goHome?: boolean;
      } = { goHome: false },
    ): Promise<GetUserInfoModel | null> {
      const { goHome } = params;
      if (!this.getToken) return null;
      router.replace(PageEnum.BASE_HOME);
      return null;
      // FIXME: no need for getting user info
      const userInfo = await this.getUserInfoAction();

      const sessionTimeout = this.getSessionTimeout;
      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        const permissionStore = usePermissionStore();
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction();
          routes.forEach((route) => {
            router.addRoute(route as RouteRecordRaw);
          });
          router.addRoute(PAGE_NOT_FOUND_ROUTE as RouteRecordRaw);
          permissionStore.setDynamicAddedRoute(true);
        }
        if (goHome) {
          await router.replace(PageEnum.BASE_HOME);
        }
      }
      return userInfo;
    },
    async getUserInfoAction(): Promise<GetUserInfoModel> {
      // let userInfo: GetUserInfoModel;
      console.log(this.fetchUserInfoAction());
      const userInfo = await getUserInfoApi();
      this.setUserInfo(toRaw(userInfo));

      // if (!isNull(this.getUserInfo) && !isEmpty(this.getUserInfo)) {
      //   userInfo = this.getUserInfo;
      // } else {
      //   userInfo = await getUserInfoApi();

      //   this.setUserInfo(toRaw(userInfo));
      // }

      const { roles = [] } = userInfo;

      if (isArray(roles)) {
        this.setRoleList(roles);
        if (!this.getCurrentRoleAction()) {
          this.setCurrentRole(roles[0]);
        } else {
          //处理pinia state置空之后，还是有值的情况，重新set current
          this.setCurrentRole(this.getCurrentRoleAction());
        }
      } else {
        userInfo.roles = [];
        this.setRoleList([]);
      }
      return userInfo;
    },

    /**
     * @description: external sso url
     */
    async fetchExternalSSOUrlAction(system: string) {
      try {
        const url = await fetchExternalSSOUrlApi({
          system: system,
        });
        if (url) {
          window.open(url, "_blank");
          router.back();
        }
      } catch (e) {
        router.back();
      }
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      const permissionStore = usePermissionStore();

      if (this.token) {
        try {
          if (this.getLoginType === LoginTypeEnum.ACCOUT_LOGIN) {
            await doLogoutApi();
          } else {
            await doSSOLogoutApi();
          }
        } catch {
          console.error("注销Token失败");
        } finally {
          this.setToken(undefined);
          this.setUserInfo(null);
          this.resetState();
          await clearAuthCache();
          this.setSessionTimeout(false);
          permissionStore.setDynamicAddedRoute(false);
          if (goLogin) {
            this.getLoginType === LoginTypeEnum.ACCOUT_LOGIN
              ? router.push(PageEnum.BASE_LOGIN)
              : (window.location.href = PageEnum.SSO_LOGOUT_PAGE);
          }
        }
      } else {
        if (goLogin) {
          this.getLoginType === LoginTypeEnum.ACCOUT_LOGIN
            ? router.push(PageEnum.BASE_LOGIN)
            : (window.location.href = PageEnum.SSO_LOGOUT_PAGE);
        }
      }
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      createConfirm({
        iconType: "warning",
        title: "温馨提醒",
        content: "是否确认退出系统",
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
