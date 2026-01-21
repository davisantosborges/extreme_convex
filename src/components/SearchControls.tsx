import type { SearchType } from '@/types/account';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchType: SearchType;
  onSearchTypeChange: (type: SearchType) => void;
}

export function SearchControls({
  searchQuery,
  onSearchChange,
  searchType,
  onSearchTypeChange,
}: SearchControlsProps) {
  return (
    <div className="flex gap-4 items-stretch">
      <Input
        type="text"
        placeholder={
          searchType === 'name'
            ? 'Search by name...'
            : 'Search by address (street, city, state, or ZIP)...'
        }
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 h-11"
      />
      <div className="flex gap-1 p-1 border rounded-lg bg-muted/50">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'h-9 px-4',
            searchType === 'name' && 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground'
          )}
          onClick={() => onSearchTypeChange('name')}
        >
          Name
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'h-9 px-4',
            searchType === 'address' && 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground'
          )}
          onClick={() => onSearchTypeChange('address')}
        >
          Address
        </Button>
      </div>
    </div>
  );
}
