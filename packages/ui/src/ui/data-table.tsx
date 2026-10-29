'use client';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type OnChangeFn,
  type RowSelectionState,
  type SortingState,
  type TableOptions,
  useReactTable
} from '@tanstack/react-table';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import { Checkbox } from '@/ui/checkbox';
import { Input } from '@/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
export interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  className?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  initialPageSize?: number;
  pageSizeOptions?: number[];
  enableRowSelection?: boolean;
  getRowId?: TableOptions<TData>['getRowId'];
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
}
export function DataTable<TData>({
  columns,
  data,
  className,
  searchPlaceholder = 'Search...',
  emptyMessage = 'No results.',
  initialPageSize = 10,
  pageSizeOptions = [10, 20, 50],
  enableRowSelection = true,
  getRowId,
  onRowSelectionChange
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const selectionColumn: ColumnDef<TData> = {
    id: 'select',
    enableHiding: false,
    enableSorting: false,
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all rows on page"
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onCheckedChange={(checked) => table.toggleAllPageRowsSelected(Boolean(checked))}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onCheckedChange={(checked) => row.toggleSelected(Boolean(checked))}
      />
    )
  };
  const table = useReactTable({
    data,
    columns: enableRowSelection ? [selectionColumn, ...columns] : columns,
    state: { sorting, globalFilter, rowSelection },
    initialState: { pagination: { pageSize: initialPageSize } },
    enableRowSelection,
    getRowId,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: (updater) => {
      setRowSelection(updater);
      onRowSelectionChange?.(updater);
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });
  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Input
          type="search"
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          className="max-w-sm"
        />
        <div className="flex items-center gap-2 text-sm leading-5 text-muted-foreground">
          <span>Rows per page</span>
          <Select
            value={String(table.getState().pagination.pageSize)}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="h-8 w-20" aria-label="Rows per page">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className={cn('overflow-x-auto border border-border bg-background', 'rounded-surface')}>
        <table className="w-full border-collapse text-sm leading-5">
          <thead className="bg-secondary text-left">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-border">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    aria-sort={
                      header.column.getCanSort()
                        ? header.column.getIsSorted() === 'asc'
                          ? 'ascending'
                          : header.column.getIsSorted() === 'desc'
                            ? 'descending'
                            : 'none'
                        : undefined
                    }
                    className="h-11 whitespace-nowrap px-3 text-xs font-medium text-muted-foreground"
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <svg
                          viewBox="0 0 16 16"
                          className="size-3.5 text-muted-foreground"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          aria-hidden="true"
                        >
                          <path
                            d={
                              header.column.getIsSorted() === 'asc'
                                ? 'm4 9 4-4 4 4'
                                : header.column.getIsSorted() === 'desc'
                                  ? 'm4 6 4 4 4-4'
                                  : 'm5 6 3-3 3 3M5 10l3 3 3-3'
                            }
                          />
                        </svg>
                      </button>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() ? 'selected' : undefined}
                  className="border-b border-border transition-colors last:border-b-0 hover:bg-accent/70 data-[state=selected]:bg-accent"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="h-12 whitespace-nowrap px-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={table.getVisibleLeafColumns().length} className="h-24 text-center text-muted-foreground">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm leading-5">
        <span className="text-muted-foreground">
          {enableRowSelection
            ? `${table.getFilteredSelectedRowModel().rows.length} of ${table.getFilteredRowModel().rows.length} selected`
            : `${table.getFilteredRowModel().rows.length} rows`}
        </span>
        <div className="flex items-center gap-2">
          <span className="mr-2 text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of {Math.max(table.getPageCount(), 1)}
          </span>
          <Button
            variant="outline"
            size="sm"
            aria-label="First page"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.firstPage()}
          >
            <PageChevron direction="left" double />
          </Button>
          <Button
            variant="outline"
            size="sm"
            aria-label="Previous page"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            <PageChevron direction="left" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            aria-label="Next page"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            <PageChevron direction="right" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            aria-label="Last page"
            disabled={!table.getCanNextPage()}
            onClick={() => table.lastPage()}
          >
            <PageChevron direction="right" double />
          </Button>
        </div>
      </div>
    </div>
  );
}

function PageChevron({ direction, double }: { direction: 'left' | 'right'; double?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d={direction === 'left' ? 'm10 4-4 4 4 4' : 'm6 4 4 4-4 4'} />
      {double && <path d={direction === 'left' ? 'M3 3v10' : 'M13 3v10'} />}
    </svg>
  );
}
