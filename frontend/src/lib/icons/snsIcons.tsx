import {
  SiX,
  SiThreads,
  SiInstagram,
  SiFacebook,
  SiGithub,
  SiYoutube,
} from "react-icons/si";
import { FaLink } from "react-icons/fa";
import { ReactElement } from "react";

/**
 * SNSプラットフォーム名に応じたアイコンを返す
 * @param platform SNS名（例："twitter", "other" など）
 * @returns JSXアイコン
 */
export function getPlatformIcon(platform: string): ReactElement {
  switch (platform) {
    case "twitter":
    case "x":
      return <SiX size={20} color="#000000" />; // Xの黒
    case "instagram":
      return <SiInstagram size={20} color="#E1306C" />; // Instagramピンク
    case "facebook":
      return <SiFacebook size={20} color="#1877F2" />; // Facebookブルー
    case "threads":
      return <SiThreads size={20} color="#000000" />; // Threads黒
    case "github":
      return <SiGithub size={20} color="#333" />;
    case "youtube":
      return <SiYoutube size={20} color="#FF0000" />;
    default:
      return <FaLink size={20} color="#666" />;
  }
}
