import { useState } from 'react';

export default function useForm(formFields) {
  const [form, setForm] = useState(formFields);
  const [valid, setValid] = useState(formFields);
  function updateFormValue(formFieldName, value) {
    setForm((prevFormValue) => ({ ...prevFormValue, [formFieldName]: value }));
  }
  function updateValid(formFieldName, isValid) {
    setValid((prev) => ({ ...prev, [formFieldName]: isValid }));
  }
  const isFormValid = Object.values(valid).every((valid) => valid);
  return { form, updateFormValue: updateFormValue, updateValid, isFormValid };
}
