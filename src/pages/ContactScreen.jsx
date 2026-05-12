import { Phone, Mail, MapPin, Send } from 'lucide-react';

const ContactScreen = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold font-hindi">Contact Us</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Your suggestions and questions are important to us. You can reach out to us through the form below or directly using the contact details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-8">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                <MapPin size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold font-hindi">Our Address</h3>
                <p className="text-gray-600">Patna City, Bihar, India - 800008</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="p-4 bg-green-100 rounded-2xl text-green-600">
                <Phone size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold font-hindi">Phone Number</h3>
                <p className="text-gray-600">+91 98765 43210</p>
                <p className="text-gray-600">+91 12345 67890</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="p-4 bg-blue-100 rounded-2xl text-blue-600">
                <Mail size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold font-hindi">Email</h3>
                <p className="text-gray-600">info@swaadbiharka.com</p>
                <p className="text-gray-600">support@swaadbiharka.com</p>
              </div>
            </div>
          </div>

          <div className="bg-primary p-8 rounded-3xl text-white">
            <h3 className="text-xl font-bold font-hindi mb-4 text-secondary">Need Help?</h3>
            <p className="mb-6 opacity-90">We are available from 9 AM to 6 PM (Monday - Saturday).</p>
            <button className="village-button-secondary w-full">Chat on WhatsApp</button>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="font-bold font-hindi">Your Name</label>
              <input 
                type="text" 
                className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none"
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <label className="font-bold font-hindi">Email Address</label>
              <input 
                type="email" 
                className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none"
                placeholder="Enter email"
              />
            </div>
            <div className="space-y-2">
              <label className="font-bold font-hindi">Subject</label>
              <input 
                type="text" 
                className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none"
                placeholder="Enter subject"
              />
            </div>
            <div className="space-y-2">
              <label className="font-bold font-hindi">Message</label>
              <textarea 
                rows="5" 
                className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none"
                placeholder="Write your message here..."
              ></textarea>
            </div>
            <button className="village-button-primary w-full flex items-center justify-center gap-2">
              <Send size={20} /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactScreen;
