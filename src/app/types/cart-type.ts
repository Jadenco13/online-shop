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
    quantity: number
}

export interface CartTotalType {
    price: CartTotalPriceType
    products: number,
    quantity: number
}

export interface CartTotalPriceType {
    beforeDiscount: number,
    current: number
}

// ---

export interface AddProductInCartType {
    id: string,
    quantity: number
}

// ---

export interface ChosenProductsInfo {
    productId: string
    quantity: number,
    currentPrice: number,
    beforeDiscount: number,
    brand: string,
    imgURL: string
}