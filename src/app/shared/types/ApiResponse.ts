export interface ApiResponse<T> {
  items: T[];
  message: string;
  error: object;
  status: number;
}
