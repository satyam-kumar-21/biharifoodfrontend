import { Star, StarHalf } from 'lucide-react';

const Rating = ({ value, text, color = '#FFD700' }) => {
  return (
    <div 
      className='flex items-center gap-1'
      aria-label={`${value} out of 5 stars`}
    >
      <span className="flex" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((index) => (
          <span key={index}>
            {value >= index ? (
              <Star size={16} fill={color} stroke={color} />
            ) : value >= index - 0.5 ? (
              <StarHalf size={16} fill={color} stroke={color} />
            ) : (
              <Star size={16} stroke={color} />
            )}
          </span>
        ))}
      </span>
      <span className='text-sm text-gray-600 ml-1'>{text && text}</span>
    </div>
  );
};

export default Rating;
