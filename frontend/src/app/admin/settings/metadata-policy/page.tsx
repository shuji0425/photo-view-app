"use client";

import { useEffect, useState } from "react";
import { MetadataPolicyForm } from "@/components/setting/MetadataPolicyForm";
import { MetadataPolicySchema } from "@/lib/schema/metadataPolicySchema";
import { getMetadataPolicy } from "@/lib/api/metadataPolicy/get";
import { createOrUpdateMetadataPolicy } from "@/lib/api/metadataPolicy/createOrUpdate";
import toast from "react-hot-toast";

const defaultValues: MetadataPolicySchema = {
  showCameraMake: true,
  showCameraModel: true,
  showLensModel: true,
  showIso: true,
  showFNumber: true,
  showExposureTime: true,
  showFocalLength: false,
  showWhiteBalance: false,
  showOrientation: false,
  showTakenAt: false,
  showGps: false,
};

export default function MetadataPolicyPage() {
  const [initialValues, setInitialValues] =
    useState<MetadataPolicySchema | null>(null);

  // 初期値
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getMetadataPolicy();
        setInitialValues(data);
      } catch {
        setInitialValues(defaultValues);
      }
    };
    fetch();
  }, []);

  // 作成or更新処理
  const handleSubmit = async (data: MetadataPolicySchema) => {
    try {
      await createOrUpdateMetadataPolicy(data);
      toast.success("保存しました");
    } catch {
      toast.error("保存に失敗しました");
    }
  };

  if (!initialValues) {
    return <p className="text-center mt-10">読み込み中...</p>;
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-6">メタデータ表示ポリシー</h1>
      <MetadataPolicyForm
        defaultValues={initialValues}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
