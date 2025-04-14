export const metadata = createNoIndexMetadata();

import { createNoIndexMetadata } from "@/lib/utils/seo";
import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";

/**
 * 管理者用レイアウト
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
