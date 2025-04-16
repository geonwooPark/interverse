import { lazy } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import MainLayout from '../../layouts/main/layout'
import withSuspense from '@hocs/withSuspense'
import { paths } from '@routes/paths'

const RoomPage = withSuspense(lazy(() => import('../../pages/room/page')))
const CreateRoomPage = withSuspense(
  lazy(() => import('../../pages/auth/create/page')),
)
// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      { element: <Navigate to="room" replace />, index: true },
      { path: paths.room, element: <RoomPage /> },
      { path: paths.createRoom, element: <CreateRoomPage /> },
    ],
  },
]
