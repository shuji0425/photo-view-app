"use client";

import { BasicAccountForm } from "@/components/setting/BasicAccountForm";
import { useAuth } from "@/hooks/useAuth";
import { updateAccountInfo } from "@/lib/api/user/accountUpdate";
import { BasicAccountParams } from "@/lib/schema/accountSchema";
import toast from "react-hot-toast";
import { mutate } from "swr";

export default function BasicSettingsPage() {
  const { user } = useAuth();

  if (!user) {
    return <p>ユーザー情報が取得できませんでした。</p>;
  }

  const handleSubmit = async (data: BasicAccountParams): Promise<void> => {
    try {
      const updatedUser = await updateAccountInfo(data);
      mutate("/me", updatedUser, false);
      toast.success("アカウント情報を更新しました");
    } catch {
      toast.error("更新に失敗しました");
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-6">アカウント情報の変更</h1>
      <BasicAccountForm
        defaultValues={{
          username: user.username,
          email: user.email,
          currentPassword: "",
        }}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
