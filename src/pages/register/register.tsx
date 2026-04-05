import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { Form, Link } from 'react-router-dom';

import AuthBlock from '@components/auth/auth-block/auth-block.tsx';
import useForm from '@hooks/useForm.ts';

import type { ReactNode } from 'react';

export default function Register(): ReactNode {
  const { form, updateFormValue, updateValid, isFormValid } = useForm({
    name: '',
    email: '',
    password: '',
  });
  return (
    <AuthBlock title="Регистрация">
      <Form method="post" action="/register" className="form">
        <Input
          name="name"
          value={form.name}
          placeholder="Имя"
          onChange={(e) => {
            updateFormValue('name', e.target.value);
            updateValid('name', e.target.value.length > 1);
          }}
          error={form.name.length === 1}
          errorText="Имя должно быть больше 1 символа"
        />
        <EmailInput
          errorText="Ошибка"
          name="email"
          placeholder="E-mail"
          size="default"
          value={form.email}
          onChange={(e) => updateFormValue('email', e.target.value)}
          checkValid={(isValid) => updateValid('email', isValid)}
        />
        <PasswordInput
          icon="ShowIcon"
          name="password"
          value={form.password}
          onChange={(e) => updateFormValue('password', e.target.value)}
          checkValid={(isValid) => updateValid('password', isValid)}
        />
        <Button size="medium" type="primary" disabled={!isFormValid} htmlType="submit">
          Зарегистрироваться
        </Button>
      </Form>
      <span className="text text_type_main-default text_color_inactive mb-4">
        Уже зарегистрированы? <Link to="/login">Войти</Link>
      </span>
    </AuthBlock>
  );
}
