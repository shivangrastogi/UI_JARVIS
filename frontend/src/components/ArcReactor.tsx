import React from 'react';

interface ArcReactorProps {
  isActive: boolean;
  onClick?: () => void;
}

const ArcReactor: React.FC<ArcReactorProps> = ({ isActive, onClick }) => {
  return (
    <div 
      className={`relative w-32 h-32 mx-auto cursor-pointer transition-all duration-300 ${
        isActive ? 'scale-110' : 'hover:scale-105'
      }`}
      onClick={onClick}
    >
      {/* Outer glow ring */}
      <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
        isActive 
          ? 'animate-pulse bg-gradient-to-r from-cyan-400/30 to-blue-500/30 blur-md' 
          : 'bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-sm'
      }`}></div>
      
      {/* Main reactor core */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-black/80 flex items-center justify-center">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-cyan-300 to-blue-400 transition-all duration-300 ${
            isActive ? 'animate-spin' : ''
          }`}>
            <div className="w-full h-full rounded-full bg-gradient-conic from-cyan-400 via-blue-500 to-cyan-400 animate-spin-slow"></div>
          </div>
        </div>
      </div>
      
      {/* Inner pulsing core */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white animate-pulse shadow-lg shadow-cyan-400/50"></div>
      
      {/* Orbital rings */}
      <div className={`absolute inset-0 rounded-full border border-cyan-400/40 transition-all duration-1000 ${
        isActive ? 'animate-spin' : ''
      }`}></div>
      <div className={`absolute inset-1 rounded-full border border-blue-400/30 transition-all duration-1500 ${
        isActive ? 'animate-spin animate-reverse' : ''
      }`}></div>
    </div>
  );
};

export default ArcReactor;