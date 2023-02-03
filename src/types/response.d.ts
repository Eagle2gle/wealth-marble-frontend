export type Response<T = null> = {
  status: string;
  message: string | null;
  data: T;
};
