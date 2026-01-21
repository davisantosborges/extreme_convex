import type { AccountTableName } from '../../convex/lib/accountTypes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface HeaderProps {
  selectedTable: AccountTableName;
  onTableChange: (table: AccountTableName) => void;
}

const TABLE_OPTIONS: { value: AccountTableName; label: string }[] = [
  { value: 'accounts', label: 'accounts (10k records)' },
  { value: 'accounts2', label: 'accounts2 (100k records)' },
  { value: 'accounts3', label: 'accounts3 (1M records)' },
  { value: 'accounts4', label: 'accounts4 (10M records)' },
  { value: 'accounts5', label: 'accounts5 (100M records)' },
];

export function Header({ selectedTable, onTableChange }: HeaderProps) {
  return (
    <header className="text-center text-white mb-8">
      <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-md">
        Convex Storage Test
      </h1>
      <div className="flex items-center justify-center gap-3 mt-4">
        <label htmlFor="table-select" className="text-sm font-medium opacity-90">
          Table:
        </label>
        <Select value={selectedTable} onValueChange={(v) => onTableChange(v as AccountTableName)}>
          <SelectTrigger
            id="table-select"
            className="w-[240px] bg-white/20 border-white/30 text-white hover:bg-white/30 focus:ring-white/50"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TABLE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </header>
  );
}
