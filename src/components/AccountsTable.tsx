import { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { ArrowUp, ArrowDown } from 'lucide-react';
import type { Account, AccountStatus } from '@/types/account';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface AccountsTableProps {
  accounts: Account[];
  sorting: SortingState;
  onSortingChange: React.Dispatch<React.SetStateAction<SortingState>>;
}

function getStatusVariant(status: AccountStatus) {
  const variants: Record<AccountStatus, 'success' | 'destructive' | 'warning' | 'secondary' | 'outline'> = {
    active: 'success',
    inactive: 'destructive',
    pending: 'warning',
    suspended: 'destructive',
    closed: 'secondary',
  };
  return variants[status];
}

export function AccountsTable({ accounts, sorting, onSortingChange }: AccountsTableProps) {
  const columns = useMemo<ColumnDef<Account>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: (info) => (
          <span className="font-medium">{info.getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => {
          const status = info.getValue() as AccountStatus;
          return (
            <Badge variant={getStatusVariant(status)} className="uppercase text-xs">
              {status}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'address.street',
        header: 'Street',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'address.city',
        header: 'City',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'address.state',
        header: 'State',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'address.zipCode',
        header: 'ZIP',
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  const table = useReactTable({
    data: accounts,
    columns,
    state: {
      sorting,
    },
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:bg-gradient-to-r"
            >
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-white">
                  {header.isPlaceholder ? null : (
                    <div
                      className={cn(
                        'flex items-center gap-1 font-semibold uppercase text-xs tracking-wide',
                        header.column.getCanSort() && 'cursor-pointer select-none hover:opacity-80'
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <ArrowUp className="h-3 w-3" />,
                        desc: <ArrowDown className="h-3 w-3" />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                No results found.
              </TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
