const Message = ({ variant = 'info', children }) => {
  const variants = {
    info: 'bg-blue-100 text-blue-800 border-blue-200',
    danger: 'bg-red-100 text-red-800 border-red-200',
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  };

  return (
    <div className={`p-4 rounded-lg border ${variants[variant]} font-medium`}>
      {children}
    </div>
  );
};

export default Message;
