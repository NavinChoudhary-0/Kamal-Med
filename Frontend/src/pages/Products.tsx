import { useState, useEffect, useRef, useCallback } from 'react';
import ProductCard from '../components/shared/ProductCard';
import Product from '../interfaces/Product';
import Loading from '../components/shared/Loading';
import { fetchProducts, fetchProductsFilterByQuery, fetchProductsByCategory } from '../services/ProductService';
import { categories } from '../config/AppConstants';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const hasMoreEachCategorieMap = useRef<Map<string, boolean>>(new Map());
  const lastSeenId = useRef<Map<string, number>>(new Map());
  const observer = useRef<IntersectionObserver | null>(null);
  const selectedCategoryRef = useRef(selectedCategory);
  let filteredProducts: Product[] = [];
  useEffect(() => {
    selectedCategoryRef.current = selectedCategory;
  }, [selectedCategory]);

  // Set initial hasMore and lastseenID values for each category
  useEffect(() => {
    categories.forEach(category => {
      hasMoreEachCategorieMap.current.set(category, true);
      lastSeenId.current.set(category.split(" ").join("_"), 0);
    });
  }, []);

  useEffect(() => {
    let maxValue = 0;
    products.forEach(product => {
      maxValue = Math.max(maxValue, Math.max(lastSeenId.current.get(product.category)?? 0, product.id));
      lastSeenId.current.set(product.category, Math.max(lastSeenId.current.get(product.category)?? 0, product.id));
    })
    lastSeenId.current.set("All", maxValue);
  }, [products])

  const lastProductElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && (hasMoreEachCategorieMap.current.get(selectedCategoryRef.current) ?? true)) {
        setLoading(true);        
        fetchProductsFilterByQuery(selectedCategoryRef.current, searchQuery, lastSeenId.current.get(selectedCategoryRef.current) ?? 0)
          .then((newProducts) => {  
            if(newProducts.length === 0){
              hasMoreEachCategorieMap.current.set(selectedCategory, false);
              if(selectedCategory === "All"){
                categories.forEach(category => {
                  hasMoreEachCategorieMap.current.set(category, false);
                });
              }
            }
            setProducts([...products, ...newProducts]);
          })
        setLoading(false);
      }
    });
    if (node) observer.current.observe(node);
  }, [products]);

  useEffect(() => {
    setLoading(true);
    fetchProductsFilterByQuery(selectedCategory, searchQuery, lastSeenId.current.get(selectedCategory)?? 0)
      .then((newProducts) => {
        setProducts(newProducts);
        setLoading(false);      
      });
  }, [])
  
  // Filter products based on selected category and search query
  filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  if(filteredProducts.length === 0 && !loading && hasMoreEachCategorieMap.current.get(selectedCategory)){
    setLoading(true);
    fetchProductsFilterByQuery(selectedCategory, searchQuery, lastSeenId.current.get(selectedCategory)?? 0)
     .then((newProducts) => {
      if(newProducts.length === 0){
        hasMoreEachCategorieMap.current.set(selectedCategory, false);
        setProducts([...products,...newProducts]);
        setLoading(false);
      }});
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between mb-8">
        <div className="flex space-x-4 mb-4 md:mb-0">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category.split(" ").join("_"))}
              className={`px-4 py-2 rounded-md ${
                selectedCategory === category.split(" ").join("_")
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => {
          if (filteredProducts.length === index + 1) {
            return (
              <div key={product.id} ref={lastProductElementRef}>
                <ProductCard {...product} />
              </div>
            );
          } else {
            return (
              <div key={product.id}>
                <ProductCard {...product} />
              </div>
            );
          }
        })}
      </div>
      {/* Loading indicator */}
      {loading && <Loading/>}
       {/* End of list message */}
       {!loading && !hasMoreEachCategorieMap.current.get(selectedCategory) && products.length > 0 && (
        <div className="flex flex-col items-center justify-center mt-12 mb-8">
          <div className="w-16 h-16 mb-4 relative">
            <div className="absolute inset-0 bg-blue-100 rounded-full opacity-50 animate-ping"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-1">That's all, folks!</h3>
          <p className="text-gray-500">You've seen all our amazing products</p>
        </div>
      )}

      {/* No products found message */}
      {!loading && products.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-medium text-gray-900 mb-1">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
    
  );
};

export default Products;