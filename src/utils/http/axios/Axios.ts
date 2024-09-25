import type {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import type { RequestOptions } from "../../../../types/axios";
import type { CreateAxiosOptions } from "./axiosTransform";
import axios from "axios";
import qs from "qs";
import { AxiosCanceler } from "./axiosCancel";
import { isFunction } from "/@/utils/is";
import { cloneDeep } from "lodash-es";
import { ContentTypeEnum } from "/@/enums/httpEnum";
import { RequestEnum } from "/@/enums/httpEnum";
import { Gen2Result } from "../../types";
import { message } from "ant-design-vue";
import { useGlobSetting } from "/@/hooks/setting";

export * from "./axiosTransform";
const globSetting = useGlobSetting();

const urlPrefix = globSetting.urlPrefix;

/**
 * @description:  axios module
 */
export class VAxios {
  private axiosInstance: AxiosInstance;
  private readonly options: CreateAxiosOptions;

  constructor(options: CreateAxiosOptions) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  /**
   * @description:  Create axios instance
   */
  private createAxios(config: CreateAxiosOptions): void {
    this.axiosInstance = axios.create(config);
  }

  private getTransform() {
    const { transform } = this.options;
    return transform;
  }

  getAxios(): AxiosInstance {
    return this.axiosInstance;
  }

  /**
   * @description: Reconfigure axios
   */
  configAxios(config: CreateAxiosOptions) {
    if (!this.axiosInstance) {
      return;
    }
    this.createAxios(config);
  }

  /**
   * @description: Set general header
   */
  setHeader(headers: any): void {
    if (!this.axiosInstance) {
      return;
    }
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }

  /**
   * @description: Interceptor configuration
   */
  private setupInterceptors() {
    const transform = this.getTransform();
    if (!transform) {
      return;
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform;

    const axiosCanceler = new AxiosCanceler();

    // Request interceptor configuration processing
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // If cancel repeat request is turned on, then cancel repeat request is prohibited
        const requestOptions =
          (config as unknown as any).requestOptions ??
          this.options.requestOptions;
        const ignoreCancelToken = requestOptions?.ignoreCancelToken ?? true;

        !ignoreCancelToken && axiosCanceler.addPending(config);

        if (requestInterceptors && isFunction(requestInterceptors)) {
          config = requestInterceptors(
            config,
            this.options,
          ) as InternalAxiosRequestConfig;
        }
        return config;
      },
      undefined,
    );

    // Request interceptor error capture
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(
        undefined,
        requestInterceptorsCatch,
      );

    // Response result interceptor processing
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config);
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }
      return res;
    }, undefined);

    // Response result interceptor error capture
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(
        undefined,
        responseInterceptorsCatch,
      );
  }

  /**
   * @description:  File Upload
   */
  uploadFile<T = any>(config: AxiosRequestConfig, params: FormData) {
    // const formData = new window.FormData();

    // if (params.data) {
    //   Object.keys(params.data).forEach((key) => {
    //     if (!params.data) return;
    //     const value = params.data[key];
    //     if (Array.isArray(value)) {
    //       value.forEach((item) => {
    //         formData.append(`${key}[]`, item);
    //       });
    //       return;
    //     }

    //     formData.append(key, params.data[key]);
    //   });
    // }
    // formData.append(params.name || "file", params.file, params.filename);
    // const customParams = omit(params, "file", "filename", "file");

    // Object.keys(customParams).forEach((key) => {
    //   formData.append(key, customParams[key]);
    // });

    const transform = this.getTransform();
    const { requestCatchHook, transformRequestHook } = transform || {};
    config.url = `${urlPrefix}${config.url}`;

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Gen2Result>>({
          ...config,
          method: "POST",
          data: params,
          headers: {
            "Content-type": ContentTypeEnum.FORM_DATA,
            ignoreCancelToken: true,
          },
        })
        .then((res: AxiosResponse<Gen2Result>) => {
          if (transformRequestHook && isFunction(transformRequestHook)) {
            try {
              const ret = transformRequestHook(res, {});
              resolve(ret);
            } catch (err) {
              reject(err || new Error("request error!"));
            }
            return;
          }
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, {}));
            return;
          }
          if (axios.isAxiosError(e)) {
            // rewrite error message from axios in here
          }
          reject(e);
        });
    });
  }

  // support form-data
  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.headers;
    const contentType = headers?.["Content-Type"] || headers?.["content-type"];

    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, "data") ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config;
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: "brackets" }),
    };
  }

  get<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request({ ...config, method: "GET" }, options);
  }

  post<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request({ ...config, method: "POST" }, options);
  }

  put<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request({ ...config, method: "PUT" }, options);
  }

  delete<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request({ ...config, method: "DELETE" }, options);
  }

  request<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {
    let conf: CreateAxiosOptions = cloneDeep(config);
    const transform = this.getTransform();

    const { requestOptions } = this.options;

    const opt: RequestOptions = Object.assign({}, requestOptions, options);

    const { beforeRequestHook, requestCatchHook, transformRequestHook } =
      transform || {};
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }
    conf.requestOptions = opt;

    conf = this.supportFormData(conf);

    if (conf.responseType === "blob") {
      message.loading({
        content: "文件下载中...",
        duration: 0,
      });
    }
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Gen2Result>>(conf)
        .then((res: AxiosResponse<Gen2Result>) => {
          if (transformRequestHook && isFunction(transformRequestHook)) {
            try {
              const ret = transformRequestHook(res, opt);
              resolve(ret);
            } catch (err) {
              reject(err || new Error("request error!"));
            }
            return;
          }
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt));
            return;
          }
          if (axios.isAxiosError(e)) {
            // rewrite error message from axios in here
          }
          reject(e);
        });
    });
  }
}
