const Paths = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  PROGRAM_EDUCATIONS: '/program_educations/all',
  PROGRAM_EDUCATION_DETAIL: '/program_education/:id',
  COMPARE_PROGRAM_EDUCATIONS: '/compare_program_educations/:id_1/and/:id_2',

  UNIVERSITY_HOME: '/university/home',
  NEW_PROGRAM_EDUCATION: '/university/new_program_education',
  UNIVERSITY_PROGRAM_EDUCATIONS: '/university/program_education/all',
  UNIVERSITY_COURSES: '/university/:id/courses',
  UNIVERSITY_NEW_COURSE: '/university/:id/new_course',

  ADMIN_HOME: '/admin/home',
  ADMIN_NEW_PROGRAM_EDUCATION: '/admin/new_program_education',
  ADMIN_PROGRAM_EDUCATION_MANAGE: '/admin/program_educations',
}
export default Paths
