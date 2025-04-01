import { PhotoDetailDTO, UploadResponseDTO } from "@/types/dto/photo";
import { PhotoDetail } from "@/types/photo";

/**
 * 型変換（DTO -> types)
 * @param dto PhotoDetailDTO
 * @returns PhotoDetail
 */
export const convertPhotoDetail = (dto: PhotoDetailDTO): PhotoDetail => ({
  id: dto.id,
  imageUrl: dto.image_url,
  aspectRatio: dto.aspect_ratio,
  title: dto.title,
  description: dto.description,
  categoryId: dto.category_id,
  userId: dto.user_id,
  isVisible: dto.is_visible,
  takenAt: dto.taken_at,
  tags: dto.tags,
});

/**
 * 配列変換用
 */
export const convertPhotoDetailArray = (
  data: PhotoDetailDTO[]
): PhotoDetail[] => data.map(convertPhotoDetail);

/**
 * アップロード後のid配列変換
 */
export const convertUploadResponse = (
  dto: UploadResponseDTO
): { photoIds: number[] } => {
  return {
    photoIds: dto.photo_ids,
  };
};
