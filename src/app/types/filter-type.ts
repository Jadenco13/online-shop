export interface FilterType {
    page_index: number,
    page_size: number,
    keywords: string | null,
    category_id: string | null,
    brand: string | null,
    rating: number | null,
    price_min: number | null,
    price_max: number | null,
    sort_by: string | null,
    sort_direction: string | null;
}
