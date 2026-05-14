const fs = require('fs');
const path = require('path');
const axios = require('axios');

const BASE_URL = 'https://biharwalataste.com';
const API_URL = 'https://biharifoodbackend.vercel.app/api/products';

// Static routes with their priority and change frequency
const staticRoutes = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/menu', priority: '0.9', changefreq: 'daily' },
  { url: '/blogs', priority: '0.8', changefreq: 'weekly' },
  { url: '/about-us', priority: '0.7', changefreq: 'monthly' },
  { url: '/contact', priority: '0.7', changefreq: 'monthly' },
  { url: '/faq', priority: '0.6', changefreq: 'monthly' },
  { url: '/privacy', priority: '0.3', changefreq: 'monthly' },
  { url: '/shipping-policy', priority: '0.3', changefreq: 'monthly' },
  { url: '/returns', priority: '0.3', changefreq: 'monthly' },
  { url: '/terms', priority: '0.3', changefreq: 'monthly' },
  { url: '/track-order', priority: '0.5', changefreq: 'monthly' },
];

// Static blog data (mirrored from src/data/blogData.js)
const blogIds = ['1', '2', '3'];

async function generateSitemap() {
  console.log('🚀 Starting sitemap generation...');

  try {
    // 1. Fetch dynamic products
    console.log(`📡 Fetching products from ${API_URL}...`);
    const response = await axios.get(`${API_URL}?pageSize=100`);
    const products = response.data.products || [];
    console.log(`✅ Found ${products.length} products.`);

    // 2. Build XML content
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

    // Add static routes
    staticRoutes.forEach(route => {
      xml += `
  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    });

    // Add blog routes
    blogIds.forEach(id => {
      xml += `
  <url>
    <loc>${BASE_URL}/blog/${id}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    // Add product routes
    products.forEach(product => {
      const imageUrl = product.images && product.images.length > 0 ? product.images[0].url : '';
      xml += `
  <url>
    <loc>${BASE_URL}/product/${product._id}</loc>
    <lastmod>${product.updatedAt ? product.updatedAt.split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>`;
      
      if (imageUrl) {
        xml += `
    <image:image>
      <image:loc>${imageUrl.startsWith('http') ? imageUrl : BASE_URL + imageUrl}</image:loc>
      <image:title>${product.name.replace(/&/g, '&amp;')}</image:title>
    </image:image>`;
      }
      
      xml += `
  </url>`;
    });

    xml += `
</urlset>`;

    // 3. Write to public folder
    const outputPath = path.join(__dirname, 'public', 'sitemap.xml');
    fs.writeFileSync(outputPath, xml);
    console.log(`✨ Sitemap successfully generated at: ${outputPath}`);

  } catch (error) {
    console.error('❌ Error generating sitemap:', error.message);
    process.exit(1);
  }
}

generateSitemap();
