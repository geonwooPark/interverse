import { lazy } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import GuestGuard from '@components/Guard/GuestGuard'
import { withSuspenseLayout } from '@hocs/withLayout'
import AuthLayout from '@layouts/auth/layout'

const LoginPage = withSuspenseLayout(
  AuthLayout,
  lazy(() => import('../../pages/auth/login/page')),
)
const SignUpPage = withSuspenseLayout(
  AuthLayout,
  lazy(() => import('../../pages/auth/sign-up/page')),
)
const RecoveryPage = withSuspenseLayout(
  AuthLayout,
  lazy(() => import('../../pages/auth/recovery/page')),
)

// ----------------------------------------------------------------------

export const authRoutes = [
  {
    element: (
      <GuestGuard>
        <Outlet />
      </GuestGuard>
    ),
    children: [
      { element: <Navigate to="login" replace />, index: true },
      { path: 'login', element: <LoginPage /> },
      { path: 'sign-up', element: <SignUpPage /> },
      { path: 'recovery', element: <RecoveryPage /> },
    ],
  },
]
