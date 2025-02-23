import { lazy, Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Layout from '../../layouts/layout'
import Loading from '@components/StepFlow/Loading'

const LandingPage = lazy(() => import('../../pages/landing/page'))
const CreateRoomPage = lazy(() => import('../../pages/create/page'))
const RoomPage = lazy(() => import('../../pages/room/page'))

// ----------------------------------------------------------------------

export const routes = [
  {
    element: (
      <Suspense fallback={<Loading />}>
        <Layout>
          <Outlet />
        </Layout>
      </Suspense>
    ),
    children: [
      { element: <Navigate to="landing" replace />, index: true },
      { path: 'landing', element: <LandingPage /> },
      { path: 'create', element: <CreateRoomPage /> },
      { path: 'room', element: <RoomPage /> },
    ],
  },
]
