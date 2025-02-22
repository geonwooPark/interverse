import { lazy, Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Layout from '../../layouts/layout'
import AuthProvider from '../../providers/AuthProvider'
import RoomsProvider from '../../providers/RoomsProvider'

const LandingPage = lazy(() => import('../../pages/landing'))
const CreateRoomPage = lazy(() => import('../../pages/create/page'))
const WaitingPage = lazy(() => import('../../pages/waiting/page'))
const RoomPage = lazy(() => import('../../pages/room/page'))

// ----------------------------------------------------------------------

export const routes = [
  {
    element: (
      <RoomsProvider>
        <Suspense>
          <Layout>
            <Outlet />
          </Layout>
        </Suspense>
      </RoomsProvider>
    ),
    children: [
      { element: <Navigate to="landing" replace />, index: true },
      { path: 'landing', element: <LandingPage /> },
      { path: 'create', element: <CreateRoomPage /> },
      { path: 'waiting', element: <WaitingPage /> },

      {
        element: (
          <AuthProvider>
            <Outlet />
          </AuthProvider>
        ),
        children: [
          {
            path: 'room',
            element: <RoomPage />,
          },
        ],
      },
    ],
  },
]
