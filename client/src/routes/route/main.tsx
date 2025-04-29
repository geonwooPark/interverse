import { lazy } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import MainLayout from '../../layouts/main/layout'
import withSuspense from '@hocs/withSuspense'
import AuthGuard from '@components/Guard/AuthGuard'

const RoomListPage = withSuspense(
  lazy(() => import('../../pages/rooms/list/page')),
)
const RoomPage = withSuspense(lazy(() => import('../../pages/rooms/room/page')))
const CreateRoomPage = withSuspense(
  lazy(() => import('../../pages/rooms/create/page')),
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
      { element: <Navigate to="list" replace />, index: true },
      { path: 'list', element: <RoomListPage /> },
      { path: ':id', element: <RoomPage /> },
      { path: 'create', element: <CreateRoomPage /> },
    ],
  },
]
