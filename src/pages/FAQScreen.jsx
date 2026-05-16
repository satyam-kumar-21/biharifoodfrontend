import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Meta from '../components/Meta';

const FAQScreen = () => {
  const faqs = [
    {
      question: "How do I place an order?",
      answer: "You can browse our products, add them to your cart, and complete the checkout process by providing your shipping details and choosing a payment method."
    },
    {
      question: "How long does delivery take?",
      answer: "Typically, it takes 2-3 business days within Bihar and 5-7 business days for the rest of India."
    },
    {
      question: "Do you offer Cash on Delivery (COD)?",
      answer: "Yes, we provide Cash on Delivery for most pin codes across India."
    },
    {
      question: "Are the products fresh?",
      answer: "Absolutely! We either prepare the products fresh after receiving your order or ship them from our most recent batch to ensure maximum freshness."
    },
    {
      question: "What if I receive a damaged product?",
      answer: "Please contact us with photos of the damaged item within 24 hours of delivery. We will assist you with a replacement or refund."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      <Meta 
        title="Bihar Food FAQ - Shipping & Shelf Life | Bihar wala taste" 
        description="Find answers to questions about Bihar food products, shipping Bihar snacks across India, and the shelf life of our traditional Bihari sweets."
        keywords="Bihar food FAQ, Bihari snacks delivery, shipping Thekua, Bihar wala taste help, authentic Bihar food shelf life"
        url="https://biharwalataste.com/faq"
      />
      <div className="max-w-3xl mx-auto py-12 space-y-12">
        <h1 className="text-4xl font-bold text-center">Frequently Asked Questions (FAQ)</h1>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition"
              >
                <span className="text-lg font-bold">{faq.question}</span>
                {openIndex === index ? <ChevronUp className="text-primary" /> : <ChevronDown className="text-primary" />}
              </button>
              {openIndex === index && (
                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQScreen;
