import { lazy, Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthLayout from '../../layouts/auth/layout'

const LandingPage = lazy(() => import('../../pages/auth/landing'))
const WatingRoomPage = lazy(() => import('../../pages/auth/waiting/page'))
const CreateRoomPage = lazy(() => import('../../pages/auth/create/page'))

// ----------------------------------------------------------------------

export const authRoutes = [
  {
    element: (
      <Suspense>
        <AuthLayout>
          <Outlet />
        </AuthLayout>
      </Suspense>
    ),
    children: [
      { element: <Navigate to="landing" replace />, index: true },
      { path: 'landing', element: <LandingPage /> },
      { path: 'create', element: <CreateRoomPage /> },
      { path: 'waiting', element: <WatingRoomPage /> },
    ],
  },
]
