import { PublicPhoto } from "@/types/public/photo";
import PhotoCardFrame from "./PhotoCardFrame";
import PhotoDetails from "./PhotoDetails";
import Link from "next/link";

export default function PhotoFlipBack({ photo }: { photo: PublicPhoto }) {
  return (
    <div className="absolute inset-0 backface-hidden rotate-y-180">
      <PhotoCardFrame>
        {/* 同じサイズの上に重ねる */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative" style={{ width: "100%", height: "100%" }}>
            {/* 画像が object-contain で描画されるサイズを再現 */}
            <div
              className="absolute left-0 top-0 right-0 bottom-0 m-auto p-1"
              style={{
                aspectRatio: photo.aspectRatio,
                maxWidth: "100%",
                maxHeight: "100%",
                width: "auto",
                height: "auto",
              }}
            >
              <div className="w-full h-full flex flex-col justify-between text-center bg-sky-50 shadow-lg py-2">
                <PhotoDetails photo={photo} />
                <div>
                  <Link
                    href={`/photo/${photo.id}`}
                    className="text-blue-600 hover:text-blue-800 underline text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    詳細を見る
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PhotoCardFrame>
    </div>
  );
}
