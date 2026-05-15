/**
 * Optimizes Cloudinary URLs by adding auto-format, auto-quality, and specific width.
 * @param {string} url - The original Cloudinary URL
 * @param {number} width - The desired width in pixels
 * @returns {string} - The optimized URL
 */
export const getOptimizedImage = (url, width = 400) => {
  if (!url || !url.includes('cloudinary.com')) return url;
  
  // Handle already optimized URLs or avoid double optimization
  if (url.includes('/f_auto,q_auto')) return url;

  // Insert parameters after '/upload/'
  return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
};
