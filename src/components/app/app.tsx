import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';

import AppLayout from '@components/app/app-layout/app-layout.js';
import ProtectedRoute from '@components/auth/protected-route/protected-route.js';
import IngredientPreview from '@components/burger/ingredients/ingredient-preview/ingredient-preview.js';
import ProfileOrder from '@components/profile/profile-order/profile-order.js';
import Feed from '@pages/feed/feed.js';
import ForgotPassword from '@pages/forgot-password/forgot-password.js';
import Home from '@pages/home/home.js';
import Login from '@pages/login/login.js';
import NotFound from '@pages/not-found/not-found.js';
import Profile from '@pages/profile/profile.js';
import Register from '@pages/register/register.js';
import ResetPassword from '@pages/reset-password/reset-password.js';
import { updateUser } from '@services/auth/actions/change-user-data.ts';
import { newPassword } from '@services/auth/actions/new-password.ts';
import { resetPassword } from '@services/auth/actions/password-reset.ts';
import { registerUser } from '@services/auth/actions/register.ts';
import { loadIngredients } from '@services/ingredients/ingredients-action.ts';
import { store } from '@services/store.ts';

import type { ReactNode } from 'react';

import type { TIngredient, TUser } from '@/types/types.ts';

type HomeLoaderData = {
  loadIngredients: Promise<TIngredient[]>;
};

import FeedOrderModal from '@components/feed/feed-order-modal/feed-order-modal.tsx';
import ProfileEditForm from '@components/profile/profile-edit-form/profile-edit-form.tsx';
import ProfileOrderModal from '@components/profile/profile-order/profile-order-modal/profile-order-modal.tsx';

import type { TNewPasswordArg, TResetPasswordArg } from '@utils/auth/auth-api.ts';

import styles from './app.module.css';

async function parseFormData(
  request: Request
): Promise<Record<string, FormDataEntryValue>> {
  const formData = await request.formData();
  return Object.fromEntries(formData.entries());
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
        loader: async (): Promise<HomeLoaderData | boolean> => {
          const state = store.getState();
          if (state.ingredients.ingredients.length === 0) {
            return { loadIngredients: store.dispatch(loadIngredients()).unwrap() };
          }
          return true;
        },
        children: [
          {
            path: 'ingredient/:id',
            element: <IngredientPreview />,
          },
        ],
      },
      {
        path: '/login',
        element: <ProtectedRoute onlyUnAuth component={<Login />} />,
      },

      {
        path: '/register',
        element: <ProtectedRoute onlyUnAuth component={<Register />} />,
        action: async ({ request }): Promise<void> => {
          const data = await parseFormData(request);
          store.dispatch(registerUser(data as TUser));
        },
      },
      {
        path: '/forgot-password',
        element: <ProtectedRoute onlyUnAuth component={<ForgotPassword />} />,
        action: async ({ request }): Promise<void | Response> => {
          console.log(request);
          const data = await parseFormData(request);
          const response = await store.dispatch(
            resetPassword(data as TResetPasswordArg)
          );
          if (resetPassword.fulfilled.match(response)) {
            if (response?.payload?.success) {
              localStorage.setItem('resetAllowed', String(true));
              return redirect('/reset-password');
            }
          }
        },
      },
      {
        path: '/reset-password',
        element: <ProtectedRoute onlyUnAuth component={<ResetPassword />} />,
        action: async ({ request }): Promise<void | Response> => {
          const data = await parseFormData(request);
          const response = await store.dispatch(newPassword(data as TNewPasswordArg));
          if (newPassword.fulfilled.match(response)) {
            if (response?.payload?.success) {
              return redirect('/login');
            }
          }
        },
      },
      {
        path: '/profile',
        element: <ProtectedRoute component={<Profile />} />,
        action: async ({ request }): Promise<void> => {
          const data = await parseFormData(request);
          store.dispatch(updateUser(data));
        },
        children: [
          {
            index: true,
            element: <ProfileEditForm />,
          },
          {
            path: 'orders/',
            loader: async (): Promise<HomeLoaderData | boolean> => {
              const state = store.getState();
              if (state.ingredients.ingredients.length === 0) {
                return { loadIngredients: store.dispatch(loadIngredients()).unwrap() };
              }
              return true;
            },
            element: <ProfileOrder />,
            children: [
              {
                path: ':id',
                element: <ProfileOrderModal />,
              },
            ],
          },
        ],
      },
      {
        path: '/feed',
        element: <Feed />,
        loader: async (): Promise<HomeLoaderData | boolean> => {
          const state = store.getState();
          if (state.ingredients.ingredients.length === 0) {
            return { loadIngredients: store.dispatch(loadIngredients()).unwrap() };
          }
          return true;
        },
        children: [
          {
            path: ':id',
            element: <FeedOrderModal />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
export const App = (): ReactNode => {
  return (
    <div className={styles.app}>
      <RouterProvider router={router} />
    </div>
  );
};
