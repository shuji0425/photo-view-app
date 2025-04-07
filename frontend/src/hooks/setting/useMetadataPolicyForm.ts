import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MetadataPolicySchema,
  metadataPolicySchema,
} from "@/lib/schema/metadataPolicySchema";

type Props = {
  defaultValues: MetadataPolicySchema;
};

/**
 * メタデータポリシーの状態とバリデーション管理
 */
export const useMetadataPolicyForm = ({ defaultValues }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MetadataPolicySchema>({
    resolver: zodResolver(metadataPolicySchema),
    defaultValues,
  });

  return { register, handleSubmit, errors, isSubmitting };
};
