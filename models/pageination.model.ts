export type Pagination<T> = {
  data: T[];
  meta: {
    total: number;
    totalCount: number;
    lastPage: number;
    currentPage: number;
    prev: number | null;
    next: number | null;
  };
};
