import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords, url, image, type }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="author" content="Bihar wala taste" />
      <meta name="theme-color" content="#8B4513" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Bihar wala taste" />
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
  title: 'Bihar - Authentic Bihari Food, Thekua & Traditions | Bihar wala taste',
  description: 'The soul of Bihar delivered to your doorstep. Experience authentic Bihar food, traditional Bihari snacks like Thekua, and the rich culinary history of Bihar. We bring you the true village taste of Bihar, freshly made and hand-crafted.',
  keywords: 'Bihar, Bihar food, Bihari food, Bihar wala, Bihar wala taste, Thekua, Bihari Thekua, best Bihari food online, authentic Bihari sweets, buy Gujiya online, Nimki snacks, Gaya Tilkut online, Deoghar Peda, Khaja from Silao, traditional Bihari snacks, Sattu online, Bihari snacks home delivery',
  url: 'https://biharwalataste.com',
  image: '/biharwalatastelogo.webp',
  type: 'website'
};

export default Meta;

