import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { getGeminiResponse, SYSTEM_INSTRUCTION } from '../services/geminiService.ts';
import { ChatMessage, PageId } from '../types.ts';

function encode(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const buffer = ctx.createBuffer(1, dataInt16.length, sampleRate);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;
  return buffer;
}

const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "INDEX_ACTIVE: Link established. I am your guide for Asraful Islam Redwan. Ask about the logo or projects." }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const liveSessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef(0);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const navigateTo = (section: string) => {
    window.dispatchEvent(new CustomEvent('navTo', { detail: section }));
    setIsOpen(false);
  };

  const parseResponse = (text: string) => {
    // Robust regex to capture [NAV:id|label]
    const parts = text.split(/(\[NAV:[a-z]+\|[^\]]+\])/g);
    return parts.map((part, i) => {
      if (part.startsWith('[NAV:')) {
        const content = part.slice(5, -1);
        const [id, label] = content.split('|');
        return (
          <button 
            key={i} 
            onClick={() => navigateTo(id)}
            className="px-3 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-tighter hover:bg-white hover:text-blue-600 transition-all mx-1 shadow-lg border border-white/20 animate-pulse"
          >
            {label}
          </button>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const handleSend = async (customText?: string) => {
    const userMsg = (customText || input).trim();
    if (!userMsg || isTyping) return;

    const currentHistory = [...messages];
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const response = await getGeminiResponse(userMsg, currentHistory);
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
  };

  const startVoiceMode = async () => {
    if (isVoiceActive) {
      setIsVoiceActive(false);
      audioContextRef.current?.close();
      return;
    }
    
    setIsVoiceActive(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext({ sampleRate: 24000 });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } }
        },
        callbacks: {
          onopen: () => {
            setMessages(prev => [...prev, { role: 'model', text: "VOICE_LINK: Established. I'm listening." }]);
            const inputCtx = new AudioContext({ sampleRate: 16000 });
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              const base64 = encode(new Uint8Array(int16.buffer));
              sessionPromise.then(s => s.sendRealtimeInput({ media: { data: base64, mimeType: 'audio/pcm;rate=16000' } }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (msg) => {
            const base64 = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64 && audioContextRef.current) {
              const audioCtx = audioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioCtx.currentTime);
              const buffer = await decodeAudioData(decode(base64), audioCtx, 24000);
              const source = audioCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(audioCtx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
            }
          },
          onerror: () => setIsVoiceActive(false),
          onclose: () => setIsVoiceActive(false)
        }
      });
      liveSessionRef.current = sessionPromise;
    } catch {
      setIsVoiceActive(false);
      alert("Microphone required for Voice Mode.");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="w-[19rem] sm:w-[26rem] glass-premium rounded-[3rem] shadow-2xl flex flex-col h-[550px] overflow-hidden animate-in zoom-in duration-300 border-white/10">
          <div className="px-8 py-6 border-b border-white/5 bg-slate-900/95 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full ${isVoiceActive ? 'bg-emerald-500 animate-ping' : 'bg-blue-600'}`}></div>
              <span className="text-[10px] font-mono font-black text-blue-500 uppercase tracking-widest">Redwan_Guide_V4</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={startVoiceMode} className={`p-2 rounded-xl transition-all ${isVoiceActive ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-500 hover:text-white'}`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
              </button>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 text-slate-500 hover:text-white">✕</button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 space-y-6 bg-slate-950/80 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-5 text-[11px] font-mono leading-relaxed rounded-2xl ${
                  m.role === 'user' ? 'bg-blue-600/10 text-blue-200 border border-blue-500/20' : 'text-slate-400 bg-slate-900/40 border border-white/5'
                }`}>
                  {m.role === 'model' && <span className="text-blue-600 mr-2">█</span>}
                  {parseResponse(m.text)}
                </div>
              </div>
            ))}
            {isTyping && <div className="p-4 text-[10px] text-blue-500 font-mono animate-pulse">THINKING_ENGINE_ACTIVE...</div>}
          </div>

          <div className="p-8 bg-slate-900 border-t border-white/5">
            <div className="relative">
              <input 
                type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about my logo or studies..."
                className="w-full bg-black/60 border border-white/10 rounded-2xl pl-6 pr-14 py-4 text-[11px] text-white focus:outline-none focus:border-blue-500/50 font-mono"
              />
              <button onClick={() => handleSend()} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeWidth="2" /></svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="w-16 h-16 glass rounded-2xl flex items-center justify-center transition-all hover:scale-110 shadow-2xl border border-white/10">
          <img src="https://i.postimg.cc/HkYKGYnb/logo.png" className="h-8 w-auto opacity-70 group-hover:opacity-100" alt="Guide" />
        </button>
      )}
    </div>
  );
};

export default GeminiAssistant;