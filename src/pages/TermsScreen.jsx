import PolicyScreen from '../components/PolicyScreen';
import { useGetSettingsQuery } from '../slices/settingsApiSlice';

const TermsScreen = () => {
  const { data: settings } = useGetSettingsQuery();

  const content = (
    <div className="space-y-8">
      <p className="text-lg text-gray-600">By using the Kitchen Bihar Ka website, you agree to the following terms and conditions. Please read them carefully.</p>
      
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-primary">1. Terms of Use</h3>
        <p>This website and its content are for your personal and non-commercial use only. You may not copy, modify, or distribute any content from the website without our prior permission.</p>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-primary">2. Account and Security</h3>
        <p>If you create an account on the website, you are responsible for maintaining the confidentiality of your password and for all activities that occur under your account.</p>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-primary">3. Products and Pricing</h3>
        <p>We strive to ensure that all information on the website is accurate. However, prices and product availability are subject to change without prior notice.</p>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-primary">4. Payments</h3>
        <p>We accept various online payment methods and Cash on Delivery (COD). All payments are processed through secure gateways.</p>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-primary">5. Intellectual Property</h3>
        <p>All logos, images, graphics, and text available on the website are the property of "Kitchen Bihar Ka" and are protected by copyright laws.</p>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-primary">6. Limitation of Liability</h3>
        <p>We will not be liable for any indirect or consequential loss arising from the use of the website. Our goal is always to provide the best service possible.</p>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-primary">7. Governing Law and Jurisdiction</h3>
        <p>These terms and conditions shall be governed by the laws of India. Any disputes shall be settled within the jurisdiction of the courts in Bihar.</p>
      </section>

      <section className="bg-village/30 p-8 rounded-3xl space-y-4 mt-12 border border-village">
        <h3 className="text-2xl font-bold text-primary">Contact Information</h3>
        <p>For any clarification regarding these terms and conditions, please contact us:</p>
        <div className="space-y-2 font-bold text-gray-700">
          <p>Email: {settings?.email || 'contact@kitchenbiharka.com'}</p>
          <p>Phone: {settings?.phone || '+91 98765 43210'}</p>
          <p>Address: {settings?.address || 'Bihar, India'}</p>
        </div>
      </section>
    </div>
  );

  return <PolicyScreen title="Terms & Conditions" content={content} />;
};

export default TermsScreen;
