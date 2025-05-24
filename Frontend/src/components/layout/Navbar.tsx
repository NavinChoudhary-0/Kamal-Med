import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import SearchBar from '../shared/SearchBar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg border-b-2 border-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">Kamal</h1>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <SearchBar />
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">About Us</Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600">Products</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              <UserIcon className="h-6 w-6" />
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-blue-600">
              <ShoppingCartIcon className="h-6 w-6" />
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block text-gray-700 hover:text-blue-600 py-2">Home</Link>
            <Link to="/about" className="block text-gray-700 hover:text-blue-600 py-2">About Us</Link>
            <Link to="/products" className="block text-gray-700 hover:text-blue-600 py-2">Products</Link>
            <Link to="/contact" className="block text-gray-700 hover:text-blue-600 py-2">Contact</Link>
            <Link to="/login" className="block text-gray-700 hover:text-blue-600 py-2">Login</Link>
            <Link to="/cart" className="block text-gray-700 hover:text-blue-600 py-2">Cart</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

// const Navbar = () => {
//     const [isOpen, setIsOpen] = useState(false);
  
//     return (
//       <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <Link to="/" className="flex-shrink-0">
//                 <h1 className="text-2xl font-bold text-white">Kamal</h1>
//               </Link>
//             </div>
  
//             <div className="hidden md:flex items-center space-x-6">
//               <SearchBar />
//               <Link to="/" className="text-white hover:text-blue-200 font-medium">Home</Link>
//               <Link to="/about" className="text-white hover:text-blue-200 font-medium">About Us</Link>
//               <Link to="/products" className="text-white hover:text-blue-200 font-medium">Products</Link>
//               <Link to="/contact" className="text-white hover:text-blue-200 font-medium">Contact</Link>
//               <Link to="/login" className="text-white hover:text-blue-200">
//                 <UserIcon className="h-6 w-6" />
//               </Link>
//               <Link to="/cart" className="text-white hover:text-blue-200">
//                 <ShoppingCartIcon className="h-6 w-6" />
//               </Link>
//             </div>
  
//             <div className="md:hidden flex items-center">
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="text-white hover:text-blue-200"
//               >
//                 {isOpen ? (
//                   <XIcon className="h-6 w-6" />
//                 ) : (
//                   <MenuIcon className="h-6 w-6" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
  
//         {/* Mobile menu */}
//         {isOpen && (
//           <div className="md:hidden bg-blue-700">
//             <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//               <Link to="/" className="block text-white hover:text-blue-200 py-2">Home</Link>
//               <Link to="/about" className="block text-white hover:text-blue-200 py-2">About Us</Link>
//               <Link to="/products" className="block text-white hover:text-blue-200 py-2">Products</Link>
//               <Link to="/contact" className="block text-white hover:text-blue-200 py-2">Contact</Link>
//               <Link to="/login" className="block text-white hover:text-blue-200 py-2">Login</Link>
//               <Link to="/cart" className="block text-white hover:text-blue-200 py-2">Cart</Link>
//             </div>
//           </div>
//         )}
//       </nav>
//     );
//   };

// const Navbar = () => {
//     const [isOpen, setIsOpen] = useState(false);
  
//     return (
//       <nav className="bg-gradient-to-r from-purple-600 to-indigo-800 text-white rounded-b-lg shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <Link to="/" className="flex-shrink-0">
//                 <h1 className="text-2xl font-bold text-white drop-shadow-md">Kamal</h1>
//               </Link>
//             </div>
  
//             <div className="hidden md:flex items-center space-x-6">
//               <SearchBar />
//               <Link to="/" className="text-white hover:text-purple-200 font-medium transition duration-200">Home</Link>
//               <Link to="/about" className="text-white hover:text-purple-200 font-medium transition duration-200">About Us</Link>
//               <Link to="/products" className="text-white hover:text-purple-200 font-medium transition duration-200">Products</Link>
//               <Link to="/contact" className="text-white hover:text-purple-200 font-medium transition duration-200">Contact</Link>
//               <Link to="/login" className="text-white hover:text-purple-200 transition duration-200">
//                 <UserIcon className="h-6 w-6" />
//               </Link>
//               <Link to="/cart" className="text-white hover:text-purple-200 transition duration-200">
//                 <ShoppingCartIcon className="h-6 w-6" />
//               </Link>
//             </div>
  
//             <div className="md:hidden flex items-center">
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="text-white hover:text-purple-200"
//               >
//                 {isOpen ? (
//                   <XIcon className="h-6 w-6" />
//                 ) : (
//                   <MenuIcon className="h-6 w-6" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
  
//         {/* Mobile menu */}
//         {isOpen && (
//           <div className="md:hidden bg-indigo-700 rounded-b-lg shadow-inner">
//             <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//               <Link to="/" className="block text-white hover:text-purple-200 py-2 transition duration-200">Home</Link>
//               <Link to="/about" className="block text-white hover:text-purple-200 py-2 transition duration-200">About Us</Link>
//               <Link to="/products" className="block text-white hover:text-purple-200 py-2 transition duration-200">Products</Link>
//               <Link to="/contact" className="block text-white hover:text-purple-200 py-2 transition duration-200">Contact</Link>
//               <Link to="/login" className="block text-white hover:text-purple-200 py-2 transition duration-200">Login</Link>
//               <Link to="/cart" className="block text-white hover:text-purple-200 py-2 transition duration-200">Cart</Link>
//             </div>
//           </div>
//         )}
//       </nav>
//     );
//   };
export default Navbar;


// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ShoppingCartIcon, UserIcon, MenuIcon, XIcon, SearchIcon, ChevronDownIcon } from '@heroicons/react/outline';
// import SearchBar from '../shared/SearchBar';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
//   const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);

//   return (
//     <nav className="bg-gray-900 text-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-wrap items-center justify-between h-16">
//           {/* Brand/logo */}
//           <div className="flex items-center">
//             <Link to="/" className="text-2xl font-bold">KAMAL.COM</Link>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-white hover:text-gray-300"
//             >
//               {isOpen ? (
//                 <XIcon className="h-6 w-6" />
//               ) : (
//                 <MenuIcon className="h-6 w-6" />
//               )}
//             </button>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex md:items-center md:w-auto w-full">
//             <ul className="md:flex md:items-center">
//               <li><Link to="/" className="block py-2 px-4 hover:bg-gray-700">Home</Link></li>
              
//               {/* About Dropdown */}
//               <li className="relative">
//                 <button
//                   onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
//                   className="flex items-center py-2 px-4 hover:bg-gray-700"
//                 >
//                   About Us
//                   <ChevronDownIcon className="h-4 w-4 ml-1" />
//                 </button>
//                 {isAboutDropdownOpen && (
//                   <ul className="absolute left-0 mt-0 w-48 bg-gray-800 rounded-b shadow-lg">
//                     <li><Link to="/about-one" className="block px-4 py-2 hover:bg-gray-700">About One</Link></li>
//                     <li><Link to="/about-two" className="block px-4 py-2 hover:bg-gray-700">About Two</Link></li>
//                     <li><Link to="/about-three" className="block px-4 py-2 hover:bg-gray-700">About Three</Link></li>
//                   </ul>
//                 )}
//               </li>
              
//               <li><Link to="/welcome" className="block py-2 px-4 hover:bg-gray-700">Welcome</Link></li>
//               <li><Link to="/products" className="block py-2 px-4 hover:bg-gray-700">Products</Link></li>
//               <li><Link to="/contact" className="block py-2 px-4 hover:bg-gray-700">Contact</Link></li>
//             </ul>

//             {/* Search Bar */}
//             <div className="md:ml-4">
//               <div className="relative">
//                 <input
//                   type="search"
//                   placeholder="Search Anything Here..."
//                   className="bg-gray-700 text-white px-4 py-1 pr-8 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <SearchIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               </div>
//             </div>

//             {/* User Navigation */}
//             <ul className="md:flex md:items-center md:ml-4">
//               <li>
//                 <Link to="/profile" className="flex items-center py-2 px-4 hover:bg-gray-700">
//                   <UserIcon className="h-5 w-5 mr-1" />
//                   Profile
//                 </Link>
//               </li>
              
//               {/* Login Dropdown */}
//               <li className="relative">
//                 <button
//                   onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
//                   className="flex items-center py-2 px-4 hover:bg-gray-700"
//                 >
//                   <ShoppingCartIcon className="h-5 w-5 mr-1" />
//                   Login / Sign Up
//                   <ChevronDownIcon className="h-4 w-4 ml-1" />
//                 </button>
//                 {isLoginDropdownOpen && (
//                   <ul className="absolute right-0 mt-0 w-48 bg-gray-800 rounded-b shadow-lg">
//                     <li><Link to="/login" className="block px-4 py-2 hover:bg-gray-700">Login</Link></li>
//                     <li><Link to="/signup" className="block px-4 py-2 hover:bg-gray-700">Sign Up</Link></li>
//                   </ul>
//                 )}
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <div className="md:hidden bg-gray-800">
//             <ul className="px-2 pt-2 pb-3 space-y-1">
//               <li><Link to="/" className="block px-3 py-2 hover:bg-gray-700 rounded">Home</Link></li>
//               <li><Link to="/about" className="block px-3 py-2 hover:bg-gray-700 rounded">About Us</Link></li>
//               <li><Link to="/welcome" className="block px-3 py-2 hover:bg-gray-700 rounded">Welcome</Link></li>
//               <li><Link to="/products" className="block px-3 py-2 hover:bg-gray-700 rounded">Products</Link></li>
//               <li><Link to="/contact" className="block px-3 py-2 hover:bg-gray-700 rounded">Contact</Link></li>
//               <li><Link to="/profile" className="block px-3 py-2 hover:bg-gray-700 rounded">Profile</Link></li>
//               <li><Link to="/login" className="block px-3 py-2 hover:bg-gray-700 rounded">Login</Link></li>
//               <li><Link to="/signup" className="block px-3 py-2 hover:bg-gray-700 rounded">Sign Up</Link></li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;