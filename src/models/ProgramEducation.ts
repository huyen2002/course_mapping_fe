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
  outline: string | null
  startYear: number | null
  endYear: number | null
  sourceLinks: SourceLink[] | null
  enabled: boolean
  majorId?: number
  major: Major
  universityId?: number
  university: University
}

export interface ProgramEducationDto {
  id?: number
  name?: string
  code?: string
  language?: string
  introduction?: string
  durationYear?: number
  levelOfEducation?: keyof LevelOfEducation
  numCredits?: number
  outline?: string | null
  startYear?: number | null
  endYear?: number | null
  sourceLinks?: string | null
  majorId?: number
  universityId?: number
  enabled?: boolean
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
      sourceLinks: dto.sourceLinks ? JSON.parse(dto.sourceLinks) : null,
      enabled: dto.enabled,
      major: MajorUtils.toEntity(dto.major),
      university: UniversityUtils.toEntity(dto.university),
      majorId: MajorUtils.toEntity(dto.major).id,
      universityId: UniversityUtils.toEntity(dto.university).id,
    } as ProgramEducation
  },
  toEntities: (dtos: any[]) => {
    return dtos.map((dto) => ProgramEducationUtils.toEntity(dto))
  },
  toDto: (entity: ProgramEducation) => {
    return {
      id: entity.id,
      name: entity.name,
      code: entity.code,
      language: entity.language,
      introduction: entity.introduction,
      durationYear: entity.durationYear,
      levelOfEducation: entity.levelOfEducation,
      numCredits: entity.numCredits,
      outline: entity.outline,
      startYear: entity.startYear,
      endYear: entity.endYear,
      sourceLinks: entity.sourceLinks
        ? JSON.stringify(entity.sourceLinks)
        : null,
      majorId: entity.majorId,
      universityId: entity.universityId,
      major: MajorUtils.toEntity(entity.major),
      university: UniversityUtils.toEntity(entity.university),
      enabled: entity.enabled,
    } as ProgramEducationDto
  },
}
