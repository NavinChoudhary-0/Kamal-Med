// import React, { useState, useEffect } from 'react';
// import { 
//   ShoppingCart, 
//   Search, 
//   Filter, 
//   Heart, 
//   Star, 
//   Plus, 
//   Minus, 
//   User, 
//   Menu, 
//   X, 
//   Grid, 
//   List, 
//   ChevronDown, 
//   ArrowRight, 
//   Eye, 
//   ShoppingBag,
//   Truck,
//   Shield,
//   RotateCcw,
//   Clock,
//   MapPin,
//   Phone,
//   Mail,
//   Facebook,
//   Twitter,
//   Instagram
// } from 'lucide-react';

// const GuestShoppingInterface = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [sortBy, setSortBy] = useState('featured');
//   const [viewMode, setViewMode] = useState('grid');
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [showLoginPrompt, setShowLoginPrompt] = useState(false);
//   const [promptAction, setPromptAction] = useState('');
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [showCartPage, setShowCartPage] = useState(false);

//   // Mock product data
//   const products = [
//     {
//       id: 1,
//       name: 'Wireless Bluetooth Headphones',
//       price: 89.99,
//       originalPrice: 129.99,
//       rating: 4.5,
//       reviews: 128,
//       image: '🎧',
//       category: 'electronics',
//       description: 'Premium wireless headphones with noise cancellation and 30-hour battery life.',
//       features: ['Noise Cancellation', '30hr Battery', 'Quick Charge', 'Premium Sound'],
//       inStock: true,
//       discount: 31
//     },
//     {
//       id: 2,
//       name: 'Smart Fitness Watch',
//       price: 199.99,
//       originalPrice: 249.99,
//       rating: 4.7,
//       reviews: 89,
//       image: '⌚',
//       category: 'electronics',
//       description: 'Advanced fitness tracking with heart rate monitoring and GPS.',
//       features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', '7-day Battery'],
//       inStock: true,
//       discount: 20
//     },
//     {
//       id: 3,
//       name: 'Premium Coffee Maker',
//       price: 149.99,
//       originalPrice: 199.99,
//       rating: 4.3,
//       reviews: 156,
//       image: '☕',
//       category: 'home',
//       description: 'Professional-grade coffee maker with programmable brewing.',
//       features: ['Programmable Timer', '12-cup Capacity', 'Auto Shut-off', 'Premium Filter'],
//       inStock: true,
//       discount: 25
//     },
//     {
//       id: 4,
//       name: 'Ergonomic Office Chair',
//       price: 299.99,
//       originalPrice: 399.99,
//       rating: 4.6,
//       reviews: 203,
//       image: '🪑',
//       category: 'furniture',
//       description: 'Ergonomic design with lumbar support and adjustable height.',
//       features: ['Lumbar Support', 'Height Adjustable', 'Breathable Mesh', '5-year Warranty'],
//       inStock: true,
//       discount: 25
//     },
//     {
//       id: 5,
//       name: 'Wireless Phone Charger',
//       price: 24.99,
//       originalPrice: 34.99,
//       rating: 4.2,
//       reviews: 67,
//       image: '📱',
//       category: 'electronics',
//       description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
//       features: ['Fast Charging', 'Universal Compatibility', 'LED Indicator', 'Compact Design'],
//       inStock: false,
//       discount: 29
//     },
//     {
//       id: 6,
//       name: 'Organic Cotton Bed Sheets',
//       price: 79.99,
//       originalPrice: 119.99,
//       rating: 4.8,
//       reviews: 312,
//       image: '🛏️',
//       category: 'home',
//       description: 'Luxury organic cotton sheets with 400 thread count.',
//       features: ['400 Thread Count', 'Organic Cotton', 'Hypoallergenic', 'Machine Washable'],
//       inStock: true,
//       discount: 33
//     }
//   ];

//   const categories = [
//     { id: 'all', name: 'All Products', count: products.length },
//     { id: 'electronics', name: 'Electronics', count: products.filter(p => p.category === 'electronics').length },
//     { id: 'home', name: 'Home & Kitchen', count: products.filter(p => p.category === 'home').length },
//     { id: 'furniture', name: 'Furniture', count: products.filter(p => p.category === 'furniture').length }
//   ];

