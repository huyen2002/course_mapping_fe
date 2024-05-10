export const AuthAPIs = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ME: 'auth/me',
}
export const MajorAPIs = {
  SEARCH: 'majors/search',
  GET_LIST: 'majors/list',
  UPDATE_ENABLED: (id: number) => `major/update_enabled/${id}`,
}
export const ProgramEducationAPIs = {
  SEARCH: 'program_educations/search',
  GET_BY_ID: (id: number) => `program_education/${id}`,
  GET_SIMILAR_PROGRAMS: (id: number) => `program_education/${id}/top_similar`,
  COMPARE_COURSE_LISTS: (firstProgramId: number, secondProgramId: number) =>
    `/compare_programs/${firstProgramId}/and/${secondProgramId}`,
  GET_ALL_BY_USER: 'me/program_educations/all',
  CREATE: 'program_education/create',
  UPDATE: (id: number) => `program_education/update/${id}`,
  DELETE: (id: number) => `program_education/delete/${id}`,
  CHECK_EXISTED_BY_CODE: 'program_education/check_existed_by_code',
  UPDATE_ENABLED: (id: number) => `program_education/update_enabled/${id}`,
}

export const DocumentAPIs = {
  COMPARE_TWO_DOCUMENTS: '/compare_two_documents',
}

export const UniversityAPIs = {
  GET_LIST: '/universities/list',
  GET_BY_USER: '/university/me',
  GET_BY_ID: (id: number) => `university/${id}`,
  SEARCH: 'universities/search',
  UPDATE_BY_ID: (id: number) => `university/${id}/update`,
  CREATE: 'university/create',
  DELETE: (id: number) => `university/${id}/delete`,
  UPDATE_ENABLED: (id: number) => `university/update_enable/${id}`,
}

export const CourseAPIs = {
  SEARCH: '/courses/search',
  CREATE: 'course/create',
  GET_LIST: (id: number) => `/university/${id}/courses/list`,
  UPDATE: (id: number) => `course/${id}/update`,
  DELETE: (id: number) => `course/${id}/delete`,
  CHECK_EXISTED_BY_CODE: 'course/check_existed_by_code',
}

export const ProgramEducationCourseAPIs = {
  SEARCH: 'program_education_courses/search',
  CREATE: 'program_education_course/create',
  DELETE: (id: number) => `program_education_course/delete/${id}`,
  UPDATE: (id: number) => `program_education_course/${id}/update`,
}
