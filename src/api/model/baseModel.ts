export interface BasicPageParams {
  page: number;
  pageSize: number;
}

export type Pagenigation = BasicPageParams & {
  total: number;
};

export type ListRequest<T> = T & BasicPageParams;

export type ListResult<T> = {
  list: T[];
  total: number;
};

export interface BasicRequestPageParams {
  pageNum: number;
  pageSize: number;
  orderByColumn?: string;
  isAsc?: string;
}

export interface BasicFetchResult<T extends any> {
  records: T[];
  total: number;
}

export interface OptionModel {
  value?: string | number;
  label: string;
  children?: OptionModel[];
}

export interface FormListModel {
  isSearch?: boolean | undefined;
  label?: string;
  field: string;
  type: string;
  dict?: string;
  width?: string;
  options?: OptionModel[];
  hasChange?: string;
  notShow?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export type SelectOptionsModel = Dict;

export type Dict = {
  label: string;
  value: string;
};
