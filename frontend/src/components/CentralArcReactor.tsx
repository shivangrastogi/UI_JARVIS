import React, { useState, useEffect } from 'react';

interface CentralArcReactorProps {
  isActive: boolean;
  onClick?: () => void;
}

const CentralArcReactor: React.FC<CentralArcReactorProps> = ({ isActive, onClick }) => {
  const [animationPhase, setAnimationPhase] = useState<'wireframe' | 'light-approach' | 'light-fill' | 'complete'>('wireframe');

  useEffect(() => {
    // Wireframe phase (0-4s)
    const wireframeTimer = setTimeout(() => {
      setAnimationPhase('light-approach');
    }, 4000);

    // Light approach phase (4-6s)
    const lightApproachTimer = setTimeout(() => {
      setAnimationPhase('light-fill');
    }, 6000);

    // Light fill phase (6-8s)
    const lightFillTimer = setTimeout(() => {
      setAnimationPhase('complete');
    }, 8000);

    return () => {
      clearTimeout(wireframeTimer);
      clearTimeout(lightApproachTimer);
      clearTimeout(lightFillTimer);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center space-y-6">
      {/* Central Arc Reactor Container */}
      <div 
        className={`relative w-80 h-80 cursor-pointer transition-all duration-1000 ${
          isActive ? 'scale-110' : 'hover:scale-105'
        }`}
        onClick={onClick}
      >
        {/* Phase 1: Wireframe Construction */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${
          animationPhase === 'wireframe' ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Outer wireframe rings */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
            {/* Main outer ring */}
            <circle 
              cx="160" cy="160" r="150" 
              fill="none" 
              stroke="rgba(0, 255, 231, 0.8)" 
              strokeWidth="2"
              strokeDasharray="942"
              className="animate-wireframe-build"
            />
            
            {/* Secondary rings */}
            <circle 
              cx="160" cy="160" r="120" 
              fill="none" 
              stroke="rgba(34, 211, 238, 0.6)" 
              strokeWidth="1.5"
              strokeDasharray="754"
              className="animate-wireframe-build"
              style={{ animationDelay: '0.5s' }}
            />
            
            <circle 
              cx="160" cy="160" r="90" 
              fill="none" 
              stroke="rgba(147, 197, 253, 0.5)" 
              strokeWidth="1"
              strokeDasharray="565"
              className="animate-wireframe-build"
              style={{ animationDelay: '1s' }}
            />

            {/* Inner triangular structure */}
            <polygon 
              points="160,80 220,200 100,200" 
              fill="none" 
              stroke="rgba(0, 255, 231, 0.7)" 
              strokeWidth="2"
              strokeDasharray="360"
              className="animate-wireframe-build"
              style={{ animationDelay: '1.5s' }}
            />
            
            {/* Inner inverted triangle */}
            <polygon 
              points="160,240 130,160 190,160" 
              fill="none" 
              stroke="rgba(34, 211, 238, 0.8)" 
              strokeWidth="2"
              strokeDasharray="180"
              className="animate-wireframe-build"
              style={{ animationDelay: '2s' }}
            />

            {/* Construction grid lines */}
            <line x1="160" y1="10" x2="160" y2="310" stroke="rgba(0, 255, 231, 0.3)" strokeWidth="1" className="animate-wireframe-build" style={{ animationDelay: '2.5s' }} />
            <line x1="10" y1="160" x2="310" y2="160" stroke="rgba(0, 255, 231, 0.3)" strokeWidth="1" className="animate-wireframe-build" style={{ animationDelay: '2.7s' }} />
            <line x1="47" y1="47" x2="273" y2="273" stroke="rgba(0, 255, 231, 0.2)" strokeWidth="1" className="animate-wireframe-build" style={{ animationDelay: '3s' }} />
            <line x1="273" y1="47" x2="47" y2="273" stroke="rgba(0, 255, 231, 0.2)" strokeWidth="1" className="animate-wireframe-build" style={{ animationDelay: '3.2s' }} />
          </svg>
          
          {/* Corner construction markers */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400 animate-pulse"></div>
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-400 animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-400 animate-pulse"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400 animate-pulse"></div>
        </div>

        {/* Phase 2: Light Approach */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${
          animationPhase === 'light-approach' ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Completed wireframe structure */}
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400/60">
            <div className="absolute inset-4 rounded-full border border-cyan-400/40">
              <div className="absolute inset-4 rounded-full border border-blue-400/30"></div>
            </div>
          </div>
          
          {/* Approaching light particles */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
            <div className="w-2 h-8 bg-gradient-to-b from-cyan-400 via-white to-transparent animate-light-approach"></div>
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <div className="w-2 h-8 bg-gradient-to-t from-cyan-400 via-white to-transparent animate-light-approach" style={{ animationDelay: '0.3s' }}></div>
          </div>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
            <div className="w-8 h-2 bg-gradient-to-r from-cyan-400 via-white to-transparent animate-light-approach" style={{ animationDelay: '0.6s' }}></div>
          </div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <div className="w-8 h-2 bg-gradient-to-l from-cyan-400 via-white to-transparent animate-light-approach" style={{ animationDelay: '0.9s' }}></div>
          </div>
          
          {/* Central convergence point */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full animate-pulse"></div>
        </div>

        {/* Phase 3: Light Fill */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${
          animationPhase === 'light-fill' ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Energy filling from center outward */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-gradient-radial from-white via-cyan-400 to-transparent rounded-full animate-energy-expand"></div>
            <div className="absolute inset-0 w-16 h-16 bg-gradient-radial from-cyan-400/80 via-blue-400/60 to-transparent rounded-full animate-energy-expand" style={{ animationDelay: '0.3s' }}></div>
            <div className="absolute inset-0 w-32 h-32 bg-gradient-radial from-blue-400/60 via-cyan-400/40 to-transparent rounded-full animate-energy-expand" style={{ animationDelay: '0.6s' }}></div>
            <div className="absolute inset-0 w-48 h-48 bg-gradient-radial from-cyan-400/40 via-blue-400/20 to-transparent rounded-full animate-energy-expand" style={{ animationDelay: '0.9s' }}></div>
          </div>
          
          {/* Triangular energy pattern */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg className="w-64 h-64" viewBox="0 0 256 256">
              <polygon 
                points="128,64 176,176 80,176" 
                fill="url(#triangleGradient)" 
                className="animate-triangle-fill"
              />
              <defs>
                <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                  <stop offset="50%" stopColor="rgba(0,255,231,0.7)" />
                  <stop offset="100%" stopColor="rgba(34,211,238,0.5)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Phase 4: Complete Arc Reactor */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${
          animationPhase === 'complete' ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Holographic glow */}
          <div className={`absolute -inset-16 rounded-full transition-all duration-1000 ${
            isActive 
              ? 'bg-gradient-radial from-cyan-400/50 via-cyan-400/20 to-transparent animate-pulse blur-3xl' 
              : 'bg-gradient-radial from-cyan-400/30 via-cyan-400/10 to-transparent blur-2xl'
          }`}></div>
          
          {/* Main reactor housing */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border-4 border-cyan-400/70 shadow-2xl shadow-cyan-400/60">
            <div className="absolute inset-4 rounded-full bg-black/90 overflow-hidden">
              
              {/* Arc Reactor Core with triangular pattern */}
              <div className={`w-full h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-400 transition-all duration-500 ${
                isActive ? 'animate-spin' : ''
              } relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-conic from-cyan-400 via-white via-cyan-400 to-cyan-400 animate-spin-slow opacity-90"></div>
                
                {/* Central triangular energy core */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg className="w-32 h-32" viewBox="0 0 128 128">
                    <polygon 
                      points="64,32 88,88 40,88" 
                      fill="url(#coreTriangleGradient)" 
                      className="animate-pulse"
                    />
                    <polygon 
                      points="64,96 56,64 72,64" 
                      fill="rgba(255,255,255,0.9)" 
                      className="animate-pulse"
                    />
                    <defs>
                      <radialGradient id="coreTriangleGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(255,255,255,1)" />
                        <stop offset="70%" stopColor="rgba(0,255,231,0.8)" />
                        <stop offset="100%" stopColor="rgba(34,211,238,0.6)" />
                      </radialGradient>
                    </defs>
                  </svg>
                </div>
                
                <div className="absolute inset-8 rounded-full bg-black/20 backdrop-blur-sm border-2 border-white/30"></div>
              </div>
            </div>
          </div>
          
          {/* Rotating energy rings */}
          <div className={`absolute -inset-6 rounded-full border-2 border-cyan-400/60 transition-all duration-1000 ${
            isActive ? 'animate-spin' : ''
          }`}>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/80"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/80"></div>
            <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/80"></div>
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/80"></div>
          </div>
          
          <div className={`absolute -inset-3 rounded-full border border-blue-400/40 transition-all duration-1500 ${
            isActive ? 'animate-spin animate-reverse' : ''
          }`}></div>
        </div>
      </div>

      {/* Power level indicator */}
      <div className="text-center space-y-3">
        <div className="text-cyan-400 font-audiowide text-2xl tracking-wider text-glow">ARC REACTOR</div>
        <div className="flex items-center justify-center space-x-4">
          <div className="w-40 h-4 bg-black/60 rounded-full border border-cyan-400/50 overflow-hidden shadow-inner">
            <div className={`h-full bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 rounded-full transition-all duration-2000 ${
              animationPhase === 'wireframe' ? 'w-0' :
              animationPhase === 'light-approach' ? 'w-1/4 animate-pulse' :
              animationPhase === 'light-fill' ? 'w-3/4 animate-pulse' : 
              isActive ? 'w-full animate-pulse' : 'w-5/6'
            }`}></div>
          </div>
          <span className="text-cyan-300 text-xl font-exo font-bold">
            {animationPhase === 'wireframe' ? '0%' :
             animationPhase === 'light-approach' ? '25%' :
             animationPhase === 'light-fill' ? '75%' :
             isActive ? '100%' : '89%'}
          </span>
        </div>
        <div className="text-sm text-gray-400 font-exo">
          Output: {animationPhase === 'wireframe' ? 'INITIALIZING...' :
                   animationPhase === 'light-approach' ? 'ENERGY APPROACH...' :
                   animationPhase === 'light-fill' ? 'CORE CHARGING...' :
                   isActive ? '3.2 TJ/s' : '2.9 TJ/s'}
        </div>
        <div className="text-xs text-cyan-300 font-audiowide tracking-wide">
          Status: {animationPhase === 'wireframe' ? 'WIREFRAME' :
                   animationPhase === 'light-approach' ? 'LIGHT APPROACH' :
                   animationPhase === 'light-fill' ? 'ENERGY FILL' : 'OPERATIONAL'}
        </div>
      </div>
    </div>
  );
};

export default CentralArcReactor;