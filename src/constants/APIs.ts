export const MajorAPIs = {
  GET_ALL: '/majors/all',
  SEARCH: 'majors/search',
}
export const ProgramEducationAPIs = {
  GET_ALL: 'program_educations/all',
  SEARCH: 'program_educations/search',
  GET_BY_ID: (id: number) => `program_education/${id}`,
  GET_COURSES_BY_PROGRAM_ID: (id: number) => `program_education/${id}/courses`,
  GET_SIMILAR_PROGRAMS: (id: number) => `program_education/${id}/top_similar`,
}