//   const heroSlides = [
//     {
//       title: 'Summer Sale - Up to 50% Off',
//       subtitle: 'Discover amazing deals on electronics and home essentials',
//       cta: 'Shop Now',
//       bg: 'bg-gradient-to-r from-blue-600 to-purple-600'
//     },
//     {
//       title: 'New Arrivals',
//       subtitle: 'Check out the latest products just added to our collection',
//       cta: 'Explore',
//       bg: 'bg-gradient-to-r from-green-600 to-blue-600'
//     },
//     {
//       title: 'Free Shipping',
//       subtitle: 'On orders over $50. Fast delivery to your doorstep',
//       cta: 'Learn More',
//       bg: 'bg-gradient-to-r from-purple-600 to-pink-600'
//     }
//   ];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   const filteredProducts = products.filter(product => {
//     const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     switch (sortBy) {
//       case 'price-low': return a.price - b.price;
//       case 'price-high': return b.price - a.price;
//       case 'rating': return b.rating - a.rating;
//       case 'name': return a.name.localeCompare(b.name);
//       default: return 0;
//     }
//   });

//   const handleLoginRedirect = (action) => {
//     setPromptAction(action);
//     setShowLoginPrompt(true);
//   };

//   const redirectToLogin = () => {
//     // In a real app, this would be React Router or Next.js navigation
//     const loginUrl = '/login';
//     console.log(`Redirecting to: ${loginUrl}?redirect=${encodeURIComponent(window.location.pathname)}&action=${promptAction}`);
//     setShowLoginPrompt(false);
//     // Simulate redirect
//     alert(`Redirecting to login page...\nURL: ${loginUrl}\nReturn URL: ${window.location.pathname}\nAction: ${promptAction}`);
//   };

//   const addToCart = (product) => {
//     const existingItem = cartItems.find(item => item.id === product.id);
//     if (existingItem) {
//       setCartItems(cartItems.map(item => 
//         item.id === product.id 
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       ));
//     } else {
//       setCartItems([...cartItems, { ...product, quantity: 1 }]);
//     }
//   };

//   const removeFromCart = (productId) => {
//     setCartItems(cartItems.filter(item => item.id !== productId));
//   };

//   const updateQuantity = (productId, newQuantity) => {
//     if (newQuantity === 0) {
//       removeFromCart(productId);
//     } else {
//       setCartItems(cartItems.map(item => 
//         item.id === productId 
//           ? { ...item, quantity: newQuantity }
//           : item
//       ));
//     }
//   };

//   const toggleWishlist = (product) => {
//     const isInWishlist = wishlistItems.some(item => item.id === product.id);
//     if (isInWishlist) {
//       setWishlistItems(wishlistItems.filter(item => item.id !== product.id));
//     } else {
//       setWishlistItems([...wishlistItems, product]);
//     }
//   };

//   const getCartTotal = () => {
//     return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
//   };

//   const getCartCount = () => {
//     return cartItems.reduce((total, item) => total + item.quantity, 0);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo */}
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
//               >
//                 <Menu className="w-6 h-6" />
//               </button>
//               <div className="flex items-center space-x-2">
//                 <ShoppingBag className="w-8 h-8 text-blue-600" />
//                 <h1 className="text-2xl font-bold text-gray-900">ShopCart</h1>
//               </div>
//             </div>

//             {/* Search Bar */}
//             <div className="hidden md:flex flex-1 max-w-lg mx-8">
//               <div className="relative w-full">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => handleLoginRedirect('wishlist')}
//                 className="relative p-2 text-gray-600 hover:text-gray-900"
//               >
//                 <Heart className="w-6 h-6" />
//                 {wishlistItems.length > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                     {wishlistItems.length}
//                   </span>
//                 )}
//               </button>
              
//               <button
//                 onClick={() => setShowCartPage(true)}
//                 className="relative p-2 text-gray-600 hover:text-gray-900"
//               >
//                 <ShoppingCart className="w-6 h-6" />
//                 {cartItems.length > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                     {getCartCount()}
//                   </span>
//                 )}
//               </button>

//               <button
//                 onClick={() => handleLoginRedirect('login')}
//                 className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 <User className="w-4 h-4" />
//                 <span className="hidden sm:inline">Sign In</span>
//               </button>
//             </div>
//           </div>

