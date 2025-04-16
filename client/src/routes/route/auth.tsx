import { lazy } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthLayout from '../../layouts/auth/layout'
import withSuspense from '@hocs/withSuspense'

const LoginPage = withSuspense(
  lazy(() => import('../../pages/auth/login/page')),
)
const SignUpPage = withSuspense(
  lazy(() => import('../../pages/auth/sign-up/page')),
)

// ----------------------------------------------------------------------

export const authRoutes = [
  {
    element: (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    ),
    children: [
      { element: <Navigate to="login" replace />, index: true },
      { path: 'login', element: <LoginPage /> },
      { path: 'sign-up', element: <SignUpPage /> },
    ],
  },
]
