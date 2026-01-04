import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO, Modern Living Co.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    text: 'Working with Archiform was an absolute pleasure. They transformed our vision into reality with incredible attention to detail.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Property Developer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    text: 'The team\'s innovative approach to design challenges resulted in a space that exceeded our expectations.',
  },
  {
    id: 3,
    name: 'Emma Thompson',
    role: 'Hotel Manager',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    text: 'Our hotel renovation project was handled with exceptional professionalism and creative vision.',
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 px-4 bg-gray-50" id="testimonials" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Client Testimonials
        </motion.h2>

        <div className="relative">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className={`absolute w-full transition-all duration-500 ${
                index === currentIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                index === currentIndex
                  ? { opacity: 1, scale: 1, x: 0 }
                  : { opacity: 0, scale: 0.9, x: 100 }
              }
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:rotate-1">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">{testimonial.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-gray-800 w-8' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;