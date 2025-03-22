export interface ResultType {
    id: number;
    nameOrigin: string;
}

export type FilterType = {
    loading: boolean;
    error: string;
    result: ResultType[];
}