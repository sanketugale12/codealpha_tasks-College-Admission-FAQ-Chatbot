import { useState } from 'react';
import ThreeBackground from './components/ThreeBackground';
import ChatInterface from './components/ChatInterface';
import { Sparkles, Info, BookOpen, Calculator, Cpu, HelpCircle, X, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <div id="app-root" className="relative min-h-screen w-full flex flex-col items-center justify-between overflow-hidden bg-slate-950 font-sans text-slate-100">
      
      {/* Dynamic Fullscreen 3D Scene */}
      <ThreeBackground />

      {/* Subtle overlay gradients to blend the 3D scene and frosted glass elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none -z-10" />

      {/* 1. Header with University FAQ branding */}
      <header id="app-header" className="w-full max-w-6xl mx-auto px-6 py-4 flex items-center justify-between shrink-0 z-10 select-none">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-300 shadow-md">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-lg tracking-wider text-white uppercase">
                Aurelia
              </span>
              <span className="font-sans font-light text-slate-300 text-sm">
                University Portal
              </span>
            </div>
            <p className="text-[10px] text-amber-400 font-mono tracking-widest uppercase">
              Admissions Office • 2026 Entry
            </p>
          </div>
        </div>

        {/* Informative Help Guide button */}
        <button
          id="info-modal-btn"
          onClick={() => setShowInfoModal(true)}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-amber-300 bg-amber-400/10 hover:bg-amber-400/15 border border-amber-400/20 hover:border-amber-400/45 rounded-xl transition-all duration-200 cursor-pointer shadow-lg"
        >
          <Info className="w-4 h-4" />
          <span className="hidden sm:inline">How the NLP Works</span>
        </button>
      </header>

      {/* 2. Main Chat Workspace Container */}
      <main id="app-main-content" className="w-full flex-1 flex items-center justify-center py-2 z-10">
        <ChatInterface />
      </main>

      {/* 3. Aesthetic Academic Footer */}
      <footer id="app-footer" className="w-full max-w-6xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 shrink-0 z-10 select-none gap-2">
        <p>© 2026 Aurelia University Admissions Office. All rights reserved.</p>
        <div className="flex items-center gap-3 font-mono">
          <span>Accuracy Threshold: 0.25</span>
          <span className="text-slate-600">|</span>
          <span className="text-amber-400/80">Vector Dimension: Variable Vocab</span>
          <span className="text-slate-600">|</span>
          <span>Self-Contained Client</span>
        </div>
      </footer>

      {/* 4. NLP Explanation Modal Overlay */}
      <AnimatePresence>
        {showInfoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="glassmorphism w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative"
            >
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />
              
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/50">
                <div className="flex items-center gap-2.5">
                  <Cpu className="w-5 h-5 text-amber-400" />
                  <h3 className="font-display font-bold text-base text-white tracking-wide">
                    Manual TF-IDF & Cosine Similarity Engine
                  </h3>
                </div>
                <button
                  id="close-info-modal-btn"
                  onClick={() => setShowInfoModal(false)}
                  className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Content Scroll */}
              <div className="p-6 overflow-y-auto max-h-[70vh] custom-scrollbar space-y-5 text-sm leading-relaxed text-slate-300">
                <p>
                  This chatbot operates completely offline in your browser, utilizing standard information retrieval techniques to score user questions against a verified database of college admissions FAQs. Here is how the mathematical matching pipeline operates step-by-step:
                </p>

                {/* Pipeline Steps */}
                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="flex gap-3 items-start">
                    <div className="p-1.5 rounded-lg bg-amber-400/10 text-amber-300 shrink-0 mt-0.5">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">1. Preprocessing & Stopword Stripping</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        We lowercase the text, remove all special punctuation characters, and split sentences into atomic word tokens. Then, we filter out common English 'stopwords' (like <i>the, which, is, standard, please, want</i>) which carry little semantic value.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-3 items-start">
                    <div className="p-1.5 rounded-lg bg-amber-400/10 text-amber-300 shrink-0 mt-0.5">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">2. Term Frequency - Inverse Document Frequency (TF-IDF)</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        We define a master multi-dimensional vocabulary out of all unique words. For each question, we compute:
                      </p>
                      <ul className="list-disc pl-4 mt-1.5 text-xs text-slate-400 space-y-1">
                        <li><b>Term Frequency (TF)</b>: How frequently a token appears in a question relative to the length of the question.</li>
                        <li><b>Inverse Document Frequency (IDF)</b>: Logarithmically weights words, so unique/specific words (like <i>scholarship, FAFSA, TOEFL, GPA</i>) score much higher than generic ones (like <i>year, college, admission</i>). Formula: <code>idf = ln(1 + N / (1 + df))</code></li>
                      </ul>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-3 items-start">
                    <div className="p-1.5 rounded-lg bg-amber-400/10 text-amber-300 shrink-0 mt-0.5">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">3. Vector L2 Normalization & Cosine Similarity</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Both the FAQ database answers and the user's incoming query are converted into multi-dimensional vectors using the calculated weights. We normalize these vectors so their magnitude equals 1.0. 
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        To find the most suitable answer, we calculate the dot product between the normalized query vector and every single FAQ vector. The dot product yields the cosine of the angle between them, representing high-dimensional direction similarity (Cosine Similarity).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Accuracy Threshold info */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-400/15">
                  <div className="font-semibold text-xs text-amber-300 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> High-Accuracy Matching Boosters
                  </div>
                  <p className="text-[11px] text-slate-400">
                    To make the matching exceptionally robust, each FAQ item is compiled with additional hidden <b>keywords</b>. These keywords are combined with the questions during vectorization, allowing matches on colloquial terms or abbreviations (e.g., matching "SAT" for queries typing "exams", or "fafsa" for "aid"). If the final similarity score exceeds <b>0.25</b>, the verified answer is displayed.
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end px-6 py-4 bg-slate-950 border-t border-white/10">
                <button
                  id="close-info-modal-btn-footer"
                  onClick={() => setShowInfoModal(false)}
                  className="px-4 py-2 text-xs font-semibold bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl transition-colors cursor-pointer"
                >
                  Understood
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
