import { Button, EmailInput } from '@krgaa/react-developer-burger-ui-components';
import { Form, Link } from 'react-router-dom';

import AuthBlock from '@components/auth/auth-block/auth-block.tsx';
import useForm from '@hooks/useForm.ts';

import type { ReactNode } from 'react';

export default function ForgotPassword(): ReactNode {
  const { form, updateFormValue, updateValid, isFormValid } = useForm({ email: '' });
  return (
    <AuthBlock title="Восстановление пароля">
      <Form method="post" className="form">
        <EmailInput
          errorText="Ошибка"
          name="email"
          placeholder="E-mail"
          size="default"
          value={form.email}
          onChange={(e) => updateFormValue('email', e.target.value)}
          checkValid={(isValid) => updateValid('email', isValid)}
        />
        <Button size="medium" type="primary" disabled={!isFormValid} htmlType="submit">
          Восстановить
        </Button>
      </Form>
      <span className="text text_type_main-default text_color_inactive mb-4">
        Вспомнили пароль? <Link to="/login">Войти</Link>
      </span>
    </AuthBlock>
  );
}
