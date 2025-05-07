export interface AuthType {
    access_token: string,
    refresh_token: string
}

export interface UserInfo {
    address: string,
    age: number,
    avatar: string,
    cartID: string,
    chatIds: any[],
    email: string,
    firstName: string,
    gender: string,
    lastName: string,
    password: string,
    phone: string,
    role: string,
    verified: boolean,
    zipcode: string,
    _id: string
}
