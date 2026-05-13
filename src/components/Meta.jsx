import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords, url, image, type }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="author" content="Kitchen Bihar Ka" />
      <meta name="theme-color" content="#8B4513" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Kitchen Bihar Ka" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      <link rel="canonical" href={url} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Kitchen Bihar Ka - Authentic Bihari Food, Thekua & Gujiya Online',
  description: 'Bringing the authentic, traditional, and homemade taste of Bihar to your doorstep. Buy Thekua, Khaja, Nimki, Gujiya, and more online. Free delivery over ₹500.',
  keywords: 'Bihari food online, authentic Bihari sweets, Thekua online India, buy Gujiya online, Khaja from Silao, Litti Chokha ingredients, Sattu online, Bihari snacks home delivery, traditional Indian sweets Bihar, healthy snacks Bihar, village food online, Kitchen Bihar Ka',
  url: 'https://kitchenbiharka.com/',
  image: '/kitchenbiharkalogo.png',
  type: 'website'
};

export default Meta;
