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
}
export interface SearchProgramParams {
  name?: string
  majorCode?: string
  levelOfEducation?: LevelOfEducationParams
  status?: ProgramStatus
}
