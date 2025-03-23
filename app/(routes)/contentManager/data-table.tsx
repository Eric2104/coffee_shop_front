"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useManager } from "@/hooks/use-manager"
import useDeleteCoffee from "@/api/useDeleteCoffee"
import useDeleteOrigin from "@/api/useDeleteOrigin"
import useDeleteCategory from "@/api/useDeleteCategory"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  refetchData: () => void;
}

export function DataTable<TData, TValue>({ columns, data, refetchData }: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const { view } = useManager();
  const { deleteCoffee } = useDeleteCoffee()
  const { deleteOrigin } = useDeleteOrigin()
  const { deleteCategory } = useDeleteCategory()



  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnFilters,
      columnVisibility,
    },
  })

  const handleDelete = async (id: number) => {
    switch (view) {
      case "coffees":
        await deleteCoffee(id);
        break;
      case "origin":
        await deleteOrigin(id);
        break;
      case "categories":
        await deleteCategory(id);
        break;
    }
    refetchData();
  }

  const getColumnFilterName = () => {
    switch (view) {
      case "coffees":
        return "productName";
      case "origin":
        return "nameOrigin";
      case "categories":
        return "categoryName";
      default:
        return "productName";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4">
      <div className="flex items-center py-4 gap-4 flex-wrap">
        <Input
          placeholder="Buscar elemento"
          value={(table.getColumn(getColumnFilterName())?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn(getColumnFilterName())?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Ajustar columnas</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table.getAllColumns().filter((column) => column.getCanHide()).map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
                <TableHead className="text-center">Opción</TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                  <TableCell className="text-center">
                    <div className="flex gap-2 items-center justify-center">
                      <Link href={`/contentManager/${view}/${row.original.id}`} className="px-3 py-2 bg-gray-200 rounded text-gray-800 my-2 hover:cursor-pointer hover:bg-gray-300 transition-colors duration-150">Editar</Link>
                      <Button variant="destructive" onClick={() => { handleDelete(row.original.id) }}>Eliminar</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-6">No hay resultados.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end py-4 gap-2">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Anterior
        </Button>
        <span>
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </span>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Siguiente
        </Button>
      </div>
    </div>
  );
}
