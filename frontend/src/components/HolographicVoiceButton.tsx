import React, { useState } from 'react';
// @ts-ignore
import { Mic, MicOff, Volume2 } from 'lucide-react';

interface HolographicVoiceButtonProps {
  isListening: boolean;
  onToggleListen: () => void;
}

const HolographicVoiceButton: React.FC<HolographicVoiceButtonProps> = ({ isListening, onToggleListen }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div className="relative flex flex-col items-center space-y-4">
      {/* Voice command title */}
      <div className="text-center">
        <h2 className="text-2xl font-audiowide text-cyan-300 mb-2">VOICE COMMAND</h2>
        <p className="text-gray-400 font-exo text-sm">
          {isListening ? 'Listening for your command...' : 'Click to activate voice interface'}
        </p>
      </div>

      <div className="relative">
        {/* Holographic projection rings */}
        {isListening && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border border-cyan-400/40 animate-ping" style={{ animationDelay: '0s' }}></div>
            <div className="absolute w-40 h-40 rounded-full border border-blue-400/30 animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute w-48 h-48 rounded-full border border-purple-400/20 animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute w-56 h-56 rounded-full border border-cyan-300/10 animate-ping" style={{ animationDelay: '1.5s' }}></div>
          </div>
        )}

        {/* Outer holographic glow */}
        <div className={`absolute -inset-6 rounded-full transition-all duration-500 ${
          isListening 
            ? 'bg-gradient-radial from-cyan-400/30 via-cyan-400/10 to-transparent blur-xl animate-pulse' 
            : 'bg-gradient-radial from-cyan-400/20 via-cyan-400/5 to-transparent blur-lg'
        }`}></div>
        
        {/* Main button */}
        <button
          className={`relative w-24 h-24 rounded-full bg-gradient-to-r transition-all duration-300 transform ${
            isListening
              ? 'from-cyan-400 to-blue-500 scale-110 shadow-2xl shadow-cyan-400/60'
              : 'from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 hover:scale-105 shadow-xl shadow-cyan-500/40'
          } ${isPressed ? 'scale-95' : ''}`}
          onClick={onToggleListen}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onMouseLeave={() => setIsPressed(false)}
        >
          <div className="w-full h-full rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center border border-cyan-400/50">
            {isListening ? (
              <div className="flex items-center space-x-1">
                <Volume2 className="text-white w-8 h-8 animate-pulse" />
              </div>
            ) : (
              <Mic className="text-white w-8 h-8" />
            )}
          </div>
          
          {/* Inner energy ring */}
          {isListening && (
            <div className="absolute inset-2 rounded-full border-2 border-white/60 animate-ping"></div>
          )}
        </button>

        {/* Waveform visualization */}
        {isListening && (
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-end space-x-1">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-cyan-400 rounded-full animate-waveform"
                style={{
                  height: `${Math.random() * 20 + 10}px`,
                  animationDelay: `${i * 0.1}s`
                }}
              ></div>
            ))}
          </div>
        )}
      </div>

      {/* Status indicator */}
      <div className="text-center">
        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-300 ${
          isListening 
            ? 'border-green-400 bg-green-400/20 text-green-400' 
            : 'border-gray-500 bg-gray-500/20 text-gray-400'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            isListening ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
          }`}></div>
          <span className="text-sm font-audiowide">
            {isListening ? 'RECORDING' : 'STANDBY'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HolographicVoiceButton;