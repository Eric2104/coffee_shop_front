"use client"
import { DataTable } from "./data-table";
import { columnsCoffees } from "./columns-coffees";
import { columnsCategories } from "./columns-category";
import { columnsOrigin } from "./columns-origin";
import { useGetCoffees } from "@/api/getCoffees";
import { useGetCategories } from "@/api/getCategories";
import { usegetOrigin } from "@/api/getOrigin";
import SubMenu from "./components/sub-menu";
import { useManager } from "@/hooks/use-manager";

interface DataType {
    loading: boolean;
    result: any; //! Modificar después 
    columns: any[];
    refetch: () => void;
}

type ViewType = "coffees" | "origin" | "categories";

const ContentManager = () => {
    const { error: coffeeError, loading: coffeeLoading, result: coffeeResult, refetch: refetchCoffees } = useGetCoffees();
    const { error: originError, loading: originLoading, result: originResult, refetch: refetchOrigin } = usegetOrigin();
    const { error: categoryError, loading: categoryLoading, result: categoryResult, refetch: refetchCategories } = useGetCategories();
    const { view } = useManager() as { view: ViewType };

    const data: Record<ViewType, DataType> = {
        coffees: { loading: coffeeLoading, result: coffeeResult, columns: columnsCoffees, refetch: refetchCoffees },
        origin: { loading: originLoading, result: originResult, columns: columnsOrigin, refetch: refetchOrigin },
        categories: { loading: categoryLoading, result: categoryResult, columns: columnsCategories, refetch: refetchCategories },
    };

    const { loading, result, columns, refetch } = data[view];

    return (
        <div>
            <SubMenu />
            {loading ? (
                <p>Loading...</p>) :
                <DataTable columns={columns} data={result} refetchData={refetch}  />
            }
        </div>
    );
};

export default ContentManager;