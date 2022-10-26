export interface FieldValues {
    id: string;
    value: string;
}

export interface InventoryItem {
    id: string;
    categoryId: string;
    values: FieldValues[]
}