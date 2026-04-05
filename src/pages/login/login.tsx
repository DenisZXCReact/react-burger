import {
  Button,
  EmailInput,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import AuthBlock from '@components/auth/auth-block/auth-block.tsx';
import { useAppDispatch } from '@hooks/useAppDispatch.ts';
import useForm from '@hooks/useForm.ts';
import { loginUser } from '@services/auth/actions/login.ts';

import type { FormEvent, ReactNode } from 'react';

import type { TLoginArg } from '@utils/auth/auth-api.ts';

export default function Login(): ReactNode {
  const { form, updateFormValue, updateValid, isFormValid } = useForm({
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    dispatch(loginUser(form as TLoginArg));
  }
  return (
    <AuthBlock title="Вход">
      <form method="post" className="form" onSubmit={handleSubmit}>
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
        <Button size="medium" type="primary" disabled={!isFormValid} htmlType={'submit'}>
          Войти
        </Button>
      </form>
      <span className="text text_type_main-default text_color_inactive mb-4">
        Вы — новый пользователь? <Link to="/register">Зарегистрироваться</Link>
      </span>
      <span className="text text_type_main-default text_color_inactive">
        Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
      </span>
    </AuthBlock>
  );
}
