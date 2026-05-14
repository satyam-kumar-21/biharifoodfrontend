import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      name: "Anjali Sharma",
      location: "Bangalore",
      review: "Being away from Bihar, I really missed authentic Thekua. Bihar wala taste brought that exact taste to me. It felt like my grandmother made it!",
      rating: 5,
    },
    {
      name: "Rohan Varma",
      location: "Delhi",
      review: "The Litti-Chokha ingredients and Sattu are top-notch. Fresh, aromatic, and perfectly packed. Highly recommended for any food lover.",
      rating: 5,
    },
    {
      name: "Priya Singh",
      location: "Mumbai",
      review: "Incredible quality! The Khaja was so crispy and fresh even after shipping. Finally found a reliable source for Bihari sweets.",
      rating: 5,
    }
  ];

  return (
    <section className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold font-hindi text-primary">What Our Customers Say</h2>
        <p className="text-gray-600 max-w-2xl mx-auto italic">Directly from the hearts of those who have tasted the tradition.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((item, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex text-secondary">
                {[...Array(item.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed italic">"{item.review}"</p>
            </div>
            <div className="flex items-center gap-4 border-t border-village pt-6">
              <div className="w-12 h-12 rounded-full bg-village flex items-center justify-center text-primary shadow-md">
                <User size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{item.name}</h4>
                <p className="text-xs text-gray-400">{item.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

