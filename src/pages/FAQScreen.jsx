import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQScreen = () => {
  const faqs = [
    {
      question: "आदेश कैसे दें?",
      answer: "आप हमारी वेबसाइट पर उत्पादों को चुन सकते हैं, उन्हें कार्ट में जोड़ सकते हैं और चेकआउट प्रक्रिया पूरी करके अपना ऑर्डर दे सकते हैं।"
    },
    {
      question: "डिलीवरी में कितना समय लगता है?",
      answer: "आमतौर पर, बिहार में 2-3 दिन और भारत के अन्य हिस्सों में 5-7 कार्य दिवस लगते हैं।"
    },
    {
      question: "क्या आप कैश ऑन डिलीवरी (COD) देते हैं?",
      answer: "हाँ, हम पूरे भारत में अधिकांश पिन कोड पर कैश ऑन डिलीवरी की सुविधा प्रदान करते हैं।"
    },
    {
      question: "क्या उत्पाद ताज़ा होते हैं?",
      answer: "हाँ, हम ऑर्डर मिलने के बाद ही उत्पादों को तैयार करते हैं या ताज़ा स्टॉक से भेजते हैं।"
    },
    {
      question: "अगर सामान खराब मिले तो क्या करें?",
      answer: "कृपया सामान मिलने के 24 घंटे के भीतर हमें फोटो के साथ संपर्क करें, हम आपकी पूरी मदद करेंगे।"
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-3xl mx-auto py-12 space-y-12">
      <h1 className="text-4xl font-bold font-hindi text-center">अक्सर पूछे जाने वाले प्रश्न (FAQ)</h1>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button 
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition"
            >
              <span className="text-lg font-bold font-hindi">{faq.question}</span>
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
  );
};

export default FAQScreen;
