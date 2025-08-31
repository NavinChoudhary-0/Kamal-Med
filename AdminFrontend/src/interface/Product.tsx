interface Product {
    id: number;
    name: string;
    category: string;
    description: string;
    image: string;
    rating: number;
    price: string;
    quantity: number;
    discount?: number;
}

export default Product;