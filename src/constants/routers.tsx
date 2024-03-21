import { createBrowserRouter } from 'react-router-dom'
import DetailLayout from '../layouts/DetailLayout'
import Layout from '../layouts/Layout'
import UniversityLayout from '../layouts/UniversityLayout'
import CompareProgramEducations from '../pages/CompareProgramEducations'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import ProgramEducationDetail from '../pages/ProgramEducationDetail'
import ProgramEducations from '../pages/ProgramEducations'
import SignIn from '../pages/auth/Login'
import NewProgramEducation from '../pages/university/NewProgramEducation'
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
      {
        path: Paths.NEW_PROGRAM_EDUCATION,
        element: <NewProgramEducation />,
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: '/',
    element: <DetailLayout />,
    children: [
      {
        path: Paths.PROGRAM_EDUCATION_DETAIL,
        element: <ProgramEducationDetail />,
      },
      {
        path: Paths.COMPARE_PROGRAM_EDUCATIONS,
        element: <CompareProgramEducations />,
      },
    ],
  },
  {
    path: Paths.LOGIN,
    element: <SignIn />,
  },
])
export default routers
