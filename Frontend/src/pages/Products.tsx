import { useState, useEffect, useRef, useCallback } from 'react';
import ProductCard from '../components/shared/ProductCard';
import Product from '../interfaces/Product';
import Loading from '../components/shared/Loading';
import { fetchProductsFilterByQuery } from '../services/ProductService';
import { categories } from '../config/AppConstants';
import {useCart} from '../Provider/CartContext';
import { useNavigate } from 'react-router-dom';

// SVG Icon for Shopping Cart
const ShoppingCartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8" />
  </svg>
);

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const hasMoreEachCategorieMap = useRef<Map<string, boolean>>(new Map());
  const lastSeenId = useRef<Map<string, number>>(new Map());
  const observer = useRef<IntersectionObserver | null>(null);
  const selectedCategoryRef = useRef(selectedCategory);
  const searchQueryRef = useRef(searchQuery);
  const userQueryList = useRef<{ [key: string]: number }>({});
  let filteredProducts: Product[] = [];
  const { getTotalItems } = useCart();
  useEffect(() => {
    selectedCategoryRef.current = selectedCategory;
  }, [selectedCategory]);
  const navigate = useNavigate();
  useEffect(() => {
    searchQueryRef.current = searchQuery;
  }, [searchQuery]);
  const onViewCart = () => {
    navigate("/cart");
  };
  // Set initial hasMore and lastseenID values for each category
  useEffect(() => {
    categories.forEach(category => {
      hasMoreEachCategorieMap.current.set(category, true);
      lastSeenId.current.set(category.split(" ").join("_"), 0);
    });
  }, []);

  const lastProductElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      console.log("Yes");
      
      if (entries[0].isIntersecting && (hasMoreEachCategorieMap.current.get(selectedCategoryRef.current) ?? true) && userQueryList.current[searchQueryRef.current] !== Number.MAX_SAFE_INTEGER) {
        setLoading(true);      
        console.log("Reached end of page");  
        fetchProductsFilterByQuery(selectedCategoryRef.current, searchQueryRef.current, lastSeenId.current, userQueryList.current)
          .then((newProducts) => {  
            if(newProducts.length === 0 && searchQueryRef.current === "" ){
              hasMoreEachCategorieMap.current.set(selectedCategoryRef.current, false);
              if(selectedCategoryRef.current === "All"){
                categories.forEach(category => {
                  hasMoreEachCategorieMap.current.set(category, false);
                });
              }
            }
            let maxi = 0;
            if(newProducts.length > 0){
              newProducts.forEach((product: Product) => {
                maxi = Math.max(maxi, product.id);
              })
            } 
            if(searchQueryRef.current.length > 0){
              if(newProducts.length < 20){
                userQueryList.current[searchQueryRef.current] = Number.MAX_SAFE_INTEGER;;
              }else{
                userQueryList.current[searchQueryRef.current] = maxi;
              }
            }
            if(searchQueryRef.current === "" && newProducts.length > 0){
              console.log("maxi", maxi);
              
              if(selectedCategoryRef.current === "All"){
                categories.forEach(category => {
                  lastSeenId.current.set(category.split(" ").join("_"), Math.max(maxi, lastSeenId.current.get(category.split(" ").join("_"))?? 0));
                });  
              }else{
                lastSeenId.current.set(selectedCategoryRef.current, maxi);
              }
            }
            let newFetchedProducts: Product[] = [];
            //checking for duplicates
            if(newProducts.length > 0){
              newFetchedProducts = newProducts.filter((newProduct: Product) => {
                return !products.some(product => product.id === newProduct.id);
              });
            }
            console.log("newFetchedProducts", lastSeenId.current);
            console.log("newFetchedProducts", hasMoreEachCategorieMap.current);
            console.log("newFetchedProducts", userQueryList.current);
            setProducts([...products, ...newFetchedProducts]);
            setLoading(false);
          })
      }
    });
    if (node) observer.current.observe(node);
  }, [products]);

  useEffect(() => {
    setLoading(true);
    fetchProductsFilterByQuery(selectedCategory, searchQuery, lastSeenId.current, userQueryList.current)
      .then((newProducts) => {
        setProducts(newProducts);
        categories.forEach(category => {
          lastSeenId.current.set(category.split(" ").join("_"), 20);
        });
        setLoading(false);      
      });
  }, [])
  
  // Filter products based on selected category and search query
  filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const regex = new RegExp(`\\b${searchQuery}.*`, 'i'); // 'i' for case-insensitive
    const matchesSearch = searchQuery.trim() === "" || regex.test(product.name) || regex.test(product.description);
    return matchesCategory && matchesSearch;
  });
  
  if(filteredProducts.length === 0 && !loading && hasMoreEachCategorieMap.current.get(selectedCategory) && userQueryList.current[searchQuery] !== Number.MAX_SAFE_INTEGER){
    setLoading(true);
    fetchProductsFilterByQuery(selectedCategory, searchQuery, lastSeenId.current, userQueryList.current)
     .then((newProducts) => {
      if(newProducts.length === 0){
        userQueryList.current[searchQuery] = Number.MAX_SAFE_INTEGER;
        
      }else{
        setProducts([...products,...newProducts]);
      }
      setLoading(false);
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with title and cart button */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
        
        {/* View Cart Button */}
        {onViewCart && (
          <button
            onClick={() => onViewCart()}
            className="relative flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            <span className="font-medium">View Cart</span>
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold min-w-[1.5rem] border-2 border-white">
                {getTotalItems() > 99 ? '99+' : getTotalItems()}
              </span>
            )}
          </button>
        )}  
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between mb-8">
        <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category.split(" ").join("_"))}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                selectedCategory === category.split(" ").join("_")
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery((e.target.value))}
            className="px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-80"
          />
          <svg 
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => {
          if (filteredProducts.length === index + 1) {
            return (
              <div key={product.id} ref={lastProductElementRef}>
                <ProductCard product={product} />
              </div>
            );
          } else {
            return (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            );
          }
        })}
      </div>
      
      {/* Loading indicator */}
      {loading && <Loading/>}
      
      {/* End of list message */}
      {!loading && filteredProducts.length > 0 && !hasMoreEachCategorieMap.current.get(selectedCategory) && products.length > 0 && (
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
      {!loading && filteredProducts.length === 0 && (
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