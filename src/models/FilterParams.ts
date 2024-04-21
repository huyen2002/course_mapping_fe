export interface FilterParams {
  country?: string
  language?: string
  major?: string
}
export enum FilterType {
  ALL = 'ALL',
  EQUAL = 'EQUAL',
  OTHER = 'OTHER',
}
export const FILTER_OTHER_OPERATOR = '!'
