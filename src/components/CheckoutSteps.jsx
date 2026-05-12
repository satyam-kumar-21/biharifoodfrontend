import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className='flex justify-center items-center mb-12 gap-4 md:gap-8'>
      <div className='flex flex-col items-center gap-2'>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
        <span className={`text-sm font-hindi ${step1 ? 'text-primary font-bold' : 'text-gray-400'}`}>Login</span>
      </div>
      <div className={`h-1 w-12 md:w-20 ${step2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
      <div className='flex flex-col items-center gap-2'>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
        <span className={`text-sm font-hindi ${step2 ? 'text-primary font-bold' : 'text-gray-400'}`}>Address</span>
      </div>
      <div className={`h-1 w-12 md:w-20 ${step3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
      <div className='flex flex-col items-center gap-2'>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
        <span className={`text-sm font-hindi ${step3 ? 'text-primary font-bold' : 'text-gray-400'}`}>Payment</span>
      </div>
      <div className={`h-1 w-12 md:w-20 ${step4 ? 'bg-primary' : 'bg-gray-200'}`}></div>
      <div className='flex flex-col items-center gap-2'>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step4 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>4</div>
        <span className={`text-sm font-hindi ${step4 ? 'text-primary font-bold' : 'text-gray-400'}`}>Order</span>
      </div>
    </div>
  );
};

export default CheckoutSteps;
