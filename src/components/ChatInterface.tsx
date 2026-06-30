import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CalendarDays,
  FileText,
  GraduationCap,
  Coins,
  Home,
  BookOpen,
  CheckCircle2,
  PhoneCall,
  Send,
  Trash2,
  Sparkles,
  Bot,
  User,
  Info,
  Cpu,
  ChevronRight,
  MessageSquare,
  HelpCircle,
  X
} from 'lucide-react';
import { ChatMessage, CategoryInfo, FAQItem } from '../types';
import { CATEGORIES, FAQS } from '../data/faqs';
import { nlpEngine } from '../utils/nlp';

// Icon mapper helper
const iconMap: { [key: string]: React.ComponentType<any> } = {
  CalendarDays,
  FileText,
  GraduationCap,
  Coins,
  Home,
  BookOpen,
  CheckCircle2,
  PhoneCall
};

export default function ChatInterface() {
  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: "Welcome to the College Admissions Portal! 🎓 I am your virtual helper, here to guide you through application processes, criteria, housing, fees, and more.\n\nSelect one of the categories in the lower panel to browse common questions, or type your own question in the input box below!",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showDebug, setShowDebug] = useState(false);
  
  // Ref for auto-scroll
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle sending message
  const handleSendMessage = (textToSend: string) => {
    const trimmedText = textToSend.trim();
    if (!trimmedText) return;

    // 1. Append User Message
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: trimmedText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // 2. Process NLP answer in a simulated natural typing delay (800ms - 1500ms)
    setTimeout(() => {
      // First, check special cases (greetings, identity, thanks)
      const specialMatch = nlpEngine.checkSpecialCases(trimmedText);
      
      let botReplyText = '';
      let matchMetadata = undefined;

      if (specialMatch) {
        botReplyText = specialMatch.reply;
      } else {
        // Run standard cosine similarity engine
        const nlpResult = nlpEngine.findBestMatch(trimmedText);
        
        // Threshold check (0.25 as requested by user)
        if (nlpResult.faqItem && nlpResult.score >= 0.25) {
          botReplyText = nlpResult.faqItem.answer;
          matchMetadata = {
            matchedQuestion: nlpResult.faqItem.question,
            similarityScore: nlpResult.score,
            category: nlpResult.faqItem.category
          };
        } else {
          // Fallback response with helpful hints
          botReplyText = "I'm sorry, I couldn't find a precise match for that question in my system. 🔍\n\nCould you try rephrasing? Or you can browse the official categories in the lower panel to click on verified questions!";
          if (nlpResult.faqItem && nlpResult.score > 0) {
            // Include close match as metadata in debug
            matchMetadata = {
              matchedQuestion: nlpResult.faqItem.question,
              similarityScore: nlpResult.score,
              category: nlpResult.faqItem.category
            };
          }
        }
      }

      const botMessage: ChatMessage = {
        id: `msg-${Date.now()}-bot`,
        sender: 'bot',
        text: botReplyText,
        timestamp: new Date(),
        matchMetadata
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  // Clear Chat History
  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear the conversation?')) {
      setMessages([
        {
          id: `welcome-${Date.now()}`,
          sender: 'bot',
          text: "Let's start fresh! Ask me any questions about admissions, exams, scholarships, housing, or counseling.",
          timestamp: new Date()
        }
      ]);
      setSelectedCategory(null);
    }
  };

  // Get matching questions for current category
  const getCategoryQuestions = (catId: string): FAQItem[] => {
    return FAQS.filter(faq => faq.category === catId);
  };

  // Helper to format date
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Select a category on mobile or desktop
  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(selectedCategory === catId ? null : catId);
  };

  // Suggestions based on last messages
  const getQuickSuggestions = (): string[] => {
    if (selectedCategory) {
      return getCategoryQuestions(selectedCategory).map(faq => faq.question);
    }

    const lastMsg = [...messages].reverse().find(m => m.sender === 'user');
    if (!lastMsg) {
      return [
        "What are the application deadlines?",
        "Are SAT scores required?",
        "Is campus housing guaranteed?"
      ];
    }
    
    // Simple word matches for dynamic suggestions
    const text = lastMsg.text.toLowerCase();
    if (text.includes('deadline') || text.includes('apply')) {
      return ["How to apply?", "Is there an application fee?", "What are eligibility criteria?"];
    }
    if (text.includes('fee') || text.includes('tuition') || text.includes('scholarship')) {
      return ["How to apply for financial aid?", "Are there international scholarships?", "Estimated cost of housing?"];
    }
    if (text.includes('housing') || text.includes('hostel') || text.includes('room')) {
      return ["Meal plan options?", "Can I choose my roommate?", "Dorms open during breaks?"];
    }
    if (text.includes('major') || text.includes('course') || text.includes('study')) {
      return ["Can I apply undecided?", "How to double major?", "What minor programs exist?"];
    }
    
    return [
      "Show scholarship requirements",
      "How do I contact admissions?",
      "Can I get a campus tour?"
    ];
  };

  return (
    <div id="faq-chatbot-container" className="flex flex-col w-full max-w-4xl mx-auto h-[90vh] lg:h-[82vh] gap-4 px-4 z-10 select-text">
      
      {/* MAIN CHAT WINDOW: Now full-width, giving a clean 'full screen' immersive aesthetic */}
      <div 
        id="main-chat-window" 
        className="glassmorphism w-full rounded-2xl flex flex-col flex-1 relative shadow-2xl transition-all duration-300 overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-400/0 via-amber-400/50 to-amber-400/0" />

        {/* Chat Window Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-900 to-amber-500 flex items-center justify-center border border-amber-400/30 shadow-lg">
                <Bot className="w-5 h-5 text-amber-300 animate-pulse" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#090d16] animate-ping" />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#090d16]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-display font-bold text-white text-base leading-none">
                  Admissions Assistant
                </h1>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-400 font-mono border border-amber-400/20">
                  Local NLP
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Answering application, fee, & hostel FAQs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* NLP Info/Debug Trigger */}
            <button
              id="debug-toggle-btn"
              onClick={() => setShowDebug(!showDebug)}
              title="Show NLP Details"
              className={`p-2 rounded-lg transition-colors ${
                showDebug 
                  ? 'bg-amber-400/25 text-amber-300 border border-amber-400/40' 
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4" />
            </button>
            
            {/* Clear Chat Button */}
            <button
              id="clear-chat-btn"
              onClick={handleClearChat}
              title="Clear Conversation"
              className="p-2 rounded-lg bg-white/5 text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chat History Section */}
        <div className="flex-1 overflow-y-auto px-5 py-6 custom-scrollbar space-y-5">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar Icon */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-md ${
                  msg.sender === 'user' 
                    ? 'bg-amber-400 text-slate-900' 
                    : 'bg-slate-800 text-amber-300 border border-amber-400/20'
                }`}>
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble wrapper */}
                <div className="space-y-1">
                  <div className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-lg ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 font-medium rounded-tr-none'
                      : 'bg-slate-900/80 text-slate-100 border border-white/5 rounded-tl-none whitespace-pre-wrap'
                  }`}>
                    {msg.text}
                  </div>

                  {/* Subtitle / Timestamp / Debug Info */}
                  <div className={`flex items-center gap-2 text-[10px] text-slate-400 px-1 ${
                    msg.sender === 'user' ? 'justify-end' : ''
                  }`}>
                    <span>{formatTime(msg.timestamp)}</span>

                    {/* Quick indicator of similarity match */}
                    {msg.sender === 'bot' && msg.matchMetadata && (
                      <>
                        <span>•</span>
                        <span className="text-amber-400/80 font-mono">
                          Score: {(msg.matchMetadata.similarityScore * 100).toFixed(0)}%
                        </span>
                      </>
                    )}
                  </div>

                  {/* Collapsible details for NLP engine */}
                  {msg.sender === 'bot' && msg.matchMetadata && showDebug && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-slate-950/70 border border-amber-400/10 rounded-lg p-2.5 mt-2 text-[11px] font-mono text-slate-400 max-w-md"
                    >
                      <div className="font-bold text-amber-400 flex items-center gap-1 mb-1">
                        <Cpu className="w-3 h-3" /> NLP ENGINE SPECS
                      </div>
                      <div className="grid grid-cols-4 gap-1">
                        <span className="text-slate-500">Match:</span>
                        <span className="col-span-3 text-slate-300 truncate" title={msg.matchMetadata.matchedQuestion}>
                          "{msg.matchMetadata.matchedQuestion}"
                        </span>
                        
                        <span className="text-slate-500">Method:</span>
                        <span className="col-span-3 text-slate-300">TF-IDF + Cosine Similarity</span>

                        <span className="text-slate-500">Score:</span>
                        <span className="col-span-3">
                          <span className={`font-bold ${msg.matchMetadata.similarityScore >= 0.45 ? 'text-green-400' : 'text-amber-400'}`}>
                            {msg.matchMetadata.similarityScore.toFixed(4)}
                          </span>
                          <span className="text-slate-500 text-[10px]"> (threshold: 0.25)</span>
                        </span>

                        <span className="text-slate-500">Topic:</span>
                        <span className="col-span-3 text-slate-300 capitalize">{msg.matchMetadata.category.replace('-', ' ')}</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-amber-300 border border-amber-400/20 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-bounce" />
              </div>
              <div className="p-3.5 bg-slate-900/80 border border-white/5 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-lg">
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* BROWSE FAQ TOPICS (Lower Part): Integrated horizontal navigation strip */}
        <div id="browse-topics-strip" className="border-t border-white/5 bg-slate-950/40 px-4 py-3 shrink-0">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[10px] font-semibold text-amber-400/80 tracking-wider uppercase flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" /> Browse Admissions Topics:
            </span>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-[10px] text-slate-400 hover:text-amber-300 flex items-center gap-1 font-mono cursor-pointer transition-colors"
              >
                <X className="w-3 h-3" /> Clear Topic Filter
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-amber-400/20 custom-scrollbar whitespace-nowrap">
            {CATEGORIES.map((cat) => {
              const IconComponent = iconMap[cat.icon] || HelpCircle;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`cat-strip-btn-${cat.id}`}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/10'
                      : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white hover:border-amber-400/20'
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5 shrink-0" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic & Context-aware suggestions bar (Lists specific FAQ questions when topic is active) */}
        <div id="quick-suggestions-bar" className="px-5 py-2.5 flex items-center gap-1.5 shrink-0 select-none overflow-x-auto whitespace-nowrap scrollbar-none border-t border-white/5 bg-slate-950/20">
          {getQuickSuggestions().map((suggestion, index) => (
            <button
              key={index}
              id={`suggest-chip-${index}`}
              onClick={() => handleSendMessage(suggestion)}
              className="text-[11px] font-medium text-slate-300 bg-white/5 border border-white/10 hover:border-amber-400/40 hover:text-amber-300 hover:bg-amber-400/5 px-2.5 py-1 rounded-full transition-all duration-150 flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <Sparkles className="w-2.5 h-2.5 text-amber-400 shrink-0" />
              <span>{suggestion}</span>
            </button>
          ))}
        </div>

        {/* Input box + send button */}
        <form 
          id="chat-input-form"
          onSubmit={handleFormSubmit} 
          className="p-4 border-t border-white/10 shrink-0 flex items-center gap-2 bg-slate-950/45 rounded-b-2xl"
        >
          <input
            id="chat-input-field"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your admissions question (e.g., 'What are the scholarship requirements?')..."
            className="flex-1 bg-white/5 border border-white/10 focus:border-amber-400/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none transition-all duration-200"
            disabled={isTyping}
            maxLength={180}
            autoFocus
          />
          <button
            id="chat-send-btn"
            type="submit"
            disabled={isTyping || !inputText.trim()}
            className="p-3 rounded-xl bg-amber-400 hover:bg-amber-500 disabled:bg-slate-800 text-slate-950 disabled:text-slate-500 transition-colors cursor-pointer shadow-lg hover:shadow-amber-400/15"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
