import { Button } from '@/components/ui/button';

interface PaginationProps {
  recordCount: number;
  canLoadMore: boolean;
  isLoadingMore: boolean;
  isExhausted: boolean;
  isNameSearch: boolean;
  isAddressSearch: boolean;
  onLoadMore: () => void;
  itemsPerPage?: number;
}

export function Pagination({
  recordCount,
  canLoadMore,
  isLoadingMore,
  isExhausted,
  isNameSearch,
  isAddressSearch,
  onLoadMore,
  itemsPerPage = 50,
}: PaginationProps) {
  if (isAddressSearch) {
    return (
      <div className="flex justify-center items-center gap-6 bg-card p-4 rounded-xl shadow-sm">
        <span className="text-sm font-medium text-muted-foreground">
          Found {recordCount} matching records (max 100)
        </span>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center gap-6 bg-card p-4 rounded-xl shadow-sm">
      <span className="text-sm font-medium text-muted-foreground">
        {isNameSearch ? 'Found' : 'Showing'} {recordCount.toLocaleString()}{' '}
        {isNameSearch ? 'matching' : ''} records
        {isExhausted && ' (all loaded)'}
      </span>
      <Button
        onClick={onLoadMore}
        disabled={!canLoadMore || isLoadingMore}
        variant="outline"
        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
      >
        {isLoadingMore
          ? 'Loading...'
          : canLoadMore
            ? `Load ${itemsPerPage} more`
            : 'All records loaded'}
      </Button>
    </div>
  );
}
