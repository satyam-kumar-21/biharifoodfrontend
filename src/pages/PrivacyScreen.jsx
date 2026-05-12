import PolicyScreen from '../components/PolicyScreen';

const PrivacyScreen = () => {
  const content = (
    <div className="space-y-6">
      <p>स्वाद बिहार का में, हम आपकी गोपनीयता का सम्मान करते हैं। यह नीति बताती है कि हम आपकी जानकारी कैसे एकत्र और उपयोग करते हैं।</p>
      <h3 className="text-xl font-bold font-hindi">1. जानकारी का संग्रह</h3>
      <p>जब आप हमारी साइट पर पंजीकरण करते हैं या ऑर्डर देते हैं, तो हम आपसे नाम, ईमेल और पता जैसी जानकारी एकत्र करते हैं।</p>
      <h3 className="text-xl font-bold font-hindi">2. उपयोग</h3>
      <p>हम आपकी जानकारी का उपयोग आपके ऑर्डर को प्रोसेस करने और आपको अपडेट भेजने के लिए करते हैं।</p>
    </div>
  );
  return <PolicyScreen title="गोपनीयता नीति" content={content} />;
};

export default PrivacyScreen;
