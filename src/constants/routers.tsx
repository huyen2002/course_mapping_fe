import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/common/Layout'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import ProgramEducations from '../pages/ProgramEducations'
import Paths from './paths'

const routers = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: Paths.HOME, element: <Home /> },
      { path: Paths.PROGRAM_EDUCATIONS, element: <ProgramEducations /> },
    ],
    errorElement: <NotFound />,
  },
])
export default routers
