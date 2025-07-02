import React, { useState, useEffect } from 'react';
import { Cpu, Wifi, Shield, Zap, Activity, Radio } from 'lucide-react';

const SystemDiagnostics: React.FC = () => {
  const [uptime, setUptime] = useState({ hours: 847, minutes: 23, seconds: 16 });

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(prev => {
        let newSeconds = prev.seconds + 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;

        if (newSeconds >= 60) {
          newSeconds = 0;
          newMinutes += 1;
        }
        if (newMinutes >= 60) {
          newMinutes = 0;
          newHours += 1;
        }

        return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const diagnostics = [
    { label: 'Neural Network', status: 'ACTIVE', icon: Cpu, color: 'text-green-400' },
    { label: 'Voice Recognition', status: 'ONLINE', icon: Radio, color: 'text-cyan-400' },
    { label: 'System Status', status: 'OPERATIONAL', icon: Activity, color: 'text-blue-400' },
    { label: 'Security Clearance', status: 'MAXIMUM', icon: Shield, color: 'text-purple-400' },
    { label: 'Network', status: 'CONNECTED', icon: Wifi, color: 'text-green-400' },
    { label: 'Power Core', status: 'OPTIMAL', icon: Zap, color: 'text-yellow-400' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-black/60 backdrop-blur-xl border-t border-cyan-400/40 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {diagnostics.map((item, index) => (
            <div key={index} className="flex items-center space-x-3 group">
              <item.icon className={`w-5 h-5 ${item.color} group-hover:animate-pulse`} />
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 font-exo">{item.label}</span>
                <span className={`text-xs font-audiowide tracking-wide ${item.color}`}>{item.status}</span>
              </div>
              <div className={`w-2 h-2 rounded-full ${item.color.replace('text-', 'bg-')} animate-pulse`}></div>
            </div>
          ))}
        </div>
        
        {/* Additional system info */}
        <div className="mt-4 pt-4 border-t border-cyan-400/30 flex justify-between items-center text-xs text-gray-500 font-exo">
          <span className="font-audiowide tracking-wide">STARK INDUSTRIES • MARK 52 INTERFACE</span>
          <span className="font-audiowide tracking-wide">
            UPTIME: {String(uptime.hours).padStart(3, '0')}:{String(uptime.minutes).padStart(2, '0')}:{String(uptime.seconds).padStart(2, '0')}
          </span>
          <span className="font-audiowide tracking-wide text-green-400">THREAT LEVEL: MINIMAL</span>
        </div>
      </div>
    </div>
  );
};

export default SystemDiagnostics;