import { useRoutes } from 'react-router-dom'
import { routes } from './route'

export default function Router() {
  return useRoutes([...routes])
}
