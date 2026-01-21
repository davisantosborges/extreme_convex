export type AccountStatus = 'active' | 'inactive' | 'pending' | 'suspended' | 'closed';

export type StatusFilter = AccountStatus | undefined;

export interface Account {
  _id: string;
  _creationTime: number;
  name: string;
  status: AccountStatus;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface PerformanceMetrics {
  queryTime: number;
  renderTime: number;
  totalTime: number;
  recordsReturned: number;
}

export type SearchType = 'name' | 'address';

export const STATUS_OPTIONS: AccountStatus[] = ['active', 'inactive', 'pending', 'suspended', 'closed'];
