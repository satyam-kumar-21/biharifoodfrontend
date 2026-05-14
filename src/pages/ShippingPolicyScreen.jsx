import PolicyScreen from '../components/PolicyScreen';
import { useGetSettingsQuery } from '../slices/settingsApiSlice';

const ShippingPolicyScreen = () => {
  const { data: settings } = useGetSettingsQuery();

  const content = (
    <div className="space-y-8">
      <p className="text-lg text-gray-600">At Bihar wala taste, we are committed to delivering your favorite Bihari flavors safely and on time to your doorstep.</p>
      
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-primary">1. Processing Time</h3>
        <p>Since many of our products (like Thekua and Khaja) are freshly made to order, it may take 1-2 business days to prepare them after receiving your order. We ensure that every pack is perfectly fresh.</p>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-primary">2. Shipping Time and Charges</h3>
        <p>We deliver across India. Delivery times may vary based on your location:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li><strong>Within Bihar:</strong> 2-3 business days.</li>
          <li><strong>Metro Cities (Delhi, Mumbai, etc.):</strong> 4-5 business days.</li>
          <li><strong>Rest of India:</strong> 5-7 business days.</li>
        </ul>
        <p className="bg-village p-4 rounded-xl font-bold">Free shipping is available on orders above ₹500. A nominal fee of ₹40 is charged for orders below this amount.</p>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-primary">3. Order Tracking</h3>
        <p>Once your order is shipped, you will receive a tracking ID via email and SMS. You can also track your order status in the "Track Order" section on our website.</p>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-primary">4. Delivery Address</h3>
        <p>Please ensure that the address and phone number provided during checkout are correct. We cannot change the address once the order has been shipped. If a package is returned due to an incorrect address, additional shipping charges may apply.</p>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-primary">5. Damaged or Lost Packages</h3>
        <p>If you receive a package in a damaged condition, please take a photo at the time of delivery and contact us within 24 hours. We will do our best to resolve the issue promptly.</p>
      </section>

      <section className="bg-village/30 p-8 rounded-3xl space-y-4 mt-12 border border-village">
        <h3 className="text-2xl font-bold text-primary">Shipping Assistance</h3>
        <p>If you have any questions regarding the shipping of your order, please contact us:</p>
        <div className="space-y-2 font-bold text-gray-700">
          <p>Email: {settings?.email || 'contact@BiharWalaTaste.com'}</p>
          <p>Phone: {settings?.phone || '+91 98765 43210'}</p>
        </div>
      </section>
    </div>
  );

  return <PolicyScreen title="Shipping Policy" content={content} />;
};

export default ShippingPolicyScreen;

