import Address from "./Address";
interface User{
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    contact: string | null,
    address: Address[]
    totalOrders: number,
    loyaltyPoints: number,
    totalSpent: number
}

export default User;