"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Payment = {
  id: string
  slug:string
  categoryName:string
}

export const columnsCategories: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "categoryName",
    header: "Categoria",
  },
  {
    accessorKey: "slug",
    header: "slug categoria",
  }
  
]
