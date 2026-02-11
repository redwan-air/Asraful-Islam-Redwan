import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { getGeminiResponse, SYSTEM_INSTRUCTION } from '../services/geminiService.ts';
import { ChatMessage, PageId } from '../types.ts';

// Helper for Base64 Decoding
function decode(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// PCM Audio Decoding for standard PCM returned by Live API
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "INDEX_ACTIVE: Link established. I am your guide for Asraful Islam Redwan's world. Type or use Voice to query." }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const liveSessionRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const navigateTo = (section: string) => {
    const target = section as PageId;
    window.dispatchEvent(new CustomEvent('navTo', { detail: target }));
    setIsOpen(false);
  };

  const parseResponse = (text: string) => {
    // Regex matches [NAV:id|Label]
    const parts = text.split(/(\[NAV:[a-z]+\|[^\]]+\])/g);
    return parts.map((part, i) => {
      if (part.startsWith('[NAV:')) {
        const content = part.slice(5, -1);
        const [id, label] = content.split('|');
        return (
          <button 
            key={i} 
            onClick={() => navigateTo(id)}
            className="text-blue-400 font-bold hover:underline decoration-blue-500/50 underline-offset-4 transition-all mx-1"
          >
            {label}
          </button>
        );
      }
      return part;
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

  const stopVoiceMode = () => {
    setIsVoiceActive(false);
    if (liveSessionRef.current) {
      liveSessionRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const startVoiceMode = async () => {
    if (isVoiceActive) return stopVoiceMode();
    
    setIsVoiceActive(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } }
        },
        callbacks: {
          onopen: () => {
            setMessages(prev => [...prev, { role: 'model', text: "VOICE_MODE: High-fidelity audio link active. I'm listening to you." }]);
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
          onmessage: async (message) => {
            const base64 = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64 && audioContextRef.current) {
              const audioCtx = audioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioCtx.currentTime);
              const buffer = await decodeAudioData(decode(base64), audioCtx, 24000, 1);
              const source = audioCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(audioCtx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
            }
          },
          onerror: (e) => {
            console.error("Voice Error", e);
            stopVoiceMode();
          },
          onclose: () => stopVoiceMode()
        }
      });
      
      liveSessionRef.current = sessionPromise;
    } catch (err) {
      console.error("Mic Access Error", err);
      setIsVoiceActive(false);
      alert("Microphone access is required for Voice Mode.");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="w-[19rem] sm:w-[26rem] glass-premium rounded-[3rem] shadow-2xl flex flex-col h-[550px] overflow-hidden animate-in zoom-in duration-300 border-white/10">
          <div className="px-8 py-6 border-b border-white/5 bg-slate-900/95 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full ${isVoiceActive ? 'bg-emerald-500 animate-ping' : 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.8)]'}`}></div>
              <div>
                <span className="text-[10px] font-mono font-black text-blue-500 uppercase tracking-[0.2em] block leading-none">Redwan_Guide_V3</span>
                <span className="text-[8px] text-slate-500 font-mono mt-1 block">{isVoiceActive ? 'REALTIME_VOICE_SYNC' : 'CONTEXT_INDEXER_READY'}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={startVoiceMode}
                className={`p-2 rounded-xl border transition-all ${isVoiceActive ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-500 hover:text-white'}`}
                title="Voice Conversation"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
              </button>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 rounded-full transition-all">✕</button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 space-y-6 bg-slate-950/80 scroll-smooth custom-scrollbar relative">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-5 text-[11px] font-mono leading-relaxed rounded-2xl shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-blue-600/10 text-blue-200 border border-blue-500/20 rounded-tr-none' 
                    : 'text-slate-400 bg-slate-900/40 border border-white/5 rounded-tl-none'
                }`}>
                  {m.role === 'model' && <span className="text-blue-600 mr-2">█</span>}
                  {parseResponse(m.text)}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-2 items-center px-6 py-4 rounded-2xl bg-slate-900/40 border border-white/5">
                   <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                   <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                   <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                   <span className="text-blue-600/60 text-[8px] font-mono uppercase tracking-widest ml-3 font-bold">Neural_Parsing...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-8 bg-slate-900 border-t border-white/5">
            <div className="relative group">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                disabled={isTyping}
                placeholder="Ask Redwan's AI anything..."
                className="w-full bg-black/60 border border-white/10 rounded-2xl pl-6 pr-14 py-4 text-[11px] text-white focus:outline-none focus:border-blue-500/50 font-mono placeholder:text-slate-800 transition-all disabled:opacity-50 shadow-inner"
              />
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-blue-600 disabled:opacity-10 hover:scale-110 transition-all bg-blue-500/5 rounded-xl border border-blue-500/10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
            <p className="text-[8px] font-mono text-slate-700 mt-4 text-center uppercase tracking-widest leading-relaxed">
              Clickable navigation links will appear in responses
            </p>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 glass rounded-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 group relative shadow-2xl border border-white/10"
        >
          <img 
            src="https://i.postimg.cc/HkYKGYnb/logo.png" 
            className="h-8 w-auto opacity-50 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" 
            alt="Redwan AI" 
          />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full border-2 border-slate-950 flex items-center justify-center shadow-lg">
             <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </button>
      )}
    </div>
  );
};

export default GeminiAssistant;