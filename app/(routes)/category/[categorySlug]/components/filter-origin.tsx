import useGetProductField from "@/api/getProductField";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FilterType, ResultType } from "@/types/filters";

type FilterOriginProps = {
    setFilterOrigin: (origin: string) => void
}

const FilterOrigin = (props: FilterOriginProps) => {
    const { setFilterOrigin } = props;
    const { loading, error, result }:FilterType = useGetProductField();
    return (
        <div className="my-5">
            <p className="mb-3 font-bold">Origen</p>
            {loading && result === null && (
                <p>Cargando origen...</p>
            )}

            <RadioGroup onValueChange={(value) => setFilterOrigin(value)}>
                {result !== null && result.map((origin: ResultType, index: number) => (
                    <div key={`origin-${index}`} className="flex items-center space-x-2">
                        <RadioGroupItem value={origin.nameOrigin} id={origin.nameOrigin} />
                        <Label htmlFor={origin.nameOrigin}>{origin.nameOrigin}</Label>
                    </div>
                ))}

            </RadioGroup>
        </div>
    );
}

export default FilterOrigin;