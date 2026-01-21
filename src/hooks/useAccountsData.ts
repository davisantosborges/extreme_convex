import { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery, usePaginatedQuery } from 'convex/react';
import { getAccountApi } from './useAccountsApi';
import type { AccountTableName } from '../../convex/lib/accountTypes';
import type { Account, StatusFilter, SearchType, PerformanceMetrics } from '@/types/account';
import type { SortingState } from '@tanstack/react-table';

const ITEMS_PER_PAGE = 50;

interface UseAccountsDataReturn {
  // Data
  accounts: Account[];

  // Loading states
  isLoading: boolean;
  isLoadingMore: boolean;

  // Pagination
  canLoadMore: boolean;
  isExhausted: boolean;
  loadMore: () => void;

  // Search mode flags
  isSearchMode: boolean;
  isNameSearch: boolean;
  isAddressSearch: boolean;

  // Table selection
  selectedTable: AccountTableName;
  setSelectedTable: (table: AccountTableName) => void;

  // Filters
  statusFilter: StatusFilter;
  setStatusFilter: (status: StatusFilter) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchType: SearchType;
  setSearchType: (type: SearchType) => void;

  // Sorting
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;

  // Metrics
  metrics: PerformanceMetrics | null;
}

export function useAccountsData(): UseAccountsDataReturn {
  // Table selection
  const [selectedTable, setSelectedTable] = useState<AccountTableName>('accounts');
  const accountApi = getAccountApi(selectedTable);

  // Filters and search
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('name');

  // Table sorting
  const [sorting, setSorting] = useState<SortingState>([]);

  // Performance metrics
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

  // Timing refs
  const queryStartTime = useRef<number>(0);
  const renderStartTime = useRef<number>(0);

  // Set query start time when dependencies change
  useEffect(() => {
    queryStartTime.current = performance.now();
  }, [statusFilter, searchQuery, searchType, selectedTable]);

  // Paginated list query (browse mode)
  const paginatedAccounts = usePaginatedQuery(
    accountApi.list,
    searchQuery.trim().length === 0 ? { statusFilter } : 'skip',
    { initialNumItems: ITEMS_PER_PAGE }
  );

  // Paginated name search query
  const paginatedNameSearch = usePaginatedQuery(
    accountApi.search,
    searchQuery.trim().length > 0 && searchType === 'name'
      ? { searchQuery, statusFilter }
      : 'skip',
    { initialNumItems: ITEMS_PER_PAGE }
  );

  // Address search query (non-paginated, max 100)
  const searchResultsByAddress = useQuery(
    accountApi.searchByAddress,
    searchQuery.trim().length > 0 && searchType === 'address'
      ? { searchQuery, statusFilter }
      : 'skip'
  );

  // Determine search mode
  const isSearchMode = searchQuery.trim().length > 0;
  const isNameSearch = isSearchMode && searchType === 'name';
  const isAddressSearch = isSearchMode && searchType === 'address';

  // Select the appropriate paginated query
  const activePaginatedQuery = isNameSearch ? paginatedNameSearch : paginatedAccounts;

  // Determine accounts and loading state
  let accounts: Account[] = [];
  let isLoading = false;

  if (isAddressSearch) {
    accounts = (searchResultsByAddress || []) as Account[];
    isLoading = searchResultsByAddress === undefined;
  } else {
    accounts = (activePaginatedQuery.results || []) as Account[];
    isLoading = activePaginatedQuery.status === 'LoadingFirstPage';
  }

  const isLoadingMore = activePaginatedQuery.status === 'LoadingMore';
  const canLoadMore = activePaginatedQuery.status === 'CanLoadMore';
  const isExhausted = activePaginatedQuery.status === 'Exhausted';

  // Measure performance when data loads
  useEffect(() => {
    if (!isLoading && accounts.length > 0) {
      const queryEndTime = performance.now();
      const queryTime = queryEndTime - queryStartTime.current;

      renderStartTime.current = performance.now();

      requestAnimationFrame(() => {
        const renderEndTime = performance.now();
        const renderTime = renderEndTime - renderStartTime.current;
        const totalTime = renderEndTime - queryStartTime.current;

        setMetrics({
          queryTime,
          renderTime,
          totalTime,
          recordsReturned: accounts.length,
        });
      });
    }
  }, [isLoading, accounts.length]);

  // Load more handler
  const loadMore = useCallback(() => {
    if (canLoadMore) {
      queryStartTime.current = performance.now();
      activePaginatedQuery.loadMore(ITEMS_PER_PAGE);
    }
  }, [canLoadMore, activePaginatedQuery]);

  return {
    // Data
    accounts,

    // Loading states
    isLoading,
    isLoadingMore,

    // Pagination
    canLoadMore,
    isExhausted,
    loadMore,

    // Search mode flags
    isSearchMode,
    isNameSearch,
    isAddressSearch,

    // Table selection
    selectedTable,
    setSelectedTable,

    // Filters
    statusFilter,
    setStatusFilter,

    // Search
    searchQuery,
    setSearchQuery,
    searchType,
    setSearchType,

    // Sorting
    sorting,
    setSorting,

    // Metrics
    metrics,
  };
}
