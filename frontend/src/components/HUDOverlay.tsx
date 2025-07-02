import React from 'react';
import { Cpu, Zap, Wifi, Radio, Shield, Activity, Satellite, Database } from 'lucide-react';

const HUDOverlay: React.FC = () => {
  const hudElements = [
    { Icon: Cpu, position: 'top-24 left-8', delay: '0s' },
    { Icon: Zap, position: 'top-40 right-16', delay: '1s' },
    { Icon: Wifi, position: 'top-1/2 left-8', delay: '0.5s' },
    { Icon: Radio, position: 'top-1/3 right-8', delay: '2s' },
    { Icon: Shield, position: 'top-2/3 left-16', delay: '1.5s' },
    { Icon: Activity, position: 'top-1/4 right-24', delay: '0.8s' },
    { Icon: Satellite, position: 'top-3/4 left-24', delay: '2.2s' },
    { Icon: Database, position: 'top-2/3 right-32', delay: '1.8s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-5">
      {/* Corner HUD brackets */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-cyan-400/60"></div>
      <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-cyan-400/60"></div>
      <div className="absolute bottom-32 left-8 w-20 h-20 border-l-2 border-b-2 border-cyan-400/60"></div>
      <div className="absolute bottom-32 right-8 w-20 h-20 border-r-2 border-b-2 border-cyan-400/60"></div>

      {/* Floating HUD icons */}
      {hudElements.map((element, index) => (
        <div
          key={index}
          className={`absolute ${element.position} animate-float opacity-50 hover:opacity-80 transition-opacity duration-300`}
          style={{ animationDelay: element.delay }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400/30 rounded-full blur-md animate-pulse"></div>
            <element.Icon className="relative text-cyan-400 w-6 h-6" />
          </div>
        </div>
      ))}

      {/* Holographic scan lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-scan-line"></div>
      <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent animate-scan-line" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-scan-line" style={{ animationDelay: '4s' }}></div>

      {/* Radar rings */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-[1000px] h-[1000px] border border-cyan-400/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-cyan-400/15 rounded-full animate-spin-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-cyan-400/20 rounded-full animate-spin-reverse"></div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 231, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 231, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
    </div>
  );
};

export default HUDOverlay;