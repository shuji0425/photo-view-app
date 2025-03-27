/**
 * WebPにリサイズ＆変換する処理
 */
export const useImageProcessor = () => {
  /**
   * WebPに画像を変換&リサイズ
   * @param file 画像ファイル
   * @returns WebP変換後の画像ファイル
   */
  const convertToWebP = async (file: File): Promise<File> => {
    // ブラウザ内で画像読み込み
    const imageBitmap = await createImageBitmap(file);

    // 画像をリサイズ
    const maxSize = 1024;
    const ratio = Math.min(
      maxSize / imageBitmap.width,
      maxSize / imageBitmap.height,
      1
    );
    const width = Math.floor(imageBitmap.width * ratio);
    const height = Math.floor(imageBitmap.height * ratio);

    // canvasを生成してリサイズ描画
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas context を取得できません");

    context.drawImage(imageBitmap, 0, 0, width, height);

    // canvas から WebP Blobに変換
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject("WebP変換に失敗しました")),
        "image/webp",
        0.8
      );
    });

    // WebP Blob をファイルに変換
    const webpFile = new File([blob], `${Date.now()}.webp`, {
      type: "image/webp",
    });

    return webpFile;
  };

  /**
   * 複数画像をまとめてWebPに変換&リサイズ
   * @param files 複数ファイル
   * @returns WebPに変換されたファイル配列
   */
  const convertMultiple = async (files: File[]): Promise<File[]> => {
    return Promise.all(files.map(convertToWebP));
  };

  return { convertToWebP, convertMultiple };
};
