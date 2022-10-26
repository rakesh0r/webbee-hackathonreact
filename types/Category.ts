export interface CategoryField {
    id: string;
    name: string;
    type: string;
}

export interface Category {
    id: string;
    name: string;
    titleField: CategoryField;
    fields: CategoryField[]
}