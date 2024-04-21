export interface SortParam {
  sortType: SortType
}
export enum SortType {
  SIMILARITY_ASC = 'SIMILARITY_ASC',
  SIMILARITY_DESC = 'SIMILARITY_DESC',
  ALPHABET_ASC = 'ALPHABET_ASC',
  ALPHABET_DESC = 'ALPHABET_DESC',
}
