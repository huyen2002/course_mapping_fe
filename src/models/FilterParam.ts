export interface FilterParam {
  filterType: FilterType
}
export enum FilterType {
  SIMILARITY_ASC = 'SIMILARITY_ASC',
  SIMILARITY_DESC = 'SIMILARITY_DESC',
  ALPHABET_ASC = 'ALPHABET_ASC',
  ALPHABET_DESC = 'ALPHABET_DESC',
}
