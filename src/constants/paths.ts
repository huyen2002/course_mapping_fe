const Paths = {
  HOME: '/',
  LOGIN: '/auth/login',
  CHOOSE_ROLE: '/auth/choose_role',
  REGISTER: '/auth/register/:role',
  PROGRAM_EDUCATIONS: '/program_educations/all',
  PROGRAM_EDUCATION_DETAIL: '/program_education/:id',
  SEARCH_PROGRAM_RESULT: 'program_educations/search',
  COMPARE_PROGRAM_EDUCATIONS: '/compare_program_educations/:id_1/and/:id_2',
  UNIVERSITIES: '/universities/all',
  UNIVERSITY_DETAIL: 'university/:id',

  UNIVERSITY_INFO: '/university/:id/info',
  NEW_PROGRAM_EDUCATION: '/university/:id/new_program_education',
  EDIT_PROGRAM_EDUCATION: '/university/program_education/:id/edit',
  UNIVERSITY_PROGRAM_EDUCATIONS: '/university/:id/program_educations',
  UNIVERSITY_COURSES: '/university/:id/courses',
  UNIVERSITY_NEW_COURSE: '/university/:id/new_course',
  UNIVERSITY_PROGRAM_EDUCATION_DETAIL: '/university/program_education/:id',
  UNIVERSITY_STORAGE: '/university/:id/storage',

  ADMIN_HOME: '/admin/home',
  ADMIN_NEW_PROGRAM_EDUCATION: '/admin/new_program_education',
  ADMIN_PROGRAM_EDUCATION_MANAGE: '/admin/program_educations',
  ADMIN_UNIVERSITIES: '/admin/universities',
  ADMIN_STORAGE: '/admin/storage',
}
export default Paths
