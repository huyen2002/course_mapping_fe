import { University } from './University'

export interface Course {
  id: number
  name: string
  code: string
  language: string
  outline: string | null
  university: University
  universityId?: number
}
export const CourseUtils = {
  toEntity: (dto: any) => {
    return {
      id: dto.id,
      name: dto.name,
      code: dto.code,
      language: dto.language,
      outline: dto.outline,
      university: dto.university,
      universityId: dto.university.id,
    } as Course
  },
  toEntities: (dtos: any[]): Course[] => {
    return dtos.map((item) => CourseUtils.toEntity(item))
  },
}
