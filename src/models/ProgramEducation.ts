import { Major, MajorUtils } from './Major'
import { University, UniversityUtils } from './University'

export enum LevelOfEducation {
  BACHELOR = 'Cử nhân' as any,
  MASTER = 'Thạc sĩ' as any,
  DOCTOR = 'Tiến sĩ' as any,
}
export interface ProgramEducation {
  id: number
  name: string
  language: string
  introduction: string
  duration_year: number
  levelOfEducation: keyof LevelOfEducation
  numCredits: number
  outline: string
  startYear: number
  endYear: number
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
      levelOfEducation: dto.level_of_education as keyof LevelOfEducation,
      numCredits: dto.num_credits,
      outline: dto.outline,
      startYear: dto.start_year,
      endYear: dto.end_year,
      major: MajorUtils.toEntity(dto.major),
      university: UniversityUtils.toEntity(dto.university),
    } as ProgramEducation
  },
  toEntities: (dtos: any[]) => {
    return dtos.map((dto) => ProgramEducationUtils.toEntity(dto))
  },
}
