import { lazy } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthLayout from '../../layouts/auth/layout'
import withSuspense from '@hocs/withSuspense'
import GuestGuard from '@components/Guard/GuestGuard'

const LoginPage = withSuspense(
  lazy(() => import('../../pages/auth/login/page')),
)
const SignUpPage = withSuspense(
  lazy(() => import('../../pages/auth/sign-up/page')),
)
const RecoveryPage = withSuspense(
  lazy(() => import('../../pages/auth/recovery/page')),
)

// ----------------------------------------------------------------------

export const authRoutes = [
  {
    element: (
      <GuestGuard>
        <AuthLayout>
          <Outlet />
        </AuthLayout>
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
