"use client";

import { PasswordUpdateForm } from "@/components/setting/PasswordUpdateForm";
import { updatePassword } from "@/lib/api/user/passwordUpdate";
import { PasswordUpdateSchema } from "@/lib/schema/accountSchema";
import toast from "react-hot-toast";

export default function PasswordSettingsPage() {
  const handleSubmit = async (data: PasswordUpdateSchema): Promise<void> => {
    try {
      await updatePassword(data);
      toast.success("パスワードを変更しました");
    } catch {
      toast.error("変更に失敗しました");
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-6">パスワード変更</h1>
      <PasswordUpdateForm onSubmit={handleSubmit} />
    </main>
  );
}
