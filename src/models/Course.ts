import { SourceLink } from './SourceLink'

export interface Course {
  id: number
  name: string
  code: string
  language: string
  outline: string | null
  sourceLinks: SourceLink[] | null
}
export const CourseUtils = {
  toEntity: (dto: any) => {
    return {
      id: dto.id,
      name: dto.name,
      code: dto.code,
      language: dto.language,
      outline: dto.outline,
      sourceLinks: dto.sourceLinks ? JSON.parse(dto.sourceLinks) : null,
    } as Course
  },
  toEntities: (dtos: any[]): Course[] => {
    return dtos.map((item) => CourseUtils.toEntity(item))
  },
}
