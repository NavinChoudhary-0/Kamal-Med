import { StarIcon } from '@heroicons/react/solid';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Regular Customer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1',
    content: "The service is exceptional! Quick delivery and genuine products. I've been ordering my monthly medications from here for the past year.",
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Healthcare Professional',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1',
    content: 'As a healthcare professional, I appreciate their commitment to quality and authenticity. Highly recommended!',
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Davis',
    role: 'Patient',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1',
    content: 'Their 24/7 customer support is fantastic. They helped me with my urgent medication needs at midnight.',
    rating: 4
  }
];

const Testimonials = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">What Our Customers Say</h2>
          <p className="mt-4 text-lg text-gray-500">Don't just take our word for it</p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden p-6"
              >
                <div className="flex items-center">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mt-4 flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                <p className="mt-4 text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;