import { useAccountsData } from '@/hooks/useAccountsData';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Header } from '@/components/Header';
import { PerformanceMetrics } from '@/components/PerformanceMetrics';
import { SearchControls } from '@/components/SearchControls';
import { StatusFilters } from '@/components/StatusFilters';
import { AccountsTable } from '@/components/AccountsTable';
import { Pagination } from '@/components/Pagination';
import { LoadingState } from '@/components/LoadingState';

function AppContent() {
  const {
    accounts,
    isLoading,
    isLoadingMore,
    canLoadMore,
    isExhausted,
    loadMore,
    isNameSearch,
    isAddressSearch,
    selectedTable,
    setSelectedTable,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    searchType,
    setSearchType,
    sorting,
    setSorting,
    metrics,
  } = useAccountsData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header
          selectedTable={selectedTable}
          onTableChange={setSelectedTable}
        />

        {metrics && <PerformanceMetrics metrics={metrics} />}

        <div className="bg-card rounded-xl p-6 mb-6 shadow-sm space-y-4">
          <SearchControls
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchType={searchType}
            onSearchTypeChange={setSearchType}
          />
          <StatusFilters
            statusFilter={statusFilter}
            onFilterChange={setStatusFilter}
          />
        </div>

        {isLoading ? (
          <LoadingState rows={6} />
        ) : (
          <>
            <AccountsTable
              accounts={accounts}
              sorting={sorting}
              onSortingChange={setSorting}
            />

            <div className="mt-6">
              <Pagination
                recordCount={accounts.length}
                canLoadMore={canLoadMore}
                isLoadingMore={isLoadingMore}
                isExhausted={isExhausted}
                isNameSearch={isNameSearch}
                isAddressSearch={isAddressSearch}
                onLoadMore={loadMore}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

export default App;
