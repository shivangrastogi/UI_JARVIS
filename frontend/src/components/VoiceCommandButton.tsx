import React, { useState } from 'react';
// @ts-ignore
import { Mic, MicOff, Volume2 } from 'lucide-react';

interface VoiceCommandButtonProps {
  isListening: boolean;
  onToggleListen: () => void;
}

const VoiceCommandButton: React.FC<VoiceCommandButtonProps> = ({ isListening, onToggleListen }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div className="relative flex flex-col items-center space-y-4">
      {/* Voice command label */}
      <div className="text-center mb-2">
        <h3 className="text-lg font-audiowide text-cyan-300 tracking-wide">VOICE COMMAND</h3>
        <p className="text-xs text-gray-400 font-exo">
          {isListening ? 'Listening...' : 'Click to activate'}
        </p>
      </div>

      <div className="relative">
        {/* Holographic projection rings */}
        {isListening && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border border-cyan-400/40 animate-ping"></div>
            <div className="absolute w-40 h-40 rounded-full border border-blue-400/30 animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute w-48 h-48 rounded-full border border-purple-400/20 animate-ping" style={{ animationDelay: '1s' }}></div>
          </div>
        )}

        {/* Outer holographic glow */}
        <div className={`absolute -inset-8 rounded-full transition-all duration-500 ${
          isListening 
            ? 'bg-gradient-radial from-cyan-400/40 via-cyan-400/15 to-transparent blur-xl animate-pulse' 
            : 'bg-gradient-radial from-cyan-400/25 via-cyan-400/8 to-transparent blur-lg'
        }`}></div>
        
        {/* Main button */}
        <button
          className={`relative w-28 h-28 rounded-full bg-gradient-to-r transition-all duration-300 transform border-2 ${
            isListening
              ? 'from-cyan-400 to-blue-500 scale-110 shadow-2xl shadow-cyan-400/70 border-cyan-300'
              : 'from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 hover:scale-105 shadow-xl shadow-cyan-500/50 border-cyan-400/60'
          } ${isPressed ? 'scale-95' : ''}`}
          onClick={onToggleListen}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onMouseLeave={() => setIsPressed(false)}
        >
          <div className="w-full h-full rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center border border-cyan-400/50">
            {isListening ? (
              <Volume2 className="text-white w-10 h-10 animate-pulse" />
            ) : (
              <Mic className="text-white w-10 h-10" />
            )}
          </div>
          
          {/* Inner energy ring */}
          {isListening && (
            <div className="absolute inset-3 rounded-full border-2 border-white/60 animate-ping"></div>
          )}
        </button>

        {/* Waveform visualization */}
        {isListening && (
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex items-end space-x-1">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-cyan-400 rounded-full animate-waveform shadow-lg shadow-cyan-400/60"
                style={{
                  height: `${Math.random() * 24 + 8}px`,
                  animationDelay: `${i * 0.1}s`
                }}
              ></div>
            ))}
          </div>
        )}
      </div>

      {/* Status indicator */}
      <div className="text-center mt-4">
        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-300 ${
          isListening 
            ? 'border-green-400 bg-green-400/20 text-green-400' 
            : 'border-gray-500 bg-gray-500/20 text-gray-400'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            isListening ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
          }`}></div>
          <span className="text-sm font-audiowide tracking-wide">
            {isListening ? 'RECORDING' : 'STANDBY'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VoiceCommandButton;