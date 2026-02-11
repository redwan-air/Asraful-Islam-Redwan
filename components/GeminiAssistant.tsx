
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "SYSTEM_BOOT_COMPLETE: I am Redwan's personal AI agent. Ready for queries on his tech stack or algorithmic projects." }
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
        <div className="w-[22rem] sm:w-[26rem] glass-premium rounded-[2.5rem] shadow-[0_0_100px_-20px_rgba(59,130,246,0.5)] flex flex-col h-[600px] overflow-hidden animate-in zoom-in duration-300">
          {/* Header Bar */}
          <div className="px-8 py-5 border-b border-white/10 bg-slate-900/60 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/30"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/30"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30"></div>
              </div>
              <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-[0.3em]">Agent_v0.2</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Chat Canvas */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 space-y-8 scrollbar-hide bg-slate-950/20">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-5 text-sm leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-[1.8rem] rounded-tr-none' 
                    : 'bg-slate-900/80 text-slate-300 rounded-[1.8rem] rounded-tl-none border border-white/5 font-mono'
                }`}>
                  {m.role === 'model' && <span className="text-blue-500 mr-2">$</span>}
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-900/50 p-5 rounded-[1.8rem] rounded-tl-none border border-white/5 flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-blue-500/50 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500/50 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500/50 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Console */}
          <div className="p-8 bg-slate-900/40 border-t border-white/10">
            <div className="relative group">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Direct query to agent..."
                className="w-full bg-slate-950 border border-white/10 rounded-2xl pl-5 pr-14 py-4 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all font-mono placeholder:text-slate-600"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-11 h-11 bg-blue-600 text-white rounded-xl flex items-center justify-center disabled:bg-slate-800 disabled:opacity-50 transition-all hover:bg-blue-500 active:scale-90"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative w-20 h-20 bg-blue-600 text-white rounded-[2.2rem] shadow-[0_20px_60px_-15px_rgba(59,130,246,0.6)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 hover:rotate-6 hover:bg-blue-500"
        >
          <div className="absolute inset-0 bg-blue-400 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity rounded-full"></div>
          <svg className="w-10 h-10 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default GeminiAssistant;
