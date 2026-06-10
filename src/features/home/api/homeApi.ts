import fetchCategories from "@src/features/categories/api/categoryApi";
import fetchBrands from "@src/features/brands/api/brandApi";
import fetchProducts from "@src/features/products/api/productApi";
import { HomeData, Brand } from "@src/features/home/types/HomeResponse";
import { Category } from "@src/features/categories/types/Category";
import { Product } from "@src/features/products/types/Product";

const fetchHomeData = async (categoryId?: string): Promise<HomeData> => {
  const [categoriesRes, brandsRes, productsRes] = await Promise.all([
    fetchCategories(),
    fetchBrands(),
    fetchProducts(
      categoryId && categoryId !== "all" ? categoryId : undefined,
      undefined,
      1,
      20,
    ),
  ]);

  return {
    categories: (categoriesRes?.data as Category[]) ?? [],
    brands: (brandsRes?.data as Brand[]) ?? [],
    products: (productsRes?.data as Product[]) ?? [],
  };
};

export default fetchHomeData;
