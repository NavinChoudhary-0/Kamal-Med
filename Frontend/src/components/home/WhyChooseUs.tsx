import { ShieldCheckIcon, TruckIcon, SupportIcon, BadgeCheckIcon } from '@heroicons/react/outline';

const features = [
  {
    name: 'Certified Medicines',
    description: 'All our medicines are certified and sourced from authorized distributors.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Quick Delivery',
    description: 'Get your medicines delivered at your doorstep within 24-48 hours.',
    icon: TruckIcon,
  },
  {
    name: '24/7 Support',
    description: 'Our customer support team is available round the clock to help you.',
    icon: SupportIcon,
  },
  {
    name: 'Trusted Brands',
    description: 'We partner with the most trusted pharmaceutical brands.',
    icon: BadgeCheckIcon,
  },
];

const WhyChooseUs = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Why Choose Us</h2>
          <p className="mt-4 text-lg text-gray-500">
            We provide the best healthcare services with trust and reliability
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="flex flex-col items-center">
                  <feature.icon className="h-12 w-12 text-blue-500" />
                  <h3 className="mt-6 text-lg font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500 text-center">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;