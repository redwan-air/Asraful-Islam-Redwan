import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "GUIDE_ACTIVE: Query file metadata or section locations." }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const response = await getGeminiResponse(userMsg);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen ? (
        <div className="w-[20rem] sm:w-[22rem] glass-premium rounded-[2rem] shadow-2xl flex flex-col h-[450px] overflow-hidden animate-in zoom-in duration-200">
          {/* Minimal Header */}
          <div className="px-6 py-3 border-b border-white/5 bg-slate-900/80 flex items-center justify-between">
            <span className="text-[9px] font-mono font-bold text-blue-500 uppercase tracking-widest">Website_Guide_v1</span>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-slate-500 hover:text-white transition-all text-xs"
            >
              CLOSE
            </button>
          </div>

          {/* Chat Canvas */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-950/40">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-3 text-[11px] leading-tight ${
                  m.role === 'user' 
                    ? 'bg-blue-600/20 text-blue-100 rounded-xl border border-blue-500/20' 
                    : 'text-slate-400 font-mono'
                }`}>
                  {m.role === 'model' && <span className="text-blue-500 mr-2">></span>}
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="text-blue-500/50 text-[10px] font-mono animate-pulse">SEARCHING_DATABASE...</div>
              </div>
            )}
          </div>

          {/* Input Console */}
          <div className="p-4 bg-slate-900/60 border-t border-white/5">
            <div className="relative">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Query (e.g. 'logo date')"
                className="w-full bg-black/40 border border-white/5 rounded-lg pl-3 pr-10 py-2 text-[11px] text-white focus:outline-none focus:border-blue-500/30 font-mono placeholder:text-slate-700"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 text-blue-500 disabled:opacity-30"
              >
                <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-10 h-10 glass rounded-full flex items-center justify-center text-slate-500 opacity-40 hover:opacity-100 hover:scale-110 hover:border-blue-500/50 transition-all duration-300"
          title="Website Guide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default GeminiAssistant;