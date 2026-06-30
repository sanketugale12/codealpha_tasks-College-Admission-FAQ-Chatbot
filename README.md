# College Admissions FAQ Chatbot with 3D Background

A highly polished, responsive single-page web application featuring an interactive FAQ Chatbot floating above a dynamic, animated 3D particle and geometric scene created with **Three.js**. 

The chatbot answers prospective student questions about college admissions using a **fully in-browser, custom-implemented NLP similarity matching pipeline** (TF-IDF + Cosine Similarity) without requiring any external APIs or Python backends.

---

## 🚀 Key Features

- **Dynamic 3D Particle Scene**: Fullscreen animated background featuring orbiting gold and deep sapphire academic shapes, generating a sophisticated atmosphere.
- **Client-Side NLP Matcher**: Custom TypeScript implementation of tokenization, punctuation removal, stopword filtering, Term Frequency (TF), Inverse Document Frequency (IDF), and high-dimensional Cosine Similarity.
- **Topic Category Explorer**: Sidebar featuring 8 admissions categories with automatic sub-question indexing for click-to-ask convenience.
- **Glassmorphic UI**: Beautiful frosted-glass chat panel, complete with custom scrolling, smooth animation transitions, dynamic context suggestion chips, and an active typing simulator.
- **Real-Time NLP Debugger**: An expandable diagnostic drawer that shows precise similarity scoring, matching questions, and categories to let users visualize how the system scores queries.
- **Comprehensive FAQ Database**: Includes 28 fully articulated Q&A items across critical admissions categories.

---

## 🧮 How the NLP Engine Works

The engine computes vector representations of text without any cloud dependencies:

1. **Preprocessing**: 
   Every query is lowercased, punctuation is stripped via regex, and it is split into words. Core English stopwords (e.g., *a, the, what, which, please*) are filtered using a hardcoded `Set`.
2. **TF-IDF (Term Frequency - Inverse Document Frequency)**:
   - **TF**: Measures the frequency of a word within a single document.
   - **IDF**: Reduces the weight of extremely common words across all FAQs (e.g., *college*, *admission*) while boosting specific keywords (e.g., *scholarship*, *TOEFL*, *FAFSA*).
   - **Formula**: `IDF(t) = ln(1 + N / (1 + DF(t)))` where $N$ is the total number of FAQ items, and $DF(t)$ is the number of documents containing term $t$.
3. **L2 Vector Normalization**:
   All high-dimensional document vectors are pre-normalized to a unit length of `1.0`.
4. **Cosine Similarity**:
   The user query is vectorized using the same IDF values and normalized. We compute the dot product against all FAQ vectors:
   $$\text{Similarity}(A, B) = A \cdot B = \sum_{i=1}^{V} A_i B_i$$
   If the highest cosine similarity exceeds the threshold of **0.25**, the verified answer is returned; otherwise, a polite fallback message is rendered.

---

## 📁 Project Structure

- `/src/types.ts` - TypeScript interfaces for FAQs, categories, and message logs.
- `/src/data/faqs.ts` - Contains the 8 categories, 28 Q&A pairs, and the English stopwords lists.
- `/src/utils/nlp.ts` - Fully documented class and instance of `FAQSimilarityEngine`.
- `/src/components/ThreeBackground.tsx` - Three.js WebGL scene containing orbiting stars and low-poly meshes.
- `/src/components/ChatInterface.tsx` - High-fidelity chat panels, suggestion flows, and diagnostic panels.
- `/src/App.tsx` - App entry layout, branding headers, and the "How it works" popup modal.

---

## 📝 How to Extend the FAQ Dataset

To add more questions and answers, simply open `/src/data/faqs.ts` and insert a new object into the `FAQS` array.

### Schema of a FAQ Item:
```typescript
{
  id: string;        // Must be unique, e.g. 'faq-29'
  category: string;  // Must match one of the category IDs inside the CATEGORIES list
  question: string;  // The text of the question
  answer: string;    // The verified official response to render
  keywords: string[];// Optional: list of distinct synonyms to boost matching success
}
```

### Example:
```typescript
{
  id: 'faq-29',
  category: 'fees-scholarships',
  question: 'Is there an installment plan for paying the tuition fees?',
  answer: 'Yes! The bursar office offers a monthly payment plan allowing you to divide your semester tuition into 4 equal interest-free installments.',
  keywords: ['installment', 'installments', 'plan', 'monthly', 'split', 'pay', 'bursar']
}
```
*Note: The NLP engine automatically rebuilds its vocabulary, re-calculates IDF values, and normalizes vectors upon reloading the application — no additional configurations are needed!*
