"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  productName:string
  price:number
  origin:{
    id:number
    nameOrigin:string
  }
  category:{
    categoryName:string
    slug:string
  }
}

export const columnsCoffees: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "productName",
    header: "Producto",
  },

  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "origin.nameOrigin",
    header: "Origin",
  },
  {
    accessorKey: "category.categoryName",
    header: "Category",
  },
]
