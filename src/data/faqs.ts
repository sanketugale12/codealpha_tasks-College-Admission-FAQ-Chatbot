import { FAQItem, CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'application-process',
    name: 'Process & Deadlines',
    icon: 'CalendarDays',
    description: 'Dates, portal links, and submission instructions'
  },
  {
    id: 'eligibility-documents',
    name: 'Eligibility & Docs',
    icon: 'FileText',
    description: 'Required transcripts, letters, and credentials'
  },
  {
    id: 'entrance-exams',
    name: 'Entrance Exams',
    icon: 'GraduationCap',
    description: 'SAT, ACT, TOEFL, and score policies'
  },
  {
    id: 'fees-scholarships',
    name: 'Fees & Scholarships',
    icon: 'Coins',
    description: 'Tuition rates, FAFSA, and financial aid'
  },
  {
    id: 'hostel-accommodation',
    name: 'Housing & Hostels',
    icon: 'Home',
    description: 'Dorm availability, room types, and meal plans'
  },
  {
    id: 'course-selection',
    name: 'Courses & Majors',
    icon: 'BookOpen',
    description: 'Undecided majors, credits, and double majoring'
  },
  {
    id: 'admission-status',
    name: 'Decision & Waitlists',
    icon: 'CheckCircle2',
    description: 'Decision release dates, waitlist options, and enrollment deposit'
  },
  {
    id: 'contact-counseling',
    name: 'Contact & Visits',
    icon: 'PhoneCall',
    description: 'Counseling office, virtual tours, and student ambassadors'
  }
];

