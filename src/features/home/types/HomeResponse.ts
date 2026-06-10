import { Product } from "@src/features/products/types/Product";
import { Category } from "@src/features/categories/types/Category";

export interface HomeData {
  categories: Category[];
  brands: Brand[];
  products: Product[];
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
