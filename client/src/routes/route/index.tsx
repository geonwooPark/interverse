import { lazy, Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Layout from '../../layouts/layout'
import AuthProvider from '../../providers/AuthProvider'

const LandingPage = lazy(() => import('../../pages/landing'))
const WatingRoomPage = lazy(() => import('../../pages/waiting/page'))
const CreateRoomPage = lazy(() => import('../../pages/create/page'))
const RoomPage = lazy(() => import('../../pages/room/page'))

// ----------------------------------------------------------------------

export const routes = [
  {
    element: (
      <Suspense>
        <Layout>
          <Outlet />
        </Layout>
      </Suspense>
    ),
    children: [
      { element: <Navigate to="landing" replace />, index: true },
      { path: 'landing', element: <LandingPage /> },
      { path: 'create', element: <CreateRoomPage /> },
      { path: 'waiting', element: <WatingRoomPage /> },
      {
        path: 'room',
        element: (
          <AuthProvider>
            <RoomPage />
          </AuthProvider>
        ),
      },
    ],
  },
]