//           {/* Mobile Search */}
//           <div className="md:hidden pb-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="fixed inset-0 z-50 lg:hidden">
//           <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)} />
//           <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg">
//             <div className="p-4 border-b">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-lg font-semibold">Categories</h2>
//                 <button onClick={() => setIsMenuOpen(false)}>
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//             <div className="p-4">
//               {categories.map(category => (
//                 <button
//                   key={category.id}
//                   onClick={() => {
//                     setSelectedCategory(category.id);
//                     setIsMenuOpen(false);
//                   }}
//                   className={`w-full text-left px-3 py-2 rounded-lg mb-2 ${
//                     selectedCategory === category.id
//                       ? 'bg-blue-100 text-blue-700'
//                       : 'hover:bg-gray-100'
//                   }`}
//                 >
//                   {category.name} ({category.count})
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Hero Section */}
//       <section className="relative bg-gray-900 h-96 overflow-hidden">
//         <div className="absolute inset-0">
//           {heroSlides.map((slide, index) => (
//             <div
//               key={index}
//               className={`absolute inset-0 transition-opacity duration-1000 ${
//                 index === currentSlide ? 'opacity-100' : 'opacity-0'
//               } ${slide.bg}`}
//             >
//               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
//                 <div className="text-white">
//                   <h2 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h2>
//                   <p className="text-xl md:text-2xl mb-8 opacity-90">{slide.subtitle}</p>
//                   <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
//                     {slide.cta}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         {/* Slide Indicators */}
//         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//           {heroSlides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`w-3 h-3 rounded-full transition-colors ${
//                 index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
//               }`}
//             />
//           ))}
//         </div>
//       </section>

//       {/* Features */}
//       <section className="py-12 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             {[
//               { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
//               { icon: Shield, title: 'Secure Payment', desc: '100% secure checkout' },
//               { icon: RotateCcw, title: 'Easy Returns', desc: '30-day return policy' },
//               { icon: Clock, title: '24/7 Support', desc: 'Always here to help' }
//             ].map((feature, index) => (
//               <div key={index} className="text-center">
//                 <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="lg:grid lg:grid-cols-12 lg:gap-8">
//           {/* Sidebar Filters */}
//           <div className="hidden lg:block lg:col-span-3 mb-8 lg:mb-0">
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
//               <div className="space-y-2">
//                 {categories.map(category => (
//                   <button
//                     key={category.id}
//                     onClick={() => setSelectedCategory(category.id)}
//                     className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
//                       selectedCategory === category.id
//                         ? 'bg-blue-100 text-blue-700'
//                         : 'hover:bg-gray-100'
//                     }`}
//                   >
//                     <div className="flex justify-between items-center">
//                       <span>{category.name}</span>
//                       <span className="text-sm text-gray-500">({category.count})</span>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="lg:col-span-9">
//             {/* Toolbar */}
//             <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
//                 <div className="flex items-center space-x-4">
//                   <span className="text-gray-600">
//                     {sortedProducts.length} products found
//                   </span>
//                 </div>
                
//                 <div className="flex items-center space-x-4">
//                   <div className="flex items-center space-x-2">
//                     <span className="text-sm text-gray-600">Sort by:</span>
//                     <select
//                       value={sortBy}
//                       onChange={(e) => setSortBy(e.target.value)}
//                       className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="featured">Featured</option>
//                       <option value="price-low">Price: Low to High</option>
//                       <option value="price-high">Price: High to Low</option>
//                       <option value="rating">Customer Rating</option>
//                       <option value="name">Name</option>
//                     </select>
//                   </div>
                  
//                   <div className="flex items-center border border-gray-300 rounded-lg">
//                     <button
//                       onClick={() => setViewMode('grid')}
//                       className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
//                     >
//                       <Grid className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={() => setViewMode('list')}
//                       className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
//                     >
//                       <List className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Products Grid */}
//             {sortedProducts.length === 0 ? (
//               <div className="text-center py-12">
//                 <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
//                 <p className="text-gray-600">Try adjusting your search or filter criteria</p>
//               </div>
//             ) : (
//               <div className={`grid gap-6 ${
//                 viewMode === 'grid' 
//                   ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
//                   : 'grid-cols-1'
//               }`}>
//                 {sortedProducts.map(product => (
//                   <div
//                     key={product.id}
//                     className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow ${
//                       viewMode === 'list' ? 'flex' : ''
//                     }`}
//                   >
//                     {/* Product Image */}
//                     <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''} relative`}>
//                       <div className={`${viewMode === 'list' ? 'h-48' : 'h-64'} bg-gray-100 rounded-t-lg flex items-center justify-center text-6xl relative overflow-hidden`}>
//                         {product.image}
//                         {product.discount > 0 && (
//                           <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
//                             -{product.discount}%
//                           </div>
//                         )}
//                         {!product.inStock && (
//                           <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                             <span className="text-white font-semibold">Out of Stock</span>
//                           </div>
//                         )}
//                         <button
//                           onClick={() => toggleWishlist(product)}
//                           className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
//                         >
//                           <Heart className={`w-4 h-4 ${
//                             wishlistItems.some(item => item.id === product.id)
//                               ? 'text-red-500 fill-current'
//                               : 'text-gray-400'
//                           }`} />
//                         </button>
//                       </div>
//                     </div>

