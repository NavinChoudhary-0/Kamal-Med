import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-blue-600 h-[500px]">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-20"
          src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1"
          alt="Medical Background"
        />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Your Trusted Online Medical Store
        </h1>
        <p className="mt-6 text-xl text-white max-w-3xl">
          Get access to a wide range of medicines, healthcare products, and expert advice. 
          We ensure quality and authenticity in every product we deliver.
        </p>
        <div className="mt-10">
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;