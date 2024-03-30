export const AuthAPIs = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  ME: 'auth/me',
}
export const MajorAPIs = {
  GET_ALL: '/majors/all',
  SEARCH: 'majors/search',
  GET_LIST: 'majors/list',
}
export const ProgramEducationAPIs = {
  GET_ALL: 'program_educations/all',
  SEARCH: 'program_educations/search',
  GET_BY_ID: (id: number) => `program_education/${id}`,
  GET_COURSES_BY_PROGRAM_ID: (id: number) => `program_education/${id}/courses`,
  GET_SIMILAR_PROGRAMS: (id: number) => `program_education/${id}/top_similar`,
  COMPARE_COURSE_LISTS: (firstProgramId: number, secondProgramId: number) =>
    `/compare_courses_of_program_educations/${firstProgramId}/and/${secondProgramId}`,
  GET_ALL_BY_USER: 'me/program_educations/all',
  CREATE: 'program_education/create',
}

export const DocumentAPIs = {
  COMPARE_TWO_DOCUMENTS: '/compare_two_documents',
}

export const UniversityAPIs = {
  GET_LIST: '/universities/list',
  GET_ALL: '/universities/all',
}
