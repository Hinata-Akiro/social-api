export interface PagingOptions {
    skip?: number;
    limit?: number;
    sort?: 'asc' | 'desc';
  }
  
  export function getSortObject(sort: 'asc' | 'desc'): 1 | -1 {
    return sort === 'asc' ? 1 : -1;
  }