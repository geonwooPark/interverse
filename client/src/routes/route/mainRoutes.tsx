import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Mainlayout from '../../layouts/main/layout'

const RoomPage = lazy(() => import('../../pages/main/room'))

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <Suspense>
        <Mainlayout>
          <Outlet />
        </Mainlayout>
      </Suspense>
    ),
    children: [{ path: 'room', element: <RoomPage /> }],
  },
]
