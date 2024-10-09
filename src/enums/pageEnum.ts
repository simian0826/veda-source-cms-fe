export enum PageEnum {
  // basic login path
  BASE_LOGIN = "/login",
  // sso login path
  SSO_LOGIN = "/ssoLogin",
  // basic home path
  // BASE_HOME = "/dashboard/index",
  BASE_HOME = "/general/settings",
  // product
  PRODUCT_PAGE = "/product",
  // error page path
  ERROR_PAGE = "/exception",
  // error log page path
  ERROR_LOG_PAGE = "/error-log/list",

  SSO_LOGIN_PAGE = "https://auth-sit.ftms.com.cn/portal-sso/oauth/authorize?response_type=code&state=state&redirect_uri=https://adms2-sit.ftms.com.cn/gen2/ssoLogin&scope=read&client_id=adms2_sit",
  SSO_LOGOUT_PAGE = "https://a-sit.ftms.com.cn/home",
}
