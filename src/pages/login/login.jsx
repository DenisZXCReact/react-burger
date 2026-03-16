import {
  Button,
  EmailInput,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import AuthBlock from '@components/auth/auth-block/auth-block.jsx';
import useForm from '@hooks/useForm.js';
import { loginUser } from '@services/auth/actions/login.js';

export default function Login() {
  const { form, updateFormValue, updateValid, isFormValid } = useForm({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(form));
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
        <Button size="medium" type="primary" disabled={!isFormValid}>
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
