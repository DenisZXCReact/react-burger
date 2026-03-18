import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';

import AppLayout from '@components/app/app-layout/app-layout.jsx';
import ProtectedRoute from '@components/auth/protected-route/protected-route.jsx';
import IngredientPreview from '@components/burger/ingredients/ingredient-preview/ingredient-preview.jsx';
import Feed from '@pages/feed/feed.jsx';
import ForgotPassword from '@pages/forgot-password/forgot-password.jsx';
import Home from '@pages/home/home.jsx';
import Login from '@pages/login/login.jsx';
import NotFound from '@pages/not-found/not-found.jsx';
import ProfileOrder from '@pages/profile-order/profile-order.jsx';
import Profile from '@pages/profile/profile.jsx';
import Register from '@pages/register/register.jsx';
import ResetPassword from '@pages/reset-password/reset-password.jsx';
import { updateUser } from '@services/auth/actions/change-user-data.js';
import { newPassword } from '@services/auth/actions/new-password.js';
import { resetPassword } from '@services/auth/actions/password-reset.js';
import { registerUser } from '@services/auth/actions/register.js';
import { loadIngredients } from '@services/ingredients/ingredients-action.js';
import { store } from '@services/store.js';

import styles from './app.module.css';
async function parseFormData(request) {
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
        loader: async () => {
          const state = store.getState();
          if (state.ingredients.ingredients.length === 0) {
            return { loadIngredients: store.dispatch(loadIngredients()) };
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
        // action: async ({ request }) => {
        //   const data = await parseFormData(request);
        //   store.dispatch(loginUser(data));
        // },
      },
      {
        path: '/register',
        element: <ProtectedRoute onlyUnAuth component={<Register />} />,
        action: async ({ request }) => {
          const data = await parseFormData(request);
          store.dispatch(registerUser(data));
        },
      },
      {
        path: '/forgot-password',
        element: <ProtectedRoute onlyUnAuth component={<ForgotPassword />} />,
        action: async ({ request }) => {
          const data = await parseFormData(request);
          const response = await store.dispatch(resetPassword(data));

          if (response?.payload?.success) {
            localStorage.setItem('resetAllowed', true);
            return redirect('/reset-password');
          }
        },
      },
      {
        path: '/reset-password',
        element: <ProtectedRoute onlyUnAuth component={<ResetPassword />} />,
        action: async ({ request }) => {
          const data = await parseFormData(request);
          const response = await store.dispatch(newPassword(data));

          if (response?.payload?.success) {
            return redirect('/login');
          }
        },
      },
      {
        path: '/profile',
        element: <ProtectedRoute component={<Profile />} />,
        action: async ({ request }) => {
          const data = await parseFormData(request);
          store.dispatch(updateUser(data));
        },
        children: [
          {
            path: 'orders/',
            element: <ProfileOrder />,
          },
        ],
      },
      {
        path: '/feed',
        element: <Feed />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
export const App = () => {
  return (
    <div className={styles.app}>
      <RouterProvider router={router} />
    </div>
  );
};
