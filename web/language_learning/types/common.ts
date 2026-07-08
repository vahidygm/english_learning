export interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

export interface WithId {
  id: number;
}

export interface BaseEntity extends WithId, Timestamps {}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