//                     {/* Product Info */}
//                     <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
//                       <div className={`${viewMode === 'list' ? 'flex justify-between h-full' : ''}`}>
//                         <div className={`${viewMode === 'list' ? 'flex-1 pr-4' : ''}`}>
//                           <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
//                             {product.name}
//                           </h3>
                          
//                           <div className="flex items-center space-x-2 mb-2">
//                             <div className="flex items-center">
//                               {[...Array(5)].map((_, i) => (
//                                 <Star
//                                   key={i}
//                                   className={`w-4 h-4 ${
//                                     i < Math.floor(product.rating)
//                                       ? 'text-yellow-400 fill-current'
//                                       : 'text-gray-300'
//                                   }`}
//                                 />
//                               ))}
//                             </div>
//                             <span className="text-sm text-gray-600">
//                               {product.rating} ({product.reviews} reviews)
//                             </span>
//                           </div>

//                           <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                             {product.description}
//                           </p>

//                           {viewMode === 'list' && (
//                             <div className="mb-3">
//                               <div className="flex flex-wrap gap-1">
//                                 {product.features.slice(0, 3).map((feature, index) => (
//                                   <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
//                                     {feature}
//                                   </span>
//                                 ))}
//                               </div>
//                             </div>
//                           )}
//                         </div>

//                         <div className={`${viewMode === 'list' ? 'flex flex-col justify-between items-end' : ''}`}>
//                           <div className={`mb-4 ${viewMode === 'list' ? 'text-right' : ''}`}>
//                             <div className="flex items-center space-x-2">
//                               <span className="text-2xl font-bold text-gray-900">
//                                 ${product.price.toFixed(2)}
//                               </span>
//                               {product.originalPrice > product.price && (
//                                 <span className="text-lg text-gray-500 line-through">
//                                   ${product.originalPrice.toFixed(2)}
//                                 </span>
//                               )}
//                             </div>
//                           </div>

//                           <div className={`flex ${viewMode === 'list' ? 'flex-col' : ''} gap-2`}>
//                             <button
//                               onClick={() => setSelectedProduct(product)}
//                               className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                             >
//                               <Eye className="w-4 h-4" />
//                               <span>View</span>
//                             </button>
                            
//                             <button
//                               onClick={() => product.inStock ? addToCart(product) : null}
//                               disabled={!product.inStock}
//                               className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
//                                 product.inStock
//                                   ? 'bg-blue-600 text-white hover:bg-blue-700'
//                                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                               }`}
//                             >
//                               <ShoppingCart className="w-4 h-4" />
//                               <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Product Quick View Modal */}
//       {selectedProduct && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSelectedProduct(null)} />
//           <div className="flex min-h-screen items-center justify-center p-4">
//             <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
//               <div className="p-6">
//                 <div className="flex justify-between items-start mb-6">
//                   <h2 className="text-2xl font-bold text-gray-900">Quick View</h2>
//                   <button
//                     onClick={() => setSelectedProduct(null)}
//                     className="p-2 hover:bg-gray-100 rounded-lg"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                   <div>
//                     <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center text-8xl mb-4">
//                       {selectedProduct.image}
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="text-2xl font-bold text-gray-900 mb-4">
//                       {selectedProduct.name}
//                     </h3>
                    
//                     <div className="flex items-center space-x-2 mb-4">
//                       <div className="flex items-center">
//                         {[...Array(5)].map((_, i) => (
//                           <Star
//                             key={i}
//                             className={`w-5 h-5 ${
//                               i < Math.floor(selectedProduct.rating)
//                                 ? 'text-yellow-400 fill-current'
//                                 : 'text-gray-300'
//                             }`}
//                           />
//                         ))}
//                       </div>
//                       <span className="text-gray-600">
//                         {selectedProduct.rating} ({selectedProduct.reviews} reviews)
//                       </span>
//                     </div>

