interface Order {
    id: string;
    userId: number;
    total: number;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' ;
    orderDate: string;
    deliveryDate: string;
    orderItems: number[];
    paymentMethod: string;
}

export default Order;