import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatInterfaceProps {
  isListening: boolean;
}

// @ts-ignore
const ChatInterface: React.FC<ChatInterfaceProps> = ({ isListening }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Good evening. I am JARVIS, your AI assistant. How may I assist you today?",
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

  // @ts-ignore
  const simulateAssistantResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const responses = [
      "I understand. Let me process that information for you.",
      "Certainly. I'm analyzing the data now.",
      "Processing your request. Stand by for results.",
      "I'm here to help. Let me access the relevant systems.",
      "Acknowledged. Initiating protocols now."
    ];
    
    const response = responses[Math.floor(Math.random() * responses.length)];
    
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
        }, 30);
        return () => clearTimeout(timeout);
      }
    }, [currentIndex, text]);

    return <span>{displayText}</span>;
  };

  return (
    <div className="w-full max-w-md bg-black/20 backdrop-blur-md border border-cyan-400/30 rounded-lg p-4">
      <div className="h-64 overflow-y-auto mb-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'bg-gradient-to-r from-cyan-400/20 to-blue-500/20 text-cyan-300 border border-cyan-400/30'
              }`}
            >
              <TypewriterText text={message.text} />
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gradient-to-r from-cyan-400/20 to-blue-500/20 text-cyan-300 border border-cyan-400/30 px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="flex space-x-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Speak to JARVIS..."
          className="flex-1 bg-black/40 border border-cyan-400/50 rounded-lg px-3 py-2 text-cyan-300 placeholder-cyan-400/60 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white p-2 rounded-lg transition-all duration-300 hover:scale-105"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;