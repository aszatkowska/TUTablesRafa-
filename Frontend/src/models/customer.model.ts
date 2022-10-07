import { Address } from "./address.model"

export interface Customer {
    id: number
    name: string
    lastName: string
    phone: string
    email: string
    address: Address
  }