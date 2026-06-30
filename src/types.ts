export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  keywords?: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  matchMetadata?: {
    matchedQuestion: string;
    similarityScore: number;
    category: string;
  };
}

export interface NLPResult {
  faqItem: FAQItem | null;
  score: number;
  tokens: string[];
}

export interface CategoryInfo {
  id: string;
  name: string;
  icon: string;
  description: string;
}
