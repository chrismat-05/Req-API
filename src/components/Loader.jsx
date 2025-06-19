const Loader = ({ size = 'h-8 w-8', className = '' }) => {
  return (
    <div className={`flex justify-center items-center h-full ${className}`}>
      <div
        className={`animate-spin rounded-full border-4 border-solid border-primary-500 border-t-transparent ${size}`}
      />
    </div>
  );
};

export default Loader;