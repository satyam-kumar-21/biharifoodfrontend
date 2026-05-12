import PolicyScreen from '../components/PolicyScreen';

const ShippingPolicyScreen = () => {
  const content = (
    <div className="space-y-6">
      <p>हम पूरे भारत में सुरक्षित और तेज़ी से डिलीवरी सुनिश्चित करते हैं।</p>
      <h3 className="text-xl font-bold font-hindi">शिपिंग समय</h3>
      <ul className="list-disc pl-6">
        <li>बिहार: 2-3 कार्य दिवस</li>
        <li>अन्य राज्य: 5-7 कार्य दिवस</li>
      </ul>
      <h3 className="text-xl font-bold font-hindi">शिपिंग शुल्क</h3>
      <p>₹500 से अधिक के ऑर्डर पर मुफ्त शिपिंग। अन्य ऑर्डर पर ₹40 शुल्क।</p>
    </div>
  );
  return <PolicyScreen title="शिपिंग नीति" content={content} />;
};

export default ShippingPolicyScreen;
