import React from 'react';

interface HolographicArcReactorProps {
  isActive: boolean;
  onClick?: () => void;
}

const HolographicArcReactor: React.FC<HolographicArcReactorProps> = ({ isActive, onClick }) => {
  return (
    <div className="relative flex flex-col items-center space-y-6">
      {/* Arc Reactor */}
      <div 
        className={`relative w-40 h-40 cursor-pointer transition-all duration-500 ${
          isActive ? 'scale-110' : 'hover:scale-105'
        }`}
        onClick={onClick}
      >
        {/* Outer holographic glow */}
        <div className={`absolute -inset-8 rounded-full transition-all duration-1000 ${
          isActive 
            ? 'bg-gradient-radial from-cyan-400/30 via-cyan-400/10 to-transparent animate-pulse blur-xl' 
            : 'bg-gradient-radial from-cyan-400/20 via-cyan-400/5 to-transparent blur-lg'
        }`}></div>
        
        {/* Main reactor housing */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-cyan-400/50 shadow-2xl shadow-cyan-400/30">
          <div className="absolute inset-2 rounded-full bg-black/90 flex items-center justify-center">
            
            {/* Inner core */}
            <div className={`w-24 h-24 rounded-full bg-gradient-to-r from-cyan-300 to-blue-400 transition-all duration-300 ${
              isActive ? 'animate-spin' : ''
            } relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-conic from-cyan-400 via-white via-cyan-400 to-cyan-400 animate-spin-slow opacity-80"></div>
              <div className="absolute inset-2 rounded-full bg-black/20 backdrop-blur-sm"></div>
            </div>
            
            {/* Central energy core */}
            <div className="absolute w-8 h-8 rounded-full bg-white shadow-lg shadow-cyan-400/80 animate-pulse"></div>
          </div>
        </div>
        
        {/* Rotating energy rings */}
        <div className={`absolute inset-0 rounded-full border-2 border-cyan-400/60 transition-all duration-1000 ${
          isActive ? 'animate-spin' : ''
        }`}>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full"></div>
          <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full"></div>
          <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full"></div>
        </div>
        
        <div className={`absolute inset-2 rounded-full border border-blue-400/40 transition-all duration-1500 ${
          isActive ? 'animate-spin animate-reverse' : ''
        }`}></div>
      </div>

      {/* Power level indicator */}
      <div className="text-center space-y-2">
        <div className="text-cyan-400 font-audiowide text-lg">ARC REACTOR</div>
        <div className="flex items-center space-x-2">
          <div className="w-20 h-2 bg-black/50 rounded-full border border-cyan-400/30">
            <div className={`h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full transition-all duration-1000 ${
              isActive ? 'w-full animate-pulse' : 'w-3/4'
            }`}></div>
          </div>
          <span className="text-cyan-300 text-sm font-exo">
            {isActive ? '100%' : '85%'}
          </span>
        </div>
        <div className="text-xs text-gray-400 font-exo">
          Output: {isActive ? '3.2 TJ/s' : '2.7 TJ/s'}
        </div>
      </div>
    </div>
  );
};

export default HolographicArcReactor;