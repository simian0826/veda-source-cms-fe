// Interface data format used to return a unified format
import { ResultEnum } from "/@/enums/httpEnum";
import dotEnv from "dotenv";
import type { DotenvParseOutput } from "dotenv";
export function resultSuccess<T = Recordable>(
  result: T,
  { message = "ok" } = {},
) {
  return {
    code: ResultEnum.SUCCESS,
    data: result,
    message,
    type: "success",
  };
}

export function resultPageSuccess<T = any>(
  page: number,
  pageSize: number,
  list: T[],
  { message = "ok" } = {},
) {
  const pageData = pagination(page, pageSize, list);

  return {
    ...resultSuccess({
      items: pageData,
      total: list.length,
    }),
    message,
  };
}

export function resultError(
  message = "Request failed",
  { code = ResultEnum.ERROR, result = null } = {},
) {
  return {
    code,
    data: result,
    message,
    type: "error",
  };
}

export function pagination<T = any>(
  pageNo: number,
  pageSize: number,
  array: T[],
): T[] {
  const offset = (pageNo - 1) * Number(pageSize);
  return offset + Number(pageSize) >= array.length
    ? array.slice(offset, array.length)
    : array.slice(offset, offset + Number(pageSize));
}

export interface requestParams {
  method: string;
  body: any;
  headers?: { authorization?: string };
  query: any;
}

/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 *
 */
export function getRequestToken({
  headers,
}: requestParams): string | undefined {
  return headers?.authorization;
}

export function getUrlPrefix(): DotenvParseOutput | undefined {
  const environment = process.env.NODE_ENV;
  const filePath = {
    production: ".env.production",
    development: ".env.development",
    sit: ".env.sit",
  };
  // let filePath = "";
  // switch (environment) {
  //   case "production": {
  //     filePath = ".env.production";
  //     break;
  //   }
  //   case "development": {
  //     filePath = ".env.development";
  //     break;
  //   }
  //   default: {
  //     filePath = ".env";
  //     break;
  //   }
  // }

  return dotEnv.config({ path: filePath[environment as string] }).parsed;
}
