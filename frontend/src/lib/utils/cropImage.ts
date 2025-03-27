/**
 * トリミングする処理
 * @param imageSrc トリミング対象の画像URL
 * @param pixelCrop トリミング範囲
 * @returns 画像Blob
 */
export const getCroppedImage = async (
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<Blob> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas"); // キャンバスを作成
  const context = canvas.getContext("2d"); // 2D描画用

  // 領域指定
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  context?.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, rejects) => {
    canvas.toBlob((file) => {
      if (file) resolve(file);
      else rejects(new Error("Blob作成に失敗しました"));
    }, "image/web");
  });
};

/**
 * src URL から<img>を生成して読み込む
 * @param url URLの文字列
 */
const createImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (err) => reject(err));

    // CORS対策
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
};
