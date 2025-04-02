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
    <div className="mb-3">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      {children}
      <FormError message={error} />
    </div>
  );
};
