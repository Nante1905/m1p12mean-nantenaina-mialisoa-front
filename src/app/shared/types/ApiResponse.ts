export interface ApiResponse<T> {
  data: T;
  message: string;
  error: object;
  status: number;
}