//                     <div className="flex items-center space-x-3 mb-6">
//                       <span className="text-3xl font-bold text-gray-900">
//                         ${selectedProduct.price.toFixed(2)}
//                       </span>
//                       {selectedProduct.originalPrice > selectedProduct.price && (
//                         <>
//                           <span className="text-xl text-gray-500 line-through">
//                             ${selectedProduct.originalPrice.toFixed(2)}
//                           </span>
//                           <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded-full">
//                             Save ${(selectedProduct.originalPrice - selectedProduct.price).toFixed(2)}
//                           </span>
//                         </>
//                       )}
//                     </div>

//                     <p className="text-gray-600 mb-6">
//                       {selectedProduct.description}
//                     </p>

//                     <div className="mb-6">
//                       <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
//                       <div className="grid grid-cols-2 gap-2">
//                         {selectedProduct.features.map((feature, index) => (
//                           <div key={index} className="flex items-center space-x-2">
//                             <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
//                             <span className="text-sm text-gray-600">{feature}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="flex space-x-4">
//                       <button
//                         onClick={() => {
//                           if (selectedProduct.inStock) {
//                             addToCart(selectedProduct);
//                             setSelectedProduct(null);
//                           }
//                         }}
//                         disabled={!selectedProduct.inStock}
//                         className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
//                           selectedProduct.inStock
//                             ? 'bg-blue-600 text-white hover:bg-blue-700'
//                             : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                         }`}
//                       >
//                         <ShoppingCart className="w-5 h-5" />
//                         <span>{selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
//                       </button>
                      
//                       <button
//                         onClick={() => toggleWishlist(selectedProduct)}
//                         className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                       >
//                         <Heart className={`w-5 h-5 ${
//                           wishlistItems.some(item => item.id === selectedProduct.id)
//                             ? 'text-red-500 fill-current'
//                             : 'text-gray-400'
//                         }`} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Cart Page Modal */}
//       {showCartPage && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowCartPage(false)} />
//           <div className="flex min-h-screen items-start justify-center p-4 pt-8">
//             <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
//               {/* Cart Header */}
//               <div className="p-6 border-b">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <ShoppingCart className="w-6 h-6 text-blue-600" />
//                     <h2 className="text-2xl font-bold text-gray-900">
//                       Shopping Cart ({getCartCount()} items)
//                     </h2>
//                   </div>
//                   <button
//                     onClick={() => setShowCartPage(false)}
//                     className="p-2 hover:bg-gray-100 rounded-lg"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>

//               {/* Cart Content */}
//               <div className="p-6">
//                 {cartItems.length === 0 ? (
//                   <div className="text-center py-12">
//                     <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
//                     <p className="text-gray-600 mb-6">Add some products to get started!</p>
//                     <button
//                       onClick={() => setShowCartPage(false)}
//                       className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
//                     >
//                       Continue Shopping
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                     {/* Cart Items */}
//                     <div className="lg:col-span-2">
//                       <div className="space-y-4">
//                         {cartItems.map(item => (
//                           <div key={item.id} className="bg-gray-50 rounded-lg p-4">
//                             <div className="flex items-center space-x-4">
//                               {/* Product Image */}
//                               <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
//                                 {item.image}
//                               </div>

//                               {/* Product Info */}
//                               <div className="flex-1 min-w-0">
//                                 <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
//                                 <p className="text-sm text-gray-600 mb-2">
//                                   {products.find(p => p.id === item.id)?.description?.slice(0, 80)}...
//                                 </p>
//                                 <div className="flex items-center space-x-2">
//                                   <span className="text-lg font-bold text-gray-900">
//                                     ${item.price.toFixed(2)}
//                                   </span>
//                                   {products.find(p => p.id === item.id)?.originalPrice > item.price && (
//                                     <span className="text-sm text-gray-500 line-through">
//                                       ${products.find(p => p.id === item.id)?.originalPrice.toFixed(2)}
//                                     </span>
//                                   )}
//                                 </div>
//                               </div>

