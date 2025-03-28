import { FormError } from "./FormError";

type Props = {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  error?: string;
};

/**
 * 共通フォームフィールド
 */
export const FormField = ({ label, htmlFor, children, error }: Props) => {
  return (
    <div className="space-y-1">
      <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
      <FormError message={error} />
    </div>
  );
};
