import { lazy } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import MainLayout from '../../layouts/main/layout'
import withSuspense from '@hocs/withSuspense'
import { paths } from '@routes/paths'
import AuthGuard from '@components/Guard/AuthGuard'

const RoomPage = withSuspense(lazy(() => import('../../pages/rooms/room/page')))
const CreateRoomPage = withSuspense(
  lazy(() => import('../../pages/rooms/new/page')),
)
// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <AuthGuard>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </AuthGuard>
    ),
    path: 'rooms',
    children: [
      { element: <Navigate to={paths.rooms.root} replace />, index: true },
      { path: ':id', element: <RoomPage /> },
      { path: 'new', element: <CreateRoomPage /> },
    ],
  },
]
