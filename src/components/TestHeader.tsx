
const TestHeader = () => {
  return (
    <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 border-b border-purple-200/30 py-12 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-blue-600/90 to-indigo-700/90"></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-white rounded-full"></div>
        <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-white rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-8 h-8 bg-white rounded-full"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Online Test Application
          </h1>
          <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
            Create intelligent assessments with automated question distribution across categories and difficulty levels
          </p>
          
          {/* Feature highlights */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
              🎯 Smart Distribution
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
              📊 Analytics Ready
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
              ⚡ Real-time Configuration
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestHeader;
