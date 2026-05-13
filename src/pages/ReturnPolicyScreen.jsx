import PolicyScreen from '../components/PolicyScreen';
import { useGetSettingsQuery } from '../slices/settingsApiSlice';

const ReturnPolicyScreen = () => {
  const { data: settings } = useGetSettingsQuery();

  const content = (
    <div className="space-y-8">
      <p className="text-lg text-gray-600">At Kitchen Bihar Ka, we take pride in the quality of our products. As we deal in food items, our return and refund policy is designed with customer hygiene and safety in mind.</p>
      
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-primary">1. Return Policy</h3>
        <p>Due to the perishable nature of food items, we do not accept returns under normal circumstances. Once an order is delivered, it cannot be returned.</p>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-primary">2. Conditions for Refund or Replacement</h3>
        <p>We offer refunds or replacements only in the following cases:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>If you have received the wrong product.</li>
          <li>If the product has passed its expiry date at the time of delivery.</li>
          <li>If the product received is completely spoiled or damaged (major packaging defect).</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-primary">3. How to Make a Claim?</h3>
        <p>In case of any issues, please contact us within 24 hours of delivery. The following documents are required for a claim:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Order ID.</li>
          <li>Clear photos and videos of the damaged or incorrect product.</li>
          <li>A photo of the bill/invoice.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-primary">4. Cancellation Policy</h3>
        <p>You can only cancel your order until it has reached the "Packed" or "Shipped" status. Once an order is shipped, it cannot be cancelled. In the case of cancellation, the refund will be credited to your original payment source within 5-7 business days.</p>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-primary">5. Refund Process</h3>
        <p>Once your claim is verified, we will process the refund within 48 hours. Depending on your bank or card provider, it may take 5-10 days to appear in your account.</p>
      </section>

      <section className="bg-village/30 p-8 rounded-3xl space-y-4 mt-12 border border-village">
        <h3 className="text-2xl font-bold text-primary">Need Help?</h3>
        <p>For any questions related to refunds or returns, please contact us:</p>
        <div className="space-y-2 font-bold text-gray-700">
          <p>Email: {settings?.email || 'contact@kitchenbiharka.com'}</p>
          <p>Phone: {settings?.phone || '+91 98765 43210'}</p>
        </div>
      </section>
    </div>
  );

  return <PolicyScreen title="Return & Refund Policy" content={content} />;
};

export default ReturnPolicyScreen;
