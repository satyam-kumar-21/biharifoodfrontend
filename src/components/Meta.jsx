import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords, url, image, type }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
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
  title: 'Bihar wala taste - Authentic Bihari Food, Thekua & Gujiya Online',
  description: 'Experience the best of Bihar with our authentic, traditional, and homemade delicacies. From the rich history of Bihar, we bring you hand-crafted Thekua, Nimki, Tilkut, Peda, and more. Authentic village taste delivered fresh.',
  keywords: 'Bihari food online, best Bihari food, authentic Bihari sweets, Thekua online India, buy Gujiya online, Nimki snacks, Gaya Tilkut online, Deoghar Peda, Khaja from Silao, history of Bihar food, traditional Bihari snacks, Sattu online, Bihari snacks home delivery, Bihar wala taste',
  url: 'https://www.biharwalataste.com',
  image: '/biharwalatastelogo.webp',
  type: 'website'
};

export default Meta;

