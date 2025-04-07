"use client";

import { useMetadataPolicyForm } from "@/hooks/setting/useMetadataPolicyForm";
import { MetadataPolicySchema } from "@/lib/schema/metadataPolicySchema";
import { BackButton } from "../ui/BackButton";
import { ActionButton } from "../ui/ActionButton";

type Props = {
  defaultValues: MetadataPolicySchema;
  onSubmit: (data: MetadataPolicySchema) => Promise<void>;
};

/**
 * メタデータ表示ポリシー設定フォーム
 */
export const MetadataPolicyForm = ({ defaultValues, onSubmit }: Props) => {
  const { register, handleSubmit, isSubmitting } = useMetadataPolicyForm({
    defaultValues,
  });

  const items: { key: keyof MetadataPolicySchema; label: string }[] = [
    { key: "showCameraMake", label: "カメラメーカー" },
    { key: "showCameraModel", label: "カメラ機種" },
    { key: "showLensModel", label: "使用レンズ" },
    { key: "showIso", label: "ISO感度" },
    { key: "showFNumber", label: "絞り値" },
    { key: "showExposureTime", label: "シャッタースピード" },
    { key: "showFocalLength", label: "焦点距離" },
    { key: "showWhiteBalance", label: "ホワイトバランス" },
    { key: "showOrientation", label: "画像の向き" },
    { key: "showTakenAt", label: "撮影日時" },
    { key: "showGps", label: "GPS情報" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <label
            key={item.key}
            htmlFor={item.key}
            className="flex item-center gap-2"
          >
            <input
              type="checkbox"
              id={item.key}
              {...register(item.key)}
              className="w-5 h-5"
            />
            <span>{item.label}</span>
          </label>
        ))}
      </div>

      <div className="flex justify-between pt-6">
        <BackButton />
        <ActionButton
          type="submit"
          label="保存する"
          color="green"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        />
      </div>
    </form>
  );
};
