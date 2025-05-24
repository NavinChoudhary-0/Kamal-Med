const featuredProducts = [
    {
      id: 1,
      name: 'Digital BP Monitor',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-1.2.1',
      discount: '20% OFF',
      category: 'Devices'
    },
    {
      id: 2,
      name: 'Vitamin D3 Supplements',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?ixlib=rb-1.2.1',
      discount: '15% OFF',
      category: 'Supplements'
    },
    {
      id: 3,
      name: 'First Aid Kit',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?ixlib=rb-1.2.1',
      discount: '10% OFF',
      category: 'Emergency'
    },
    {
      id: 4,
      name: 'Hand Sanitizer Pack',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?ixlib=rb-1.2.1',
      discount: '25% OFF',
      category: 'Personal Care'
    }
  ];
  
  const FeaturedProducts = () => {
    return (
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Featured Products</h2>
            <p className="mt-4 text-lg text-gray-500">Special offers and best-selling items</p>
          </div>
  
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group relative">
                <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md">
                    {product.discount}
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm text-gray-500">{product.category}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">{product.name}</p>
                  <p className="mt-1 text-lg font-semibold text-blue-600">${product.price}</p>
                  <button className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default FeaturedProducts;