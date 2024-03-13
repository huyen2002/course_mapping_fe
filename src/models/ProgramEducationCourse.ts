import { Course, CourseUtils } from './Course'

export interface ProgramEducationCourse {
  id: number
  programEducationId: number
  courseId: number
  course: Course
  compulsory: boolean
  numCredit: number
}
export const ProgramEducationCourseUtils = {
  toEntity: (dto: any) => {
    return {
      id: dto.id,
      programEducationId: dto.program_education_id,
      courseId: dto.course_id,
      course: CourseUtils.toEntity(dto.course),
      compulsory: dto.compulsory,
      numCredit: dto.num_credit,
    } as ProgramEducationCourse
  },
  toEntities: (dtos: any[]): ProgramEducationCourse[] => {
    return dtos.map((item) => ProgramEducationCourseUtils.toEntity(item))
  },
}
