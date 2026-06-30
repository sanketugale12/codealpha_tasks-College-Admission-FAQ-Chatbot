import { FAQItem, NLPResult } from '../types';
import { FAQS, STOPWORDS } from '../data/faqs';

/**
 * Stem a token to its root form (handling plurals, verb tenses, and common suffixes)
 * for high-accuracy in-browser matching.
 */
export function stemToken(word: string): string {
  let w = word.toLowerCase();
  if (w.length <= 3) return w;

  // Handle common plural endings
  if (w.endsWith('ies')) {
    w = w.slice(0, -3) + 'y'; // e.g., 'eligibilities' -> 'eligibility'
  } else if (w.endsWith('s') && !w.endsWith('ss') && !w.endsWith('is') && !w.endsWith('us') && !w.endsWith('as')) {
    w = w.slice(0, -1); // e.g., 'deadlines' -> 'deadline', 'fees' -> 'fee'
  }

  // Handle common verb endings & tenses
  if (w.endsWith('ing')) {
    w = w.slice(0, -3); // e.g., 'entering' -> 'enter', 'applying' -> 'apply'
    if (w.endsWith('at')) {
      w = w + 'e'; // e.g., 'matriculating' -> 'matriculate'
    }
  } else if (w.endsWith('ed')) {
    w = w.slice(0, -2); // e.g., 'admitted' -> 'admit'
    // Normalize double consonant ending if stemmed
    if (w.endsWith('tt') || w.endsWith('dd') || w.endsWith('pp') || w.endsWith('nn')) {
      w = w.slice(0, -1);
    }
  }

  return w;
}

/**
 * Tokenize, lowercase, strip punctuation, filter out English stopwords, and stem tokens.
 */
export function preprocessText(text: string): string[] {
  if (!text) return [];
  
  // Lowercase and remove punctuation except alphanumeric and spaces
  const cleaned = text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Split by spaces, filter stopwords, and stem each valid token
  return cleaned
    .split(' ')
    .filter(token => token.length > 0 && !STOPWORDS.has(token))
    .map(token => stemToken(token));
}

export class FAQSimilarityEngine {
  private vocabulary: string[] = [];
  private faqVectors: number[][] = [];
  private faqTokenSets: Set<string>[] = [];
  private idfs: { [token: string]: number } = {};
  private faqs: FAQItem[] = [];

  constructor(faqsList: FAQItem[]) {
    this.faqs = faqsList;
    this.initializeEngine();
  }

  /**
   * Initializes the vocabulary, computes IDF scores, and generates normalized TF-IDF vectors for all FAQs.
   */
  private initializeEngine() {
    // 1. Gather documents. For each FAQ, we combine its question and keywords to enrich the search footprint.
    const documents = this.faqs.map(faq => {
      const keywordsStr = faq.keywords ? faq.keywords.join(' ') : '';
      return `${faq.question} ${keywordsStr}`;
    });

    // 2. Preprocess all documents, build a unique vocabulary and store token sets for overlap matching
    const tokenizedDocs = documents.map(doc => preprocessText(doc));
    this.faqTokenSets = tokenizedDocs.map(tokens => new Set(tokens));

    const vocabSet = new Set<string>();
    tokenizedDocs.forEach(tokens => tokens.forEach(t => vocabSet.add(t)));
    this.vocabulary = Array.from(vocabSet);

    const N = this.faqs.length;

    // 3. Compute Document Frequency (DF) for each term in the vocabulary
    const dfs: { [token: string]: number } = {};
    this.vocabulary.forEach(token => {
      dfs[token] = 0;
      tokenizedDocs.forEach(tokens => {
        if (tokens.includes(token)) {
          dfs[token]++;
        }
      });
    });

    // 4. Compute Inverse Document Frequency (IDF) using smooth formulation: idf = ln(1 + N / (1 + df))
    this.vocabulary.forEach(token => {
      this.idfs[token] = Math.log(1 + N / (1 + dfs[token]));
    });

    // 5. Build normalized TF-IDF vectors for all FAQs
    this.faqVectors = tokenizedDocs.map(tokens => {
      const tfIdfVector = this.vectorizeTokens(tokens);
      return this.normalizeVector(tfIdfVector);
    });
  }

  /**
   * Computes the TF-IDF vector for a list of tokens.
   */
  private vectorizeTokens(tokens: string[]): number[] {
    const vector = new Array(this.vocabulary.length).fill(0);
    if (tokens.length === 0) return vector;

    // Term Frequency (TF) counts
    const counts: { [token: string]: number } = {};
    tokens.forEach(token => {
      counts[token] = (counts[token] || 0) + 1;
    });

    // Compute TF-IDF
    this.vocabulary.forEach((token, index) => {
      if (counts[token]) {
        // Log-normalized TF or simple frequency TF
        const tf = counts[token] / tokens.length;
        const idf = this.idfs[token] || 0;
        vector[index] = tf * idf;
      }
    });

    return vector;
  }

