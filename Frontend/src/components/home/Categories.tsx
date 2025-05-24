const categories = [
    {
      id: 1,
      name: 'Prescription Medicines',
      icon: '💊',
      description: 'Quality assured prescription medications'
    },
    {
      id: 2,
      name: 'OTC Medicines',
      icon: '🏥',
      description: 'Over-the-counter medicines for common ailments'
    },
    {
      id: 3,
      name: 'Health Supplements',
      icon: '🌿',
      description: 'Vitamins and supplements for better health'
    },
    {
      id: 4,
      name: 'Personal Care',
      icon: '🧴',
      description: 'Products for personal hygiene and care'
    },
    {
      id: 5,
      name: 'Medical Devices',
      icon: '🩺',
      description: 'BP monitors, thermometers, and more'
    },
    {
      id: 6,
      name: 'Ayurveda & Homeopathy',
      icon: '🌱',
      description: 'Traditional and alternative medicine'
    },
  ];
  
  const Categories = () => {
    return (
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Product Categories</h2>
            <p className="mt-4 text-lg text-gray-500">Browse through our wide range of healthcare products</p>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <div>
                    <span className="text-4xl">{category.icon}</span>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      <a href="#" className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {category.name}
                      </a>
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">{category.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Categories;