import { Address } from "./address.model"

export interface Supplier {
    id: number
    name: string
    lastName: string
    phone: string
    email: string
    address: Address
  }