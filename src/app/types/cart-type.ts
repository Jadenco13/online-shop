export interface CartType {
    createdAt: string,
    products: CartProductType[],
    total: CartTotalType,
    userId: string,
    _id: string
}

export interface CartProductType {
    beforeDiscountPrice: number,
    pricePerQuantity: number,
    productId: string,
    qunatity: number
}

export interface CartTotalType {
    price: CartTotalPriceType[]
    products: number,
    qunatity: number
}

export interface CartTotalPriceType {
    beforeDiscount: number,
    current: number
}

export interface AddProductInCartType {
    id: string,
    quantity: number
}