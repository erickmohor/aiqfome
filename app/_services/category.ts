import { ICategory } from "../_components/category-card";
import { categories as mockupCategories } from "../_mockups/categories";

interface IGetCategoriesAndProductsFromEstablishmentRequest {
  establishmentId: string;
}

interface IGetCategoriesAndProductsFromEstablishmentResponse {
  categories: ICategory[];
}

async function getCategoriesAndProductsFromEstablishment({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  establishmentId,
}: IGetCategoriesAndProductsFromEstablishmentRequest): Promise<IGetCategoriesAndProductsFromEstablishmentResponse> {
  // In this case, using an API you call the API passing establishmentId as params
  const categories: ICategory[] = mockupCategories;

  return { categories };
}

export const categoryService = {
  getCategoriesAndProductsFromEstablishment,
};
