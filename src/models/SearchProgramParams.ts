export enum ProgramStatus {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
}
export enum LevelOfEducationParams {
  ALL = 'ALL',
  BACHELOR = 'BACHELOR',
  MASTER = 'MASTER',
  DOCTOR = 'DOCTOR',
  ENGINEER = 'ENGINEER',
}
export interface SearchProgramParams {
  name?: string | null
  majorCode?: string
  levelOfEducation?: LevelOfEducationParams
  status?: ProgramStatus
}
