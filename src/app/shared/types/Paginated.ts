export interface Paginated<T = any> {
  items: Array<T>;
  page: number;
  limit: number;
  totalItems: number;
  totalPage: number;
}
