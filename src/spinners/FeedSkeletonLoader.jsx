

const FeedSkeletonLoader = ({isHidden}) => {
  return (
    <div className={`bg-gray-100 min-h-screen p-4 ${isHidden === true && 'hidden'}`}>
      <div className="max-w-xl mx-auto space-y-6">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-lg shadow animate-pulse space-y-3"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="flex-1">
                <div className="w-24 h-3 bg-gray-300 rounded"></div>
                <div className="w-16 h-3 bg-gray-200 rounded mt-2"></div>
              </div>
            </div>
            <div className="w-full h-40 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedSkeletonLoader;
