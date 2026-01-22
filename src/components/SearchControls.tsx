import type { SearchType, AddressSearchFields } from '@/types/account';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchType: SearchType;
  onSearchTypeChange: (type: SearchType) => void;
  addressFields: AddressSearchFields;
  onAddressFieldChange: (field: keyof AddressSearchFields, value: string) => void;
}

export function SearchControls({
  searchQuery,
  onSearchChange,
  searchType,
  onSearchTypeChange,
  addressFields,
  onAddressFieldChange,
}: SearchControlsProps) {
  return (
    <div className="space-y-3">
      {/* Search Type Toggle */}
      <div className="flex gap-4 items-center">
        <span className="text-sm font-medium text-muted-foreground">Search by:</span>
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

      {/* Search Fields */}
      {searchType === 'name' ? (
        <Input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-11"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Input
            type="text"
            placeholder="Street..."
            value={addressFields.street}
            onChange={(e) => onAddressFieldChange('street', e.target.value)}
            className="h-11"
          />
          <Input
            type="text"
            placeholder="City..."
            value={addressFields.city}
            onChange={(e) => onAddressFieldChange('city', e.target.value)}
            className="h-11"
          />
          <Input
            type="text"
            placeholder="State..."
            value={addressFields.state}
            onChange={(e) => onAddressFieldChange('state', e.target.value)}
            className="h-11"
          />
          <Input
            type="text"
            placeholder="ZIP Code..."
            value={addressFields.zipCode}
            onChange={(e) => onAddressFieldChange('zipCode', e.target.value)}
            className="h-11"
          />
        </div>
      )}
    </div>
  );
}
