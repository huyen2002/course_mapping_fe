import { createBrowserRouter } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import DetailLayout from '../layouts/DetailLayout'
import Layout from '../layouts/Layout'
import ManagementLayout from '../layouts/ManagementLayout'
import UniversityLayout from '../layouts/UniversityLayout'
import CompareProgramEducations from '../pages/CompareProgramEducations'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import ProgramEducationDetail from '../pages/ProgramEducationDetail'
import ProgramEducations from '../pages/ProgramEducations'
import SearchProgramResult from '../pages/SearchProgramResult'
import Universities from '../pages/Universities'
import UniversityDetail from '../pages/UniversityDetail'
import AdminStorage from '../pages/admin/AdminStorage'
import CourseOfUniversity from '../pages/admin/CourseOfUniversity'
import HomeAdmin from '../pages/admin/HomeAdmin'
import NewCourseAdmin from '../pages/admin/NewCourseAdmin'
import NewProgramAdmin from '../pages/admin/NewProgramAdmin'
import ProgramEducationManage from '../pages/admin/ProgramEducationManage'
import UniversityManagement from '../pages/admin/UniversityManagement'
import ChooseRole from '../pages/auth/ChooseRole'
import SignIn from '../pages/auth/Login'
import SignUp from '../pages/auth/SignUp'
import CourseList from '../pages/university/CourseList'
import EditProgramEducation from '../pages/university/EditProgramEducation'
import NewCourse from '../pages/university/NewCourse'
import NewProgramEducation from '../pages/university/NewProgramEducation'
import ProgramEducationList from '../pages/university/ProgramEducationList'
import UniversityInfo from '../pages/university/UniversityInfo'
import UniversityProgramDetail from '../pages/university/UniversityProgramDetail'
import UniversityStorageManagement from '../pages/university/UniversityStorageManagement'
import Paths from './paths'

const routers = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: Paths.HOME, element: <Home /> },
      { path: Paths.PROGRAM_EDUCATIONS, element: <ProgramEducations /> },
      { path: Paths.SEARCH_PROGRAM_RESULT, element: <SearchProgramResult /> },
      { path: Paths.UNIVERSITIES, element: <Universities /> },
    ],
    errorElement: <NotFound />,
  },
  {
    path: '/university',
    element: <UniversityLayout />,
    children: [
      {
        path: Paths.UNIVERSITY_INFO,
        element: <UniversityInfo />,
      },
      {
        path: Paths.NEW_PROGRAM_EDUCATION,
        element: <NewProgramEducation />,
      },
      {
        path: Paths.UNIVERSITY_PROGRAM_EDUCATIONS,
        element: <ProgramEducationList />,
      },
      { path: Paths.UNIVERSITY_COURSES, element: <CourseList /> },
      { path: Paths.UNIVERSITY_NEW_COURSE, element: <NewCourse /> },

      {
        path: Paths.UNIVERSITY_STORAGE,
        element: <UniversityStorageManagement />,
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
        path: Paths.UNIVERSITY_DETAIL,
        element: <UniversityDetail />,
      },
      {
        path: Paths.COMPARE_PROGRAM_EDUCATIONS,
        element: <CompareProgramEducations />,
      },
      {
        path: Paths.EDIT_PROGRAM_EDUCATION,
        element: <EditProgramEducation />,
      },
    ],
  },

  {
    path: Paths.LOGIN,
    element: <SignIn />,
  },
  {
    path: Paths.REGISTER,
    element: <SignUp />,
  },
  {
    path: Paths.CHOOSE_ROLE,
    element: <ChooseRole />,
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
      {
        path: Paths.ADMIN_UNIVERSITIES,
        element: <UniversityManagement />,
      },
      {
        path: Paths.ADMIN_STORAGE,
        element: <AdminStorage />,
      },
      {
        path: Paths.ADMIN_COURSES_MANAGE,
        element: <CourseOfUniversity />,
      },
      {
        path: Paths.ADMIN_NEW_COURSE,
        element: <NewCourseAdmin />,
      },
    ],
  },
  {
    path: '/',
    element: <ManagementLayout />,
    children: [
      {
        path: Paths.UNIVERSITY_PROGRAM_EDUCATION_DETAIL,
        element: <UniversityProgramDetail />,
      },
    ],
  },
])
export default routers
