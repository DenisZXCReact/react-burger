import { useState } from 'react';

type TUpdateFormValueFunc = (formFieldName: string, value: string) => void;
type TUpdateValidFunc = (formFieldName: string, value: boolean) => void;

export default function useForm(formFields: Record<string, string>): {
  form: Record<string, string>;
  updateFormValue: TUpdateFormValueFunc;
  updateValid: TUpdateValidFunc;
  isFormValid: boolean;
} {
  const [form, setForm] = useState(formFields);
  const [valid, setValid] = useState(() =>
    Object.fromEntries(Object.entries(formFields).map(([key, value]) => [key, !!value]))
  );
  const updateFormValue: TUpdateFormValueFunc = (formFieldName, value) => {
    setForm((prevFormValue) => ({ ...prevFormValue, [formFieldName]: value }));
  };
  const updateValid: TUpdateValidFunc = (formFieldName, isValid) => {
    setValid((prev) => ({ ...prev, [formFieldName]: isValid }));
  };
  const isFormValid = Object.values(valid).every((valid) => valid);
  return { form, updateFormValue: updateFormValue, updateValid, isFormValid };
}
