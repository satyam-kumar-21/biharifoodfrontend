import PolicyScreen from '../components/PolicyScreen';
import { useGetSettingsQuery } from '../slices/settingsApiSlice';

const PrivacyScreen = () => {
  const { data: settings } = useGetSettingsQuery();

  const content = (
    <div className="space-y-8">
      <p className="text-lg text-gray-600">At Kitchen Bihar Ka, we value your privacy. This policy explains how we collect, use, and protect your personal information when you visit our website.</p>
      
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-primary">1. Information Collection</h3>
        <p>We collect information from you when you register on our site, place an order, or subscribe to our newsletter. This includes your name, email address, phone number, and shipping address.</p>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-primary">2. Use of Information</h3>
        <p>The information we collect may be used for the following purposes:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>To process and fulfill your orders efficiently.</li>
          <li>To send periodic transactional emails and SMS updates regarding your order.</li>
          <li>To improve our website experience and customer service.</li>
          <li>To personalize your user experience and respond to individual needs.</li>
          <li>To send marketing updates (only with your explicit consent).</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-primary">3. Data Protection</h3>
        <p>We implement a variety of security measures to maintain the safety of your personal information. Your payment details are processed through secure, encrypted gateways and are not stored on our servers.</p>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-primary">4. Cookies</h3>
        <p>We use cookies to help us remember and process the items in your shopping cart, and to understand your preferences for future visits. You can choose to disable cookies through your browser settings.</p>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-primary">5. Third-Party Disclosure</h3>
        <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website or conducting our business, so long as those parties agree to keep this information confidential.</p>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-primary">6. Your Rights</h3>
        <p>You have the right to access, update, or request the deletion of your personal information. If you wish to exercise any of these rights, please contact our support team.</p>
      </section>

      <section className="bg-village/30 p-8 rounded-3xl space-y-4 mt-12 border border-village">
        <h3 className="text-2xl font-bold text-primary">Contact Us</h3>
        <p>If you have any questions regarding this privacy policy, you may contact us using the information below:</p>
        <div className="space-y-2 font-bold text-gray-700">
          <p>Email: {settings?.email || 'contact@kitchenbiharka.com'}</p>
          <p>Phone: {settings?.phone || '+91 98765 43210'}</p>
          <p>Address: {settings?.address || 'Bihar, India'}</p>
        </div>
      </section>
    </div>
  );

  return <PolicyScreen title="Privacy Policy" content={content} />;
};

export default PrivacyScreen;