  /**
   * L2-Normalizes a vector so its magnitude is 1.0 (simplifies cosine similarity to a dot product).
   */
  private normalizeVector(vector: number[]): number[] {
    const sumSq = vector.reduce((sum, val) => sum + val * val, 0);
    const magnitude = Math.sqrt(sumSq);
    if (magnitude === 0) return vector;
    return vector.map(val => val / magnitude);
  }

  /**
   * Computes the dot product between two vectors.
   */
  private dotProduct(vecA: number[], vecB: number[]): number {
    return vecA.reduce((sum, val, index) => sum + val * vecB[index], 0);
  }

  /**
   * Special case handlers for greetings, appreciation, and general agent info.
   */
  public checkSpecialCases(userInput: string): { isSpecial: boolean; reply: string } | null {
    const trimmed = userInput.trim().toLowerCase();
    const tokens = preprocessText(trimmed);

    // Simple greeting detector
    const greetings = ['hi', 'hello', 'hey', 'greetings', 'hola', 'howdy', 'yo', 'morning', 'afternoon', 'evening'];
    const isGreeting = greetings.some(g => trimmed === g || trimmed.startsWith(g + ' ') || tokens.includes(g));

    if (isGreeting) {
      return {
        isSpecial: true,
        reply: "Hello! 👋 I'm your College Admissions Assistant. I can help you with application deadlines, eligibility criteria, entrance exams, tuition fees, scholarships, housing, and campus tours. What is on your mind today?"
      };
    }

    // Thank you detector
    const thanks = ['thanks', 'thank you', 'ty', 'appreciate', 'helpful', 'awesome', 'great'];
    const isThanks = thanks.some(t => trimmed.includes(t));
    if (isThanks) {
      return {
        isSpecial: true,
        reply: "You're very welcome! 😊 I am always here to help. Feel free to ask if you have any other questions about admissions, fees, or student life!"
      };
    }

    // Agent info detector
    const identityKeywords = ['who are you', 'your name', 'what are you', 'tell me about yourself', 'what do you do', 'how can you help'];
    const isIdentity = identityKeywords.some(ik => trimmed.includes(ik));
    if (isIdentity) {
      return {
        isSpecial: true,
        reply: "I am the College Admissions Assistant, an interactive FAQ agent. I use an advanced in-browser Natural Language Processing (NLP) engine with TF-IDF vectorization and Cosine Similarity to find the best official answers for your college queries instantly!"
      };
    }

    // Farewell detector
    const farewells = ['bye', 'goodbye', 'see you', 'exit', 'quit'];
    const isFarewell = farewells.some(f => trimmed.includes(f));
    if (isFarewell) {
      return {
        isSpecial: true,
        reply: "Goodbye! Best of luck with your college applications! 🎓 Remember, you can always return here if you need more information."
      };
    }

    return null;
  }

  /**
   * Performs NLP-based matching using TF-IDF and Cosine Similarity.
   */
  public findBestMatch(userInput: string): NLPResult {
    const tokens = preprocessText(userInput);

    // If empty input or no meaningful tokens
    if (tokens.length === 0) {
      return {
        faqItem: null,
        score: 0,
        tokens: []
      };
    }

    // Vectorize user query and L2-normalize it
    const queryRawVector = this.vectorizeTokens(tokens);
    const queryVector = this.normalizeVector(queryRawVector);

    let maxScore = -1;
    let bestMatchIndex = -1;

    // Compute similarity against all pre-calculated FAQ vectors
    this.faqVectors.forEach((faqVec, index) => {
      const cosineSim = this.dotProduct(queryVector, faqVec);

      // Compute Overlap Coefficient (percentage of user query tokens found in the FAQ document tokens)
      const docTokenSet = this.faqTokenSets[index];
      let matchCount = 0;
      tokens.forEach(t => {
        if (docTokenSet.has(t)) {
          matchCount++;
        }
      });
      const overlapCoefficient = tokens.length > 0 ? matchCount / tokens.length : 0;

      // Hybrid scoring: Combining TF-IDF Cosine Similarity and Overlap Coefficient
      // This is extremely robust against variations in query length and phrasing.
      const score = 0.4 * cosineSim + 0.6 * overlapCoefficient;

      if (score > maxScore) {
        maxScore = score;
        bestMatchIndex = index;
      }
    });

    if (bestMatchIndex !== -1 && maxScore > 0) {
      return {
        faqItem: this.faqs[bestMatchIndex],
        score: maxScore,
        tokens
      };
    }

    return {
      faqItem: null,
      score: 0,
      tokens
    };
  }
}

// Export a singleton instance of the engine
export const nlpEngine = new FAQSimilarityEngine(FAQS);
