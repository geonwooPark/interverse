import { lazy } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Layout from '../../layouts/layout'
import withSuspense from '@hocs/withSuspense'

const LandingPage = withSuspense(lazy(() => import('../../pages/landing/page')))
const CreateRoomPage = withSuspense(
  lazy(() => import('../../pages/create/page')),
)
const RoomPage = withSuspense(lazy(() => import('../../pages/room/page')))

// ----------------------------------------------------------------------

export const routes = [
  {
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      { element: <Navigate to="landing" replace />, index: true },
      { path: 'landing', element: <LandingPage /> },
      { path: 'create', element: <CreateRoomPage /> },
      { path: 'room', element: <RoomPage /> },
    ],
  },
]
