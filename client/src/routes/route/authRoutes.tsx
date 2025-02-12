import { lazy, Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthLayout from '../../layouts/auth/layout'

const LandingPage = lazy(() => import('../../pages/auth/landing'))
const MyRoomPage = lazy(() => import('../../pages/auth/my-room'))
const CreateRoomPage = lazy(() => import('../../pages/auth/create-room'))

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
      { path: 'create-room', element: <CreateRoomPage /> },
      { path: 'my-room', element: <MyRoomPage /> },
    ],
  },
]