export const FAQS: FAQItem[] = [
  // 1. Application process & deadlines
  {
    id: 'faq-1',
    category: 'application-process',
    question: 'What is the application deadline for the upcoming academic year?',
    answer: 'The deadline for regular decision is January 15th for the Fall semester, and November 1st for the Spring semester. Early Decision (binding) applications must be submitted by November 1st, and Early Action (non-binding) applications are due by November 15th.',
    keywords: ['deadline', 'deadlines', 'date', 'dates', 'fall', 'spring', 'early', 'regular']
  },
  {
    id: 'faq-2',
    category: 'application-process',
    question: 'How do I apply for undergraduate admissions?',
    answer: 'You can apply online through our official admissions portal (portal.college.edu) or by using the Common Application. Simply register an account, fill out your biographical profile, upload your personal essays, select your majors of interest, and submit the $75 application fee.',
    keywords: ['apply', 'how', 'undergraduate', 'admissions', 'portal', 'common', 'app', 'register']
  },
  {
    id: 'faq-3',
    category: 'application-process',
    question: 'Is there an application fee, and how can I pay it or request a waiver?',
    answer: 'Yes, the undergraduate application fee is $75 for domestic students and $90 for international applicants. It is payable online via credit card, PayPal, or electronic check. If you have extreme financial hardship, you can request an application fee waiver through your high school counselor or directly on the Common Application.',
    keywords: ['fee', 'payment', 'cost', 'pay', 'waiver', 'waive', 'free', 'money']
  },
  {
    id: 'faq-4',
    category: 'application-process',
    question: 'Can I make changes to my application after it has been submitted?',
    answer: 'Once submitted, you cannot modify your core application or essays. However, you can upload updated transcripts, new test scores, and mid-year grades directly through your Applicant Portal dashboard, or contact the Admissions Office at admissions@college.edu to update crucial profile details.',
    keywords: ['change', 'edit', 'correct', 'update', 'modify', 'after', 'submitted', 'submission']
  },

  // 2. Eligibility & required documents
  {
    id: 'faq-5',
    category: 'eligibility-documents',
    question: 'What are the basic academic eligibility criteria for admission?',
    answer: 'Undergraduate applicants should have completed secondary school (high school) or equivalent. We look for a minimum cumulative unweighted GPA of 3.0 on a 4.0 scale. Core academic course preparation must include: 4 years of English, 3 years of Mathematics (algebra, geometry, advanced math), 3 years of Laboratory Sciences, and 3 years of Social Studies.',
    keywords: ['eligibility', 'eligible', 'requirements', 'gpa', 'criteria', 'minimum', 'high', 'school']
  },
  {
    id: 'faq-6',
    category: 'eligibility-documents',
    question: 'What supporting documents are required to complete my application?',
    answer: 'To make your application complete, we require: (1) Official High School Transcripts, (2) One school counselor recommendation letter, (3) Two letters of recommendation from core subject teachers, (4) A personal essay (statement of purpose), and (5) Proof of English language proficiency (for non-native English speakers). SAT/ACT scores are optional.',
    keywords: ['documents', 'required', 'supporting', 'transcripts', 'letters', 'recommendation', 'lor', 'sop', 'essay']
  },
  {
    id: 'faq-7',
    category: 'eligibility-documents',
    question: 'Do you require official translations for academic transcripts not in English?',
    answer: 'Yes, if your high school transcripts are in a language other than English, we require the official original transcripts along with a certified literal English translation. The translation must be completed by a recognized translating service (such as WES, ECE, or any verified educational translator).',
    keywords: ['translation', 'translations', 'translated', 'foreign', 'language', 'transcript', 'transcripts', 'wes']
  },
  {
    id: 'faq-8',
    category: 'eligibility-documents',
    question: 'How do I submit letters of recommendation?',
    answer: 'Your recommenders should submit their letters directly. If applying via the Common Application, you can invite them in the system to upload their files. Alternatively, they can email their letters directly to credentials@college.edu, ensuring they include your full name and Applicant ID.',
    keywords: ['recommendation', 'letter', 'letters', 'lor', 'submit', 'recommender', 'teacher', 'counselor']
  },

  // 3. Entrance exams / scores
  {
    id: 'faq-9',
    category: 'entrance-exams',
    question: 'Are SAT or ACT standardized test scores mandatory for admission?',
    answer: 'We are test-optional for the majority of our undergraduate programs. This means you do not have to submit SAT or ACT scores, and your application will not be at a disadvantage if you choose not to. If you choose to submit scores, we will consider them as part of our holistic evaluation process.',
    keywords: ['sat', 'act', 'scores', 'test', 'mandatory', 'optional', 'test-optional', 'require']
  },
  {
    id: 'faq-10',
    category: 'entrance-exams',
    question: 'What is the average SAT or ACT score of admitted students?',
    answer: 'For students who choose to submit standardized test scores, the middle 50% range of admitted applicants is generally 1320-1480 for the SAT and 28-33 for the ACT. Some competitive colleges (like Engineering or Computer Science) have higher median ranges.',
    keywords: ['average', 'score', 'scores', 'sat', 'act', 'percentile', 'gpa', 'cut-off']
  },
  {
    id: 'faq-11',
    category: 'entrance-exams',
    question: 'What English proficiency exams do you accept for international students, and what are the minimum scores?',
    answer: 'We accept several English proficiency tests: TOEFL iBT (minimum score 80, recommended 90), IELTS Academic (minimum band 6.5, recommended 7.0), Duolingo English Test (minimum 115, recommended 125), and Pearson PTE (minimum 58). This requirement is waived if your medium of instruction in secondary school was English.',
    keywords: ['english', 'proficiency', 'toefl', 'ielts', 'duolingo', 'det', 'pte', 'international', 'language']
  },

  // 4. Fees & financial aid/scholarships
  {
    id: 'faq-12',
    category: 'fees-scholarships',
    question: 'What is the tuition fee structure for undergraduate programs?',
    answer: 'For the current academic year, the estimated undergraduate tuition is $32,500 per year for in-state (resident) students and $46,200 per year for out-of-state and international students. Mandatory fees (for health services, student activities, and technology infrastructure) total approximately $2,400 annually.',
    keywords: ['tuition', 'fee', 'fees', 'cost', 'expensive', 'price', 'year', 'semester', 'charge']
  },
  {
    id: 'faq-13',
    category: 'fees-scholarships',
    question: 'Are there merit-based scholarships available, and how do I apply for them?',
    answer: 'Yes! We offer competitive merit scholarships ranging from $5,000 to $22,000 per year. All applicants are automatically screened for merit scholarships based on academic excellence, GPA, and extracurricular achievements shown in their standard application — no separate application form is required.',
    keywords: ['scholarship', 'scholarships', 'merit', 'free', 'money', 'award', 'grant', 'financial', 'academic']
  },
  {
    id: 'faq-14',
    category: 'fees-scholarships',
    question: 'How do I apply for need-based financial aid, and what is the deadline?',
    answer: 'To apply for federal and institutional need-based financial aid, domestic students must submit the FAFSA (Free Application for Federal Student Aid) and the CSS Profile. The priority filing deadline is March 1st. Financial aid packages are sent out shortly after admission letters.',
    keywords: ['fafsa', 'financial', 'aid', 'need-based', 'grants', 'loans', 'css', 'profile', 'apply', 'deadline']
  },
  {
    id: 'faq-15',
    category: 'fees-scholarships',
    question: 'Can international students apply for financial aid or scholarships?',
    answer: 'While international students are fully eligible for our merit-based scholarships (evaluated automatically at admission), we have very limited institutional need-based financial aid available for non-US citizens. International applicants must submit a Certificate of Finances showing they can cover non-sponsored educational costs.',
    keywords: ['international', 'financial', 'aid', 'scholarships', 'foreign', 'citizen', 'funding', 'support']
  },

  // 5. Hostel & accommodation
  {
    id: 'faq-16',
    category: 'hostel-accommodation',
    question: 'Is on-campus housing guaranteed for freshman students?',
    answer: 'Yes, on-campus housing is guaranteed for all first-year (freshman) undergraduate students. In fact, living on campus is mandatory for the first year to help students transition into the university community and access academic and social resources easily.',
    keywords: ['housing', 'hostel', 'hostels', 'dorm', 'dorms', 'dormitory', 'guaranteed', 'freshman', 'live', 'campus']
  },
  {
    id: 'faq-17',
    category: 'hostel-accommodation',
    question: 'What are the hostel/dormitory facilities and meal plans like?',
    answer: 'Our dorms offer high-speed Wi-Fi, fully furnished double and triple rooms, shared or semi-private bathrooms, laundry rooms, study lounges, and 24/7 front desk security. We offer three primary meal plans: Unlimited dining, 14-Meals-Per-Week, and a Flex-block plan, which can be used at various campus dining halls, food courts, and coffee shops.',
    keywords: ['facilities', 'meal', 'plan', 'plans', 'food', 'dining', 'laundry', 'room', 'wifi', 'eat']
  },
  {
    id: 'faq-18',
    category: 'hostel-accommodation',
    question: 'Can I choose my roommate or request a single room?',
    answer: 'Yes! Once you submit your enrollment deposit, you will get access to the Housing Portal. You can complete a compatibility questionnaire and either request a specific roommate by entering their ID, or use our digital roommate-matching tool. Single rooms are limited and assigned on a priority basis (often medical accommodations or seniority) for an additional fee.',
    keywords: ['roommate', 'choose', 'single', 'room', 'partner', 'select', 'privacy', 'request']
  },
  {
    id: 'faq-19',
    category: 'hostel-accommodation',
    question: 'Are hostels open during summer and winter breaks?',
    answer: 'Standard dorms close during the Winter and Summer breaks. However, we designate specific residence halls to remain open for students who need year-round housing (such as international students or student-workers). You must apply for break housing in advance, and a weekly rate will apply.',
    keywords: ['summer', 'winter', 'break', 'breaks', 'holidays', 'stay', 'open', 'closed', 'vacation']
  },

  // 6. Course/branch selection
  {
    id: 'faq-20',
    category: 'course-selection',
    question: 'Can I apply as an "undecided" or "undeclared" major?',
    answer: 'Yes, absolutely! You can apply to the College of Arts and Sciences as "Undecided" or "Undeclared". You will be paired with a specialized freshman advisor who will help you explore your interests. You do not have to officially declare your major until the end of your sophomore (second) year.',
    keywords: ['undecided', 'undeclared', 'major', 'choice', 'select', 'explore', 'course', 'program']
  },
  {
    id: 'faq-21',
    category: 'course-selection',
    question: 'How easy is it to change my major or pursue a double major?',
    answer: 'Changing majors within the same department or college is relatively straightforward after consulting your academic advisor. If you wish to switch to a different college (e.g., from Humanities to Engineering), you must meet internal GPA and prerequisite course requirements. Double majoring is encouraged and possible with planning, provided you maintain good academic standing.',
    keywords: ['change', 'switch', 'double', 'major', 'majors', 'branch', 'transfer', 'difficulty', 'easy']
  },
  {
    id: 'faq-22',
    category: 'course-selection',
    question: 'Do you offer minor programs, and how many credits do they require?',
    answer: 'Yes, we offer over 75 minors across various fields. A minor program typically requires 15 to 21 credits of specialized coursework. It is a great way to gain complementary skills or explore a personal interest without committing to a full major curriculum.',
    keywords: ['minor', 'minors', 'credits', 'credit', 'course', 'complementary', 'options']
  },

  // 7. Admission status & results
  {
    id: 'faq-23',
    category: 'admission-status',
    question: 'How and when will I receive my admission decision?',
    answer: 'Early Decision decisions are posted in mid-December. Regular Decision and Early Action decisions are released in late March. All decisions are posted on your digital Applicant Portal first. We also send an official physical packet with details about scholarships and enrollment steps via mail shortly after.',
    keywords: ['when', 'how', 'receive', 'decision', 'result', 'results', 'admitted', 'accept', 'letter', 'date']
  },
  {
    id: 'faq-24',
    category: 'admission-status',
    question: 'What does it mean to be waitlisted, and how can I increase my chances of getting in?',
    answer: 'Being waitlisted means you meet our credentials but we ran out of space in our incoming class. To be considered if space opens, you must log in to your Applicant Portal and opt-in to the waitlist by May 1. You can write a Letter of Continued Interest (LOCI) to update us on your spring semester achievements or grades.',
    keywords: ['waitlist', 'waitlisted', 'chance', 'chances', 'accept', 'loci', 'interest', 'spots', 'space']
  },
  {
    id: 'faq-25',
    category: 'admission-status',
    question: 'If accepted, what are the next steps to secure my spot?',
    answer: 'Congratulations! To secure your spot, you must submit a $500 non-refundable enrollment deposit through your Applicant Portal by May 1st (National Candidates Reply Date). After depositing, you will receive links to complete your housing application, register for summer orientation, and submit final high school transcripts.',
    keywords: ['accepted', 'admitted', 'next', 'steps', 'secure', 'spot', 'deposit', 'enrollment', 'may', 'congratulations']
  },

  // 8. Contact/counseling info
  {
    id: 'faq-26',
    category: 'contact-counseling',
    question: 'How can I contact the Admissions Office for individual counseling?',
    answer: 'You can contact us via email at admissions@college.edu or call our helpline at (555) 019-2834, Monday through Friday from 9:00 AM to 5:00 PM. We also offer 1-on-1 virtual counseling appointments that you can schedule on our portal, and daily Zoom drop-in hours from 2:00 PM to 4:00 PM EST.',
    keywords: ['contact', 'email', 'phone', 'call', 'counseling', 'admissions', 'office', 'help', 'zoom', 'appointment']
  },
  {
    id: 'faq-27',
    category: 'contact-counseling',
    question: 'Are there in-person campus tours or virtual visits available?',
    answer: 'Yes! Guided student tours are offered twice daily from Monday to Saturday, departing from our Welcome Center. If you cannot visit in person, we have a fully interactive 360-degree virtual tour and weekly student-led webinars. You can register for both virtual and in-person visits on our website under "Visit Campus".',
    keywords: ['tour', 'tours', 'visit', 'campus', 'virtual', 'welcome', 'center', 'register', 'visit', 'see']
  },
  {
    id: 'faq-28',
    category: 'contact-counseling',
    question: 'Can I connect with a current student to learn more about student life?',
    answer: 'Absolutely! Our "Ask an Ambassador" program lets you search and filter current students by major, home state, or extracurricular interests. You can view their profiles and email them directly to ask about dorm life, academics, or campus culture. Visit studentlife.college.edu to get started.',
    keywords: ['student', 'students', 'life', 'ambassador', 'ask', 'current', 'chat', 'experience', 'club', 'clubs']
  }
];

export const STOPWORDS = new Set([
  'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've", "you'll", "you'd",
  'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers',
  'herself', 'it', "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which',
  'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been',
  'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if',
  'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between',
  'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out',
  'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why',
  'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not',
  'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should',
  "should've", 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't",
  'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't",
  'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't",
  'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't", 'please', 'tell', 'want', 'get',
  'know', 'find', 'like', 'how'
]);
