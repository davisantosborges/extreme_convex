import type { StatusFilter } from '@/types/account';
import { STATUS_OPTIONS } from '@/types/account';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StatusFiltersProps {
  statusFilter: StatusFilter;
  onFilterChange: (status: StatusFilter) => void;
}

export function StatusFilters({ statusFilter, onFilterChange }: StatusFiltersProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      <Button
        variant="outline"
        size="sm"
        className={cn(
          'capitalize',
          statusFilter === undefined && 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground border-primary'
        )}
        onClick={() => onFilterChange(undefined)}
      >
        All
      </Button>
      {STATUS_OPTIONS.map((status) => (
        <Button
          key={status}
          variant="outline"
          size="sm"
          className={cn(
            'capitalize',
            statusFilter === status && 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground border-primary'
          )}
          onClick={() => onFilterChange(status)}
        >
          {status}
        </Button>
      ))}
    </div>
  );
}
