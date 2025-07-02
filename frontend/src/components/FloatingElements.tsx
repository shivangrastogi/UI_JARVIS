import React from 'react';
import { Cpu, Zap, Wifi, Radio } from 'lucide-react';

const FloatingElements: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating particles */}
      <div className="absolute w-2 h-2 bg-cyan-400 rounded-full top-1/4 left-1/4 animate-float opacity-60"></div>
      <div className="absolute w-1 h-1 bg-blue-400 rounded-full top-3/4 left-1/3 animate-float-delayed opacity-40" style={{ animationDelay: '1s' }}></div>
      <div className="absolute w-3 h-3 bg-purple-400 rounded-full top-1/2 right-1/4 animate-float opacity-30" style={{ animationDelay: '2s' }}></div>
      
      {/* Floating icons */}
      <div className="absolute top-20 left-20 animate-float opacity-30">
        <Cpu className="text-cyan-400 w-8 h-8" />
      </div>
      <div className="absolute top-32 right-32 animate-float-delayed opacity-40" style={{ animationDelay: '1.5s' }}>
        <Zap className="text-blue-400 w-6 h-6" />
      </div>
      <div className="absolute bottom-32 left-40 animate-float opacity-35" style={{ animationDelay: '0.5s' }}>
        <Wifi className="text-purple-400 w-7 h-7" />
      </div>
      <div className="absolute bottom-20 right-20 animate-float-delayed opacity-45" style={{ animationDelay: '2.5s' }}>
        <Radio className="text-cyan-300 w-5 h-5" />
      </div>
      
      {/* Orbital rings */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-96 h-96 border border-cyan-400/20 rounded-full animate-spin-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-blue-400/15 rounded-full animate-spin-reverse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-purple-400/10 rounded-full animate-spin-slow"></div>
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 231, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 231, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
    </div>
  );
};

export default FloatingElements;