"use client";

import { FormField } from "../ui/FormField";
import { Input } from "../ui/Input";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ProfileParams } from "@/lib/schema/profileSchema";

type Props = {
  register: UseFormRegister<ProfileParams>;
  errors: FieldErrors<ProfileParams>;
};

/**
 * 所在地・出身地セクション
 */
export const ProfileLocationSection = ({ register, errors }: Props) => {
  return (
    <section className="space-y-6">
      {/* 所在地 */}
      <FormField
        label="所在地"
        htmlFor="location"
        error={errors.location?.message}
      >
        <Input id="location" {...register("location")} />
      </FormField>

      {/* 出身地 */}
      <FormField
        label="出身地"
        htmlFor="birth_place"
        error={errors.birth_place?.message}
      >
        <Input id="birth_place" {...register("birth_place")} />
      </FormField>
    </section>
  );
};
