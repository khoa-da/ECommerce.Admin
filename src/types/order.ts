import { OrderItem } from "./order-item"

export interface Order {
    id: string
    userId: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    storeId: string
    storeName: string
    storePhoneNumber: string
    orderNumber: string
    orderDate: string
    totalAmount: number
    shippingAddress: string
    billingAddress: string
    paymentStatus: string
    orderStatus: string
    paymentMethod: string
    shippingMethod: any
    orderItems: OrderItem[]
    notes: string
}
export interface UpdateOrderStatus {
    orderId: string
    orderStatus: string
}