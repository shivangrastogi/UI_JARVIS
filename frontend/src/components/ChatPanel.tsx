import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore
import { Send, User, Bot, MessageSquare, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatPanelProps {
  isListening: boolean;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ isListening }) => {
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
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isMinimized]);

  useEffect(() => {
  const interval = setInterval(() => {
    fetch("http://localhost:5000/get-message")
      .then((res) => res.json())
      .then((data) => {
        if (data.message && data.message.trim() !== "") {
          setMessages((prev) => {
            const alreadyExists = prev.some(m => m.text === data.message && m.sender === 'assistant');
            if (!alreadyExists) {
              return [
                ...prev,
                {
                  id: Date.now(),
                  text: data.message,
                  sender: 'assistant',
                  timestamp: new Date()
                }
              ];
            }
            return prev;
          });
        }
      });
  }, 2000);

  return () => clearInterval(interval);
}, []);


  const jarvisResponses = [
    "Certainly, sir. Processing your request now.",
    "I understand. Accessing the relevant databases.",
    "Of course. Let me analyze that for you.",
    "Right away, sir. Initiating protocols.",
    "Acknowledged. Running diagnostics now.",
    "Absolutely, sir. Cross-referencing with current data.",
    "I'm on it. Scanning all available resources.",
    "Understood. Compiling the information you requested.",
    "Processing complete. Here are the results.",
    "All systems nominal. Standing by for further instructions.",
    "Excellent choice, sir. Implementing your directive.",
    "Affirmative. Updating system parameters.",
    "Very well. Executing command sequence.",
    "Roger that. Interfacing with external systems.",
    "Confirmed. Optimizing performance metrics."
  ];

  // @ts-ignore
  const simulateAssistantResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
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
    
    // await simulateAssistantResponse(inputText);
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
    <div className={`transition-all duration-500 ease-in-out ${
      isMinimized 
        ? 'w-16 h-16' 
        : 'w-96 h-96'
    } bg-black/40 backdrop-blur-xl border border-cyan-400/50 rounded-lg shadow-2xl shadow-cyan-400/30`}>
      
      {/* Minimized state */}
      {isMinimized && (
        <div className="w-full h-full flex items-center justify-center">
          <button
            onClick={() => setIsMinimized(false)}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center hover:scale-110 transition-transform duration-300 border border-cyan-300"
          >
            <MessageSquare className="w-6 h-6 text-white" />
          </button>
        </div>
      )}

      {/* Expanded state */}
      {!isMinimized && (
        <>
          {/* Chat header */}
          <div className="p-4 border-b border-cyan-400/40 bg-gradient-to-r from-cyan-400/15 to-blue-500/15">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-cyan-300 font-audiowide text-sm tracking-wide">COMMUNICATION</h3>
                  <p className="text-xs text-gray-400 font-exo">Direct Interface</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="w-6 h-6 rounded bg-cyan-400/20 hover:bg-cyan-400/40 flex items-center justify-center transition-colors duration-200"
                >
                  <Minimize2 className="w-3 h-3 text-cyan-300" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages container */}
          <div className="h-64 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-cyan-400/30 scrollbar-track-transparent">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-xs ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-blue-400/50' 
                      : 'bg-gradient-to-r from-cyan-400 to-blue-500 border-cyan-400/50'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="w-3 h-3 text-white" />
                    ) : (
                      <Bot className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div
                    className={`px-3 py-2 rounded-lg border ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500/80 to-purple-600/80 text-white border-blue-400/60 shadow-lg shadow-blue-500/30'
                        : 'bg-gradient-to-r from-cyan-400/20 to-blue-500/20 text-cyan-300 border-cyan-400/50 shadow-lg shadow-cyan-400/20'
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
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 border border-cyan-400/50 flex items-center justify-center">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <div className="bg-gradient-to-r from-cyan-400/20 to-blue-500/20 text-cyan-300 border border-cyan-400/50 px-3 py-2 rounded-lg">
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
          <div className="p-4 border-t border-cyan-400/40 bg-gradient-to-r from-cyan-400/10 to-blue-500/10">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Speak to JARVIS..."
                className="flex-1 bg-black/60 border border-cyan-400/60 rounded-lg px-3 py-2 text-cyan-300 placeholder-cyan-400/60 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-exo"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white p-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/40 border border-cyan-400/50"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatPanel;