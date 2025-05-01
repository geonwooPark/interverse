import { Navigate, Outlet } from 'react-router-dom'
import MainLayout from '@layouts/main/layout'
import AuthGuard from '@components/Guard/AuthGuard'
import GameLayout from '@layouts/game/layout'
import { withSuspenseLayout } from '@hocs/withLayout'
import { lazy } from 'react'

const RoomListPage = withSuspenseLayout(
  MainLayout,
  lazy(() => import('../../pages/rooms/list/page')),
)
const RoomPage = withSuspenseLayout(
  GameLayout,
  lazy(() => import('../../pages/rooms/room/page')),
)
const CreateRoomPage = withSuspenseLayout(
  MainLayout,
  lazy(() => import('../../pages/rooms/create/page')),
)
// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <AuthGuard>
        <Outlet />
      </AuthGuard>
    ),
    path: 'rooms',
    children: [
      { element: <Navigate to="list" replace />, index: true },
      {
        path: 'list',
        element: <RoomListPage />,
      },
      {
        path: ':id',
        element: <RoomPage />,
      },
      {
        path: 'create',
        element: <CreateRoomPage />,
      },
    ],
  },
]
