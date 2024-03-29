import { Major, MajorUtils } from './Major'
import { SourceLink } from './SourceLink'
import { University, UniversityUtils } from './University'

export enum LevelOfEducation {
  BACHELOR = 'Cử nhân' as any,
  MASTER = 'Thạc sĩ' as any,
  DOCTOR = 'Tiến sĩ' as any,
  ENGINEER = 'Kỹ sư' as any,
}
export interface ProgramEducation {
  id: number
  name: string
  code: string
  language: string
  introduction: string
  durationYear: number
  levelOfEducation: keyof LevelOfEducation
  numCredits: number
  outline: string
  startYear: number
  endYear: number
  sourceLinks: SourceLink[]
  majorId?: number
  major: Major
  university: University
}

export const ProgramEducationUtils = {
  toEntity: (dto: any) => {
    return {
      id: dto.id,
      name: dto.name,
      code: dto.code,
      language: dto.language,
      introduction: dto.introduction,
      durationYear: dto.durationYear,
      levelOfEducation: dto.levelOfEducation as keyof LevelOfEducation,
      numCredits: dto.numCredits,
      outline: dto.outline,
      startYear: dto.startYear,
      endYear: dto.endYear,
      sourceLinks: dto.source_links ? JSON.parse(dto.source_links) : null,
      major: MajorUtils.toEntity(dto.major),
      university: UniversityUtils.toEntity(dto.university),
    } as ProgramEducation
  },
  toEntities: (dtos: any[]) => {
    return dtos.map((dto) => ProgramEducationUtils.toEntity(dto))
  },
}
