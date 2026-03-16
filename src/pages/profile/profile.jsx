import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
  Preloader,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Outlet } from 'react-router-dom';

import ProfileSideBar from '@components/profile/profile-side-bar/profile-side-bar.jsx';
import useForm from '@hooks/useForm.js';
import { getAuthUser, isAuthLoading } from '@services/auth/auth-slice.js';

import styles from './profile.module.css';

export default function Profile() {
  const userData = useSelector(getAuthUser);
  const loading = useSelector(isAuthLoading);
  const { form, updateValid, updateFormValue, isFormValid } = useForm({
    name: userData.name,
    email: userData.email,
    password: '123456',
  });
  const defaultIcons = {
    name: 'EditIcon',
    email: 'EditIcon',
    password: 'EditIcon',
  };
  const [icons, setIcons] = useState(defaultIcons);
  const isFormChanged = form.name !== userData.name || form.email !== userData.email;
  function changeIcon(fieldName) {
    setIcons((prevValue) => ({
      ...prevValue,
      [fieldName]: prevValue[fieldName] === 'EditIcon' ? 'CloseIcon' : 'EditIcon',
    }));
  }
  function resetIcons() {
    setIcons(defaultIcons);
  }
  function nameIconClickHandler() {
    if (icons.name === 'CloseIcon') {
      updateFormValue('name', userData.name);
    }
    changeIcon('name');
  }
  function emailIconClickHandler() {
    if (icons.email === 'CloseIcon') {
      updateFormValue('email', userData.email);
    }
    changeIcon('email');
  }
  function resetChanges() {
    updateFormValue('name', userData.name);
    updateFormValue('email', userData.email);
  }
  return (
    <div className={styles.profile}>
      <div className={styles.container}>
        <ProfileSideBar />
        {loading ? (
          <Preloader />
        ) : (
          <Form method="post" action="/profile" className="form">
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
              disabled={icons.name === 'EditIcon'}
              icon={icons.name}
              onIconClick={nameIconClickHandler}
              extraClass=""
            />
            <EmailInput
              name="email"
              placeholder="E-mail"
              value={form.email}
              onChange={(e) => updateFormValue('email', e.target.value)}
              checkValid={(isValid) => updateValid('email', isValid)}
              disabled={icons.email === 'EditIcon'}
              icon={icons.email}
              onIconClick={emailIconClickHandler}
            />
            <PasswordInput
              name="password"
              value={form.password}
              onChange={(e) => updateFormValue('password', e.target.value)}
              checkValid={(isValid) => updateValid('password', isValid)}
              icon={icons.password}
              disabled={icons.password === 'EditIcon'}
              onIconClick={() => changeIcon('password')}
            />
            {isFormChanged && (
              <div className={styles.buttons}>
                <Button
                  size="medium"
                  type="secondary"
                  onClick={() => {
                    resetIcons();
                    resetChanges();
                  }}
                >
                  Отмена
                </Button>
                <Button size="medium" type="primary" disabled={!isFormValid}>
                  Сохранить
                </Button>
              </div>
            )}
          </Form>
        )}

        <Outlet />
      </div>
    </div>
  );
}