//                               {/* Quantity Controls */}
//                               <div className="flex items-center space-x-3">
//                                 <div className="flex items-center border border-gray-300 rounded-lg">
//                                   <button
//                                     onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                                     className="p-2 hover:bg-gray-100 rounded-l-lg"
//                                   >
//                                     <Minus className="w-4 h-4" />
//                                   </button>
//                                   <span className="px-4 py-2 font-medium">{item.quantity}</span>
//                                   <button
//                                     onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                                     className="p-2 hover:bg-gray-100 rounded-r-lg"
//                                   >
//                                     <Plus className="w-4 h-4" />
//                                   </button>
//                                 </div>
                                
//                                 <button
//                                   onClick={() => removeFromCart(item.id)}
//                                   className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
//                                 >
//                                   <X className="w-4 h-4" />
//                                 </button>
//                               </div>

//                               {/* Item Total */}
//                               <div className="text-right">
//                                 <div className="font-bold text-gray-900">
//                                   ${(item.price * item.quantity).toFixed(2)}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       {/* Continue Shopping */}
//                       <div className="mt-6">
//                         <button
//                           onClick={() => setShowCartPage(false)}
//                           className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
//                         >
//                           <ArrowRight className="w-4 h-4 rotate-180" />
//                           <span>Continue Shopping</span>
//                         </button>
//                       </div>
//                     </div>

//                     {/* Order Summary */}
//                     <div className="lg:col-span-1">
//                       <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
//                         <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                        
//                         <div className="space-y-3 mb-6">
//                           <div className="flex justify-between">
//                             <span className="text-gray-600">Subtotal ({getCartCount()} items)</span>
//                             <span className="font-medium">${getCartTotal().toFixed(2)}</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-gray-600">Shipping</span>
//                             <span className="font-medium">
//                               {getCartTotal() >= 50 ? (
//                                 <span className="text-green-600">FREE</span>
//                               ) : (
//                                 '$9.99'
//                               )}
//                             </span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-gray-600">Tax</span>
//                             <span className="font-medium">${(getCartTotal() * 0.08).toFixed(2)}</span>
//                           </div>
//                           <div className="border-t pt-3">
//                             <div className="flex justify-between">
//                               <span className="text-lg font-semibold">Total</span>
//                               <span className="text-lg font-bold text-gray-900">
//                                 ${(getCartTotal() + (getCartTotal() >= 50 ? 0 : 9.99) + (getCartTotal() * 0.08)).toFixed(2)}
//                               </span>
//                             </div>
//                           </div>
//                         </div>

//                         {getCartTotal() < 50 && (
//                           <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
//                             <p className="text-sm text-blue-800">
//                               Add ${(50 - getCartTotal()).toFixed(2)} more to get <strong>FREE shipping!</strong>
//                             </p>
//                             <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
//                               <div 
//                                 className="bg-blue-600 h-2 rounded-full transition-all duration-300"
//                                 style={{ width: `${Math.min((getCartTotal() / 50) * 100, 100)}%` }}
//                               ></div>
//                             </div>
//                           </div>
//                         )}

//                         {/* Login Prompt for Checkout */}
//                         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
//                           <div className="flex items-center space-x-2 mb-2">
//                             <User className="w-4 h-4 text-yellow-600" />
//                             <span className="text-sm font-medium text-yellow-800">Sign in for better experience</span>
//                           </div>
//                           <p className="text-xs text-yellow-700 mb-3">
//                             Save your cart, track orders, and get personalized recommendations
//                           </p>
//                           <button
//                             onClick={() => {
//                               setShowCartPage(false);
//                               handleLoginRedirect('checkout');
//                             }}
//                             className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors"
//                           >
//                             Sign In
//                           </button>
//                         </div>

//                         {/* Checkout Button */}
//                         <button
//                           onClick={() => {
//                             setShowCartPage(false);
//                             handleLoginRedirect('checkout');
//                           }}
//                           className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-3"
//                         >
//                           Proceed to Checkout
//                         </button>

//                         {/* Guest Checkout Option */}
//                         <button
//                           onClick={() => {
//                             console.log('Guest checkout initiated');
//                             alert('Guest checkout would be implemented here');
//                           }}
//                           className="w-full border border-gray-300 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
//                         >
//                           Continue as Guest
//                         </button>

