import { OrderDetail } from "./orderdetails.model"

export interface Order {
    id: number
    customerName: string
    shipperCompanyName: string
    orderDetails: OrderDetail[]
  }