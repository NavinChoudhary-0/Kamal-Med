import Product from "./Product";

interface Order{
    id: string;
    products: Product[];
    total: number;
    status: string;
    date: string;
    shippingAddress: string;
    trackingNumber: string;
    estimatedDelivery?: string;
};

export default Order;