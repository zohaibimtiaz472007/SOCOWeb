import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'Alice Johnson',
    feedback: 'The free courses provided by SOCO helped me land my first developer job. The hands-on projects were amazing!',
    image: 'https://via.placeholder.com/150',
    role: 'Frontend Developer'
  },
  {
    id: 2,
    name: 'Mark Smith',
    feedback: 'SOCO’s DSA content is top-notch. It improved my problem-solving skills significantly!',
    image: 'https://via.placeholder.com/150',
    role: 'Software Engineer'
  },
  {
    id: 3,
    name: 'Emily Davis',
    feedback: 'I learned machine learning from scratch through SOCO. Highly recommend to anyone starting their tech journey!',
    image: 'https://via.placeholder.com/150',
    role: 'Data Scientist'
  },
];

const Testimonial = () => {
  return (
    <section className="bg-black text-white py-12 px-6 md:px-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-green-400 mb-8">What Our Students Say</h2>
        <p className="text-gray-300 mb-12 max-w-2xl mx-auto">
          Hear from our students about their experiences with SOCO's courses and projects.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-all"
            >
              <FaQuoteLeft className="text-green-400 text-3xl mx-auto mb-4" />
              <p className="text-gray-300 italic mb-4">"{testimonial.feedback}"</p>
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-green-400"
              />
              <h4 className="text-lg font-semibold">{testimonial.name}</h4>
              <p className="text-sm text-gray-400">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
