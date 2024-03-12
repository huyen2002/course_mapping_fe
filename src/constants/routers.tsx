import { createBrowserRouter } from 'react-router-dom'
import Layout from '../layouts/Layout'
import UniversityLayout from '../layouts/UniversityLayout'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import ProgramEducations from '../pages/ProgramEducations'
import UniversityHome from '../pages/university/UniversityHome'
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
  {
    path: '/university',
    element: <UniversityLayout />,
    children: [
      {
        path: Paths.UNIVERSITY_HOME,
        element: <UniversityHome />,
      },
    ],
    errorElement: <NotFound />,
  },
])
export default routers
