import { useRoutes } from 'react-router-dom'
import { authRoutes } from './route/auth'
import { mainRoutes } from './route/main'

export default function Router() {
  return useRoutes([...authRoutes, ...mainRoutes])
}
