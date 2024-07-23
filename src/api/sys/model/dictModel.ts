export type DictResult = Record<string, DictItem[]>;
export interface DictItem {
  value: string;
  label: string;
  code: string;
  children?: DictItem[];
}
