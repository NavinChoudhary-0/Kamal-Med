const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-8 mb-6">
    <div className="flex items-center space-x-2 mb-3">
      <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
      <div className="animate-pulse">
        <span className="text-blue-600 font-medium">
          Discovering amazing products
        </span>
        <span className="inline-flex ml-1">
          <span className="animate-bounce delay-100 text-blue-600">.</span>
          <span className="animate-bounce delay-200 text-blue-600">.</span>
          <span className="animate-bounce delay-300 text-blue-600">.</span>
        </span>
      </div>
    </div>
    <p className="text-gray-500 text-sm">
      Just a moment while we find the perfect items for you
    </p>
  </div>
  );
}

export default Loading;


