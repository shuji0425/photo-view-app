import { FormField } from "../../ui/FormField";
import { Select } from "../../ui/Select";
import { DateInput } from "../../ui/DateInput";
import { Toggle } from "../../ui/Toggle";
import { TagInput } from "../../ui/TagInput";
import {
  PhotoUpdateParams,
  PhotoBulkUpdateParams,
} from "@/lib/schema/photoSchema";
import { Controller, Control } from "react-hook-form";
import { formatToDateJST } from "@/lib/utils/date";
import { CategoryOption } from "@/types/category";

type Props = {
  index: number;
  control: Control<PhotoBulkUpdateParams>;
  categories: CategoryOption[];
  error?: Partial<Record<keyof PhotoUpdateParams, { message?: string }>>;
};

export const PhotoEditMetaFields = ({
  index,
  control,
  categories,
  error,
}: Props) => {
  return (
    <>
      {/* カテゴリ */}
      <FormField
        label="カテゴリ"
        htmlFor={`category-id-${index}`}
        error={error?.categoryId?.message}
      >
        <Controller
          control={control}
          name={`updates.${index}.categoryId`}
          render={({ field }) => (
            <Select
              id={`category-id-${index}`}
              onChange={(e) => field.onChange(Number(e.target.value))}
              value={field.value ?? ""}
              options={categories}
            />
          )}
        />
      </FormField>

      {/* 撮影日 */}
      <FormField
        label="撮影日時"
        htmlFor={`taken-at-${index}`}
        error={error?.takenAt?.message}
      >
        <Controller
          control={control}
          name={`updates.${index}.takenAt`}
          render={({ field }) => (
            <DateInput
              id={`taken-at-${index}`}
              value={formatToDateJST(field.value)}
              onChange={(e) => field.onChange(e.target.value || null)}
            />
          )}
        />
      </FormField>

      {/* タグ */}
      <FormField
        label="タグ"
        htmlFor={`tags-${index}`}
        error={error?.tags?.message}
      >
        <Controller
          control={control}
          name={`updates.${index}.tags`}
          render={({ field }) => (
            <TagInput value={field.value ?? []} onChange={field.onChange} />
          )}
        />
      </FormField>

      {/* 表示フラグ */}
      <FormField
        label="公開する"
        htmlFor={`is-visible-${index}`}
        error={error?.isVisible?.message}
      >
        <Controller
          control={control}
          name={`updates.${index}.isVisible`}
          render={({ field }) => (
            <Toggle
              id={`is-visible-${index}`}
              checked={field.value}
              onChange={(checked: boolean) => field.onChange(checked)}
            />
          )}
        />
      </FormField>
    </>
  );
};
