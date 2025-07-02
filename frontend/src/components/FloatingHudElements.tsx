import React from 'react';
import { Cpu, Zap, Wifi, Radio, Shield, Activity, Satellite, Database } from 'lucide-react';

const FloatingHudElements: React.FC = () => {
  const hudElements = [
    { Icon: Cpu, position: 'top-20 left-20', delay: '0s' },
    { Icon: Zap, position: 'top-32 right-32', delay: '1s' },
    { Icon: Wifi, position: 'bottom-40 left-40', delay: '0.5s' },
    { Icon: Radio, position: 'bottom-32 right-24', delay: '2s' },
    { Icon: Shield, position: 'top-1/2 left-16', delay: '1.5s' },
    { Icon: Activity, position: 'top-1/3 right-16', delay: '0.8s' },
    { Icon: Satellite, position: 'bottom-1/3 left-24', delay: '2.2s' },
    { Icon: Database, position: 'top-2/3 right-20', delay: '1.8s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating HUD icons */}
      {hudElements.map((element, index) => (
        <div
          key={index}
          className={`absolute ${element.position} animate-float opacity-40 hover:opacity-80 transition-opacity duration-300`}
          style={{ animationDelay: element.delay }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md animate-pulse"></div>
            <element.Icon className="relative text-cyan-400 w-6 h-6" />
          </div>
        </div>
      ))}

      {/* Floating data particles */}
      <div className="absolute w-1 h-1 bg-cyan-400 rounded-full top-1/4 left-1/4 animate-float opacity-60"></div>
      <div className="absolute w-2 h-2 bg-blue-400 rounded-full top-3/4 left-1/3 animate-float-delayed opacity-40" style={{ animationDelay: '1s' }}></div>
      <div className="absolute w-1 h-1 bg-purple-400 rounded-full top-1/2 right-1/4 animate-float opacity-50" style={{ animationDelay: '2s' }}></div>
      <div className="absolute w-2 h-2 bg-cyan-300 rounded-full top-1/6 right-1/3 animate-float-delayed opacity-30" style={{ animationDelay: '0.5s' }}></div>

      {/* Holographic scan lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-scan-line"></div>
      <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-scan-line" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-scan-line" style={{ animationDelay: '4s' }}></div>
    </div>
  );
};

export default FloatingHudElements;