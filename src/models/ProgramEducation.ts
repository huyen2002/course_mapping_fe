import { Major, MajorUtils } from './Major'
import { University, UniversityUtils } from './University'

export interface ProgramEducation {
  id: number
  name: string
  language: string
  introduction: string
  duration_year: number
  level_of_education: string
  num_credits: number
  outline: string
  start_year: number
  end_year: number
  major: Major
  university: University
}

export const ProgramEducationUtils = {
  toEntity: (dto: any) => {
    return {
      id: dto.id,
      name: dto.name,
      language: dto.language,
      introduction: dto.introduction,
      duration_year: dto.duration_year,
      level_of_education: dto.level_of_education,
      num_credits: dto.num_credits,
      outline: dto.outline,
      start_year: dto.start_year,
      end_year: dto.end_year,
      major: MajorUtils.toEntity(dto.major),
      university: UniversityUtils.toEntity(dto.university),
    } as ProgramEducation
  },
  toEntities: (dtos: any[]) => {
    return dtos.map((dto) => ProgramEducationUtils.toEntity(dto))
  },
}
