import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

interface VoiceButtonProps {
  isListening: boolean;
  onToggleListen: () => void;
}

const VoiceButton: React.FC<VoiceButtonProps> = ({ isListening, onToggleListen }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div className="relative">
      {/* Ripple effect container */}
      <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
        isListening ? 'animate-ping bg-cyan-400/30' : ''
      }`}></div>
      
      {/* Outer glow ring */}
      <div className={`absolute -inset-4 rounded-full transition-all duration-500 ${
        isListening 
          ? 'bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-lg animate-pulse' 
          : 'bg-gradient-to-r from-cyan-400/10 to-blue-500/10 blur-md'
      }`}></div>
      
      {/* Main button */}
      <button
        className={`relative w-20 h-20 rounded-full bg-gradient-to-r transition-all duration-300 transform ${
          isListening
            ? 'from-cyan-400 to-blue-500 scale-110 shadow-lg shadow-cyan-400/50'
            : 'from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 hover:scale-105 shadow-md shadow-cyan-500/30'
        } ${isPressed ? 'scale-95' : ''}`}
        onClick={onToggleListen}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
      >
        <div className="w-full h-full rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center">
          {isListening ? (
            <Mic className="text-white w-8 h-8 animate-pulse" />
          ) : (
            <MicOff className="text-white w-8 h-8" />
          )}
        </div>
        
        {/* Inner pulse ring */}
        {isListening && (
          <div className="absolute inset-2 rounded-full border-2 border-white/50 animate-ping"></div>
        )}
      </button>
      
      {/* Sound waves */}
      {isListening && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border border-cyan-400/30 animate-ping" style={{ animationDelay: '0s' }}></div>
          <div className="absolute w-40 h-40 rounded-full border border-blue-400/20 animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute w-48 h-48 rounded-full border border-purple-400/10 animate-ping" style={{ animationDelay: '1s' }}></div>
        </div>
      )}
    </div>
  );
};

export default VoiceButton;