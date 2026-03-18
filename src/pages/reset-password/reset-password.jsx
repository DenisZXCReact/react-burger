import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { Form, Link, useNavigate } from 'react-router-dom';

import AuthBlock from '@components/auth/auth-block/auth-block.jsx';
import useForm from '@hooks/useForm.js';

export default function ResetPassword() {
  const { form, isFormValid, updateValid, updateFormValue } = useForm({
    password: '',
    token: '',
  });
  const navigate = useNavigate();
  useEffect(() => {
    const allowed = localStorage.getItem('resetAllowed');

    if (!allowed) {
      navigate('/forgot-password', { replace: true });
    }
  }, []);
  return (
    <AuthBlock title="Восстановление пароля">
      <Form method="post" action="/reset-password" className="form">
        <PasswordInput
          icon="ShowIcon"
          name="password"
          value={form.password}
          onChange={(e) => updateFormValue('password', e.target.value)}
          checkValid={(isValid) => updateValid('password', isValid)}
        />
        <Input
          value={form.token}
          name="token"
          placeholder="Введите код из письма"
          onChange={(e) => {
            updateFormValue('token', e.target.value);
            updateValid('token', e.target.value.length > 0);
          }}
        />
        <Button size="medium" type="primary" disabled={!isFormValid} htmlType="submit">
          Сохранить
        </Button>
      </Form>
      <span className="text text_type_main-default text_color_inactive mb-4">
        Вспомнили пароль? <Link to="/login">Войти</Link>
      </span>
    </AuthBlock>
  );
}
