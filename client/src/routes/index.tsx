import { useRoutes } from 'react-router-dom'
import { mainRoutes } from './route/mainRoutes'
import { authRoutes } from './route/authRoutes'

export default function Router() {
  return useRoutes([...authRoutes, ...mainRoutes])
}
