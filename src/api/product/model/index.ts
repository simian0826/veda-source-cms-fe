import { Dict } from "../../model/baseModel";

export type Product = {
  id?: number;
  name?: string;
  category?: string;
  imgs: string[];

  certificate?: string[];
  description?: string;
  properties: ProductProperty[];
};

export type ProductProperty = {
  name: string;
  items: Dict[];
};

export type ProductDTO = {
  additionalProperties: ProductProperty[];
} & Product;
