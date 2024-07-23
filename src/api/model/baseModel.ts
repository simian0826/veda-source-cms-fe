export interface BasicPageParams {
  current: number;
  pageSize: number;
}

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

export interface SelectOptionsModel {
  label: string;
  value: string;
}
