"use client"
import { DataTable } from "./data-table";
import { columnsCoffees } from "./columns-coffees";
import { columnsCategories } from "./columns-category";
import { columnsOrigin } from "./columns-origin";
import { useGetCoffees } from "@/api/getCoffees";
import { useGetCategories } from "@/api/getCategories";
import { useState } from "react";
import { usegetOrigin } from "@/api/getOrigin";
import SubMenu from "./components/sub-menu";
import { useManager } from "@/hooks/use-manager";

interface DataType {
    loading: boolean;
    result: any; //! Modificar después 
    columns: any[];
}

type ViewType = "coffees" | "origin" | "categories";

const ContentManager = () => {
    const { error: coffeeError, loading: coffeeLoading, result: coffeeResult } = useGetCoffees();
    const { error: originError, loading: originLoading, result: originResult } = usegetOrigin();
    const { error: categoryError, loading: categoryLoading, result: categoryResult } = useGetCategories();
    const { view } = useManager() as { view: ViewType };

    const data: Record<ViewType, DataType> = {
        coffees: { loading: coffeeLoading, result: coffeeResult, columns: columnsCoffees },
        origin: { loading: originLoading, result: originResult, columns: columnsOrigin },
        categories: { loading: categoryLoading, result: categoryResult, columns: columnsCategories },
    };

    const { loading, result, columns } = data[view];

    return (
        <div>
            <SubMenu />
            {loading ? (
                <p>Loading...</p>) :
                <DataTable columns={columns} data={result} />
            }
        </div>
    );
};

export default ContentManager;