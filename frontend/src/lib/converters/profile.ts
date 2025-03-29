import { UserProfileResponseDTO, SNSLinkDTO } from "@/types/dto/profile";
import { Profile, SNSLink } from "@/types/profile";

/**
 * SNSリンクをDTOから表示用に変換
 */
function convertSNSLinks(links: SNSLinkDTO[]): SNSLink[] {
  return links.map((link) => ({
    platform: link.platform,
    platformName: link.platform_name,
    url: link.url,
  }));
}

/**
 * DTO -> Profile型に変換
 */
export function convertToProfile(dto: UserProfileResponseDTO): Profile {
  return {
    displayName: dto.display_name,
    avatar: dto.avatar,
    coverImage: dto.cover_image,
    bio: dto.bio,
    jobTitle: dto.job_title,
    website: dto.website,
    location: dto.location,
    birthPlace: dto.birth_place,
    snsLinks: convertSNSLinks(dto.sns_links),
    isPublic: dto.is_public,
  };
}
