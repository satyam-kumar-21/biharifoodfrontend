import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      q: "How long do the sweets stay fresh?",
      a: "Our sweets like Thekua and Khaja have a shelf life of 20-30 days when stored in an airtight container. We make them fresh on order."
    },
    {
      q: "Do you ship across India?",
      a: "Yes! We deliver to almost all pincodes in India. Shipping times usually vary between 4-7 business days depending on your location."
    },
    {
      q: "Are the products completely homemade?",
      a: "Absolutely. Every product is made in small batches by local women in Bihar, following age-old traditional recipes."
    },
    {
      q: "How can I track my order?",
      a: "Once your order is shipped, you will receive a tracking link via email and SMS. You can also track it in the 'My Orders' section."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-village/30 rounded-[60px] p-10 md:p-20 space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold font-hindi text-primary">Common Questions</h2>
        <p className="text-gray-600">Everything you need to know about our products and delivery.</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((item, idx) => {
          const isOpen = activeIndex === idx;
          return (
            <div 
              key={idx} 
              className={`bg-white rounded-[32px] overflow-hidden shadow-sm border transition-all duration-300 ${isOpen ? 'border-primary shadow-md' : 'border-transparent hover:border-primary/20'}`}
            >
              <button 
                onClick={() => toggleAccordion(idx)}
                className="w-full text-left p-6 md:p-8 flex justify-between items-center group"
              >
                <span className={`text-lg font-bold font-hindi transition-colors ${isOpen ? 'text-primary' : 'text-gray-800'}`}>
                  {item.q}
                </span>
                <span className={`flex-shrink-0 ml-4 p-2 rounded-full transition-all ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-village text-primary group-hover:bg-primary group-hover:text-white'}`}>
                  {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 md:px-8 pb-8">
                      <div className="pt-4 border-t border-village text-gray-600 leading-relaxed text-lg">
                        {item.a}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
