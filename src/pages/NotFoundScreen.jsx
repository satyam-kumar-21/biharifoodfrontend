import { Link } from 'react-router-dom';

const NotFoundScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <h1 className="text-9xl font-bold text-primary opacity-20">404</h1>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold font-hindi">क्षमा करें! पेज नहीं मिला</h2>
        <p className="text-gray-500">शायद आप गलत पते पर आ गए हैं।</p>
      </div>
      <Link to="/" className="village-button-primary">मुख्य पृष्ठ पर जाएँ</Link>
    </div>
  );
};

export default NotFoundScreen;
