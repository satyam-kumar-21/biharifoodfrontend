const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative w-20 h-20">
        <div className="absolute top-0 left-0 w-full h-full border-8 border-primary-light rounded-full opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full border-8 border-primary rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;
