import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface EnhancedChatInterfaceProps {
  isListening: boolean;
}

const EnhancedChatInterface: React.FC<EnhancedChatInterfaceProps> = ({ isListening }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Good evening, Mr. Stark. I am JARVIS, your AI assistant. All systems are operational and ready for your commands.",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const jarvisResponses = [
    "Certainly, sir. Processing your request now.",
    "I understand. Accessing the relevant databases.",
    "Of course. Let me analyze that for you.",
    "Right away, sir. Initiating protocols.",
    "Acknowledged. Running diagnostics now.",
    "Absolutely, sir. Cross-referencing with current data.",
    "I'm on it. Scanning all available resources.",
    "Understood. Compiling the information you requested."
  ];

  // @ts-ignore
  const simulateAssistantResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const response = jarvisResponses[Math.floor(Math.random() * jarvisResponses.length)];
    
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: response,
      sender: 'assistant',
      timestamp: new Date()
    }]);
    
    setIsTyping(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user' as const,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    await simulateAssistantResponse(inputText);
  };

  const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, 25);
        return () => clearTimeout(timeout);
      }
    }, [currentIndex, text]);

    return <span>{displayText}</span>;
  };

  return (
    <div className="w-full max-w-lg bg-black/30 backdrop-blur-xl border border-cyan-400/40 rounded-lg shadow-2xl shadow-cyan-400/20">
      {/* Chat header */}
      <div className="p-4 border-b border-cyan-400/30 bg-gradient-to-r from-cyan-400/10 to-blue-500/10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-cyan-300 font-audiowide text-sm">J.A.R.V.I.S</h3>
            <p className="text-xs text-gray-400 font-exo">Just A Rather Very Intelligent System</p>
          </div>
          <div className="ml-auto">
            <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
          </div>
        </div>
      </div>

      {/* Messages container */}
      <div className="h-80 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-400/30 scrollbar-track-transparent">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-xs ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                message.sender === 'user' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                  : 'bg-gradient-to-r from-cyan-400 to-blue-500'
              }`}>
                {message.sender === 'user' ? (
                  <User className="w-3 h-3 text-white" />
                ) : (
                  <Bot className="w-3 h-3 text-white" />
                )}
              </div>
              <div
                className={`px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-500/80 to-purple-600/80 text-white border border-blue-400/50'
                    : 'bg-gradient-to-r from-cyan-400/20 to-blue-500/20 text-cyan-300 border border-cyan-400/40'
                }`}
              >
                <TypewriterText text={message.text} />
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                <Bot className="w-3 h-3 text-white" />
              </div>
              <div className="bg-gradient-to-r from-cyan-400/20 to-blue-500/20 text-cyan-300 border border-cyan-400/40 px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-cyan-400/30 bg-gradient-to-r from-cyan-400/5 to-blue-500/5">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Speak to JARVIS..."
            className="flex-1 bg-black/50 border border-cyan-400/50 rounded-lg px-3 py-2 text-cyan-300 placeholder-cyan-400/60 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-exo"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white p-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/30"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnhancedChatInterface;