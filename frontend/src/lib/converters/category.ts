import { CategoryDTO } from "@/types/dto/category";
import { Category } from "@/types/category";

/**
 * 型変換（DTO -> types)
 * @param dto CategoryDTO
 * @returns Category
 */
export const convertCategory = (dto: CategoryDTO): Category => ({
  id: dto.id,
  name: dto.name,
  sortOrder: dto.sort_order,
});

/**
 * 配列変換用
 */
export const convertCategoryArray = (data: CategoryDTO[]): Category[] =>
  data.map(convertCategory);
