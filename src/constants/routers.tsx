import { createBrowserRouter } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import DetailLayout from '../layouts/DetailLayout'
import Layout from '../layouts/Layout'
import UniversityLayout from '../layouts/UniversityLayout'
import CompareProgramEducations from '../pages/CompareProgramEducations'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import ProgramEducationDetail from '../pages/ProgramEducationDetail'
import ProgramEducations from '../pages/ProgramEducations'
import HomeAdmin from '../pages/admin/HomeAdmin'
import SignIn from '../pages/auth/Login'
import NewProgramEducation from '../pages/university/NewProgramEducation'
import ProgramEducationList from '../pages/university/ProgramEducationList'
import UniversityHome from '../pages/university/UniversityHome'
import Paths from './paths'
import ProgramEducationManage from '../pages/admin/ProgramEducationManage'
import NewProgramAdmin from '../pages/admin/NewProgramAdmin'

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
      {
        path: Paths.PROGRAM_EDUCATION_LIST,
        element: <ProgramEducationList />,
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
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        path: Paths.ADMIN_HOME,
        element: <HomeAdmin />,
      },
      {
        path: Paths.ADMIN_NEW_PROGRAM_EDUCATION,
        element: <NewProgramAdmin />,
      },
      {
        path: Paths.ADMIN_PROGRAM_EDUCATION_MANAGE,
        element: <ProgramEducationManage />,
      },
    ],
  },
])
export default routers
