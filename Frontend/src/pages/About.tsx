const About = () => {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About MediCare</h1>
          <p className="text-xl text-gray-600">Your Trusted Healthcare Partner</p>
        </div>
  
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To provide accessible, high-quality healthcare products and services to our community,
              ensuring every individual has access to the care they need.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Vision</h2>
            <p className="text-gray-600">
              To become the leading healthcare provider, known for excellence in service,
              quality products, and customer satisfaction.
            </p>
          </div>
        </div>
  
        {/* Our Story */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-gray-600 mb-4">
              Founded in 2010, MediCare has grown from a small local pharmacy to a trusted
              healthcare partner serving thousands of customers. Our journey began with a simple
              mission: to make healthcare accessible to all.
            </p>
            <p className="text-gray-600">
              Today, we continue to expand our services while maintaining the same dedication
              to quality and customer care that has been our hallmark since day one.
            </p>
          </div>
        </div>
  
        {/* Team Section */}
        {/* <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2"
                alt="Doctor"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900">Dr. Sarah Johnson</h3>
              <p className="text-blue-600">Chief Medical Officer</p>
            </div>
          </div>
        </div> */}

      </div>
    );
  };
  
  export default About;