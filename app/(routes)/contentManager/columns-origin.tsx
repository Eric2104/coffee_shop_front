"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Payment = {
  id: string
  nameOrigin:string
}

export const columnsOrigin: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "nameOrigin",
    header: "Origin",
  }
]
