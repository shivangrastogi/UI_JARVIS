import React from 'react';

const RadarScanner: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Main radar rings */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-[800px] h-[800px] border border-cyan-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-cyan-400/15 rounded-full animate-spin-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-cyan-400/10 rounded-full animate-spin-reverse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-cyan-400/25 rounded-full animate-pulse"></div>
      </div>

      {/* Scanning beam */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-[400px] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-radar-sweep origin-left"></div>
      </div>

      {/* Corner HUD elements */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-cyan-400/40"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-cyan-400/40"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-cyan-400/40"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-cyan-400/40"></div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 231, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 231, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
    </div>
  );
};

export default RadarScanner;