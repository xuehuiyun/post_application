import {
    ColumnDef,
    ColumnFiltersState,
    FilterFn,
    OnChangeFn,
    PaginationState,
    SortingState,
    TableOptions,
    getCoreRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import { useState } from "react";

declare module "@tanstack/table-core" {
    interface FilterFns {
        multifilter: FilterFn<unknown>;
    }
}

interface ClientSideTableOptions<TData> {
    columns: Array<ColumnDef<TData, any>>;
    data: TData[];
    initialState?: {
        sorting?: SortingState;
        columnFilters?: ColumnFiltersState;
        pagination?: PaginationState;
    };

    overrides?: Partial<TableOptions<TData>>;
}

/**
 * Used for client-side paginated/sorted/filtered/etc tables.
 */
export function useClientTable<TData>({
    columns,
    data,
    initialState,
    overrides
}: ClientSideTableOptions<TData>) {
    const [sorting, setSorting] = useState<SortingState>(
        initialState?.sorting ?? []
    );
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        initialState?.columnFilters ?? []
    );
    const [pagination, setPagination] = useState<PaginationState>(
        initialState?.pagination ?? {
            pageIndex: 0,
            pageSize: 10
        }
    );

    return useReactTable<TData>({
        data,
        columns,
        filterFns: {
            multifilter: (row, columnId, filterValues) => {
                return filterValues.length === 0
                    ? row
                    : filterValues.includes(row.getValue(columnId));
            }
        },
        state: {
            columnFilters,
            sorting,
            pagination
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getSortedRowModel: getSortedRowModel(),
        ...overrides
    });
}

interface ServerSideTableOptions<TData> {
    columns: ClientSideTableOptions<TData>["columns"];
    data: ClientSideTableOptions<TData>["data"];
    pageCount: number;
    pagination?: PaginationState;
    sorting?: SortingState;
    onPaginationChange?: OnChangeFn<PaginationState>;
    onSortingChange?: OnChangeFn<SortingState>;
    overrides?: ClientSideTableOptions<TData>["overrides"];
}

/**
 * Used for server-side paginated/sorted/filtered/etc tables.
 */
export function useServerTable<TData>({
    columns,
    data,
    pageCount,
    overrides,
    pagination,
    sorting,
    onPaginationChange,
    onSortingChange
}: ServerSideTableOptions<TData>) {
    return useClientTable({
        columns,
        data,
        overrides: {
            manualPagination: true,
            manualSorting: true,
            manualFiltering: true,
            manualGrouping: true,
            pageCount,
            state: {
                pagination,
                sorting
            },
            onSortingChange,
            onPaginationChange,
            ...overrides
        }
    });
}
