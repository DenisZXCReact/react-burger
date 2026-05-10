import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { type ReactNode, useState } from 'react';
import { Form } from 'react-router-dom';

import { useAppSelector } from '@hooks/useAppSelector.ts';
import useForm from '@hooks/useForm.ts';
import { getAuthUser } from '@services/auth/auth-slice.ts';

import type { TUser } from '@/types/types.ts';

import styles from './profile-edit-form.module.css';
export default function ProfileEditForm(): ReactNode {
  const userData = useAppSelector(getAuthUser);
  const { form, updateValid, updateFormValue, isFormValid } = useForm({
    name: userData?.name ?? '',
    email: userData?.email ?? '',
    password: '123456',
  });
  const defaultIcons: Record<string, 'EditIcon' | 'CloseIcon'> = {
    name: 'EditIcon',
    email: 'EditIcon',
    password: 'EditIcon',
  };
  const [icons, setIcons] = useState(defaultIcons);

  const isFormChanged = form.name !== userData?.name || form.email !== userData?.email;
  function changeIcon(fieldName: keyof typeof icons): void {
    setIcons((prevValue) => ({
      ...prevValue,
      [fieldName]: prevValue[fieldName] === 'EditIcon' ? 'CloseIcon' : 'EditIcon',
    }));
  }
  function resetIcons(): void {
    setIcons(defaultIcons);
  }
  function iconCLickHandler(formFieldName: keyof TUser): void {
    const value = userData && userData[formFieldName];
    if (icons.name === 'CloseIcon' && value) {
      updateFormValue(formFieldName, value);
    }
    changeIcon(formFieldName);
  }
  function resetChanges(): void {
    if (!userData) return;
    updateFormValue('name', userData.name);
    updateFormValue('email', userData.email);
  }
  return (
    <Form
      method="post"
      action="/profile"
      className={clsx('form', styles.form)}
      onSubmit={resetIcons}
    >
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
        onIconClick={() => iconCLickHandler('name')}
      />
      <EmailInput
        name="email"
        placeholder="E-mail"
        value={form.email}
        onChange={(e) => updateFormValue('email', e.target.value)}
        checkValid={(isValid) => updateValid('email', isValid)}
        disabled={icons.email === 'EditIcon'}
        icon={icons.email}
        onIconClick={() => iconCLickHandler('email')}
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
            htmlType="button"
          >
            Отмена
          </Button>
          <Button size="medium" type="primary" disabled={!isFormValid} htmlType="submit">
            Сохранить
          </Button>
        </div>
      )}
    </Form>
  );
}