//                         {/* Security Badges */}
//                         <div className="mt-6 text-center">
//                           <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
//                             <div className="flex items-center space-x-1">
//                               <Shield className="w-4 h-4" />
//                               <span>Secure</span>
//                             </div>
//                             <div className="flex items-center space-x-1">
//                               <Truck className="w-4 h-4" />
//                               <span>Fast Delivery</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Shopping Cart Sidebar */}
//       {cartItems.length > 0 && (
//         <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm w-full mx-4 z-40">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="font-semibold text-gray-900">Cart ({getCartCount()})</h3>
//             <button
//               onClick={() => setCartItems([])}
//               className="text-gray-400 hover:text-gray-600"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
          
//           <div className="space-y-3 max-h-64 overflow-y-auto">
//             {cartItems.map(item => (
//               <div key={item.id} className="flex items-center space-x-3">
//                 <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
//                   {item.image}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="font-medium text-gray-900 truncate">{item.name}</div>
//                   <div className="text-sm text-gray-600">${item.price.toFixed(2)}</div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                     className="p-1 hover:bg-gray-100 rounded"
//                   >
//                     <Minus className="w-3 h-3" />
//                   </button>
//                   <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
//                   <button
//                     onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                     className="p-1 hover:bg-gray-100 rounded"
//                   >
//                     <Plus className="w-3 h-3" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           <div className="border-t pt-4 mt-4">
//             <div className="flex justify-between items-center mb-4">
//               <span className="font-semibold text-gray-900">Total:</span>
//               <span className="font-bold text-xl text-gray-900">${getCartTotal().toFixed(2)}</span>
//             </div>
//             <button
//               onClick={() => setShowCartPage(true)}
//               className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
//             >
//               View Full Cart
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Login Prompt Modal */}
//       {showLoginPrompt && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowLoginPrompt(false)} />
//           <div className="flex min-h-screen items-center justify-center p-4">
//             <div className="bg-white rounded-lg max-w-md w-full p-6">
//               <div className="text-center">
//                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <User className="w-8 h-8 text-blue-600" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   Sign in to Continue
//                 </h3>
//                 <p className="text-gray-600 mb-6">
//                   {promptAction === 'checkout' && 'Please sign in to proceed with your order'}
//                   {promptAction === 'wishlist' && 'Sign in to save items to your wishlist'}
//                   {promptAction === 'cart' && 'Sign in to manage your cart and checkout'}
//                   {promptAction === 'login' && 'Access your account to view orders and manage preferences'}
//                 </p>
                
//                 <div className="space-y-3">
//                   <button
//                     onClick={redirectToLogin}
//                     className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
//                   >
//                     Sign In
//                   </button>
//                   <button
//                     onClick={() => setShowLoginPrompt(false)}
//                     className="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
//                   >
//                     Continue as Guest
//                   </button>
//                 </div>
                
//                 <p className="text-sm text-gray-600 mt-4">
//                   Don't have an account?{' '}
//                   <button
//                     onClick={() => {
//                       console.log('Redirecting to signup...');
//                       setShowLoginPrompt(false);
//                     }}
//                     className="text-blue-600 hover:text-blue-700 underline"
//                   >
//                     Sign up here
//                   </button>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <ShoppingBag className="w-8 h-8 text-blue-400" />
//                 <h3 className="text-xl font-bold">ShopCart</h3>
//               </div>
//               <p className="text-gray-400 mb-4">
//                 Your trusted online shopping destination with quality products and exceptional service.
//               </p>
//               <div className="flex space-x-4">
//                 <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
//                 <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
//                 <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
//               </div>
//             </div>
            
//             <div>
//               <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
//               <ul className="space-y-2">
//                 <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">Shipping Info</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className="text-lg font-semibold mb-4">Categories</h4>
//               <ul className="space-y-2">
//                 <li><a href="#" className="text-gray-400 hover:text-white">Electronics</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">Home & Kitchen</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">Furniture</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">Fashion</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
//               <div className="space-y-2">
//                 <div className="flex items-center space-x-2">
//                   <MapPin className="w-4 h-4 text-gray-400" />
//                   <span className="text-gray-400">123 Shopping St, NY 10001</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Phone className="w-4 h-4 text-gray-400" />
//                   <span className="text-gray-400">(555) 123-4567</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Mail className="w-4 h-4 text-gray-400" />
//                   <span className="text-gray-400">support@shopcart.com</span>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="border-t border-gray-800 mt-8 pt-8 text-center">
//             <p className="text-gray-400">&copy; 2024 ShopCart. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

export {};