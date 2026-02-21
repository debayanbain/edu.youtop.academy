export interface Note {
  id: string;
  title: string;
  class: string;
  subject: string;
  price: number;
  originalPrice: number;
  author: string;
  pages: number;
  coverImage: string;
  description: string;
  features: string[];
}

export const notesStore: Note[] = [
  {
    id: "note-class12-physics",
    title: "Class 12 Physics Complete Notes (NCERT)",
    class: "12",
    subject: "Physics",
    price: 199,
    originalPrice: 499,
    author: "YouTop Academy",
    pages: 350,
    coverImage:
      "https://m.media-amazon.com/images/I/81+uN3dCABL._AC_UF1000,1000_QL80_.jpg",
    description:
      "Master Class 12 Physics with our comprehensive handwritten notes based strictly on the latest NCERT syllabus. Includes derivations, important formulae, and previous year questions. Perfect for board exams and JEE/NEET preparation.",
    features: [
      "100% NCERT Coverage",
      "Chapter-wise Important Formula Sheet",
      "10 Years PYQ Solutions Included",
      "Clear Diagrams and Derivations",
      "Printable PDF Format",
    ],
  },
  {
    id: "note-class12-chemistry",
    title: "Class 12 Chemistry Quick Revision",
    class: "12",
    subject: "Chemistry",
    price: 149,
    originalPrice: 299,
    author: "YouTop Academy",
    pages: 280,
    coverImage:
      "https://m.media-amazon.com/images/I/71EbahdYuWL._AC_UF1000,1000_QL80_.jpg",
    description:
      "Complete Chemistry revision notes encompassing Physical, Organic, and Inorganic Chemistry. Features mnemonic tricks for periodic table and named reactions in organic chemistry.",
    features: [
      "All Named Reactions Sheet",
      "Physical Chemistry Formula Book",
      "Inorganic Trends Visualized",
      "Mnemonic Tricks Included",
    ],
  },
  {
    id: "note-class11-maths",
    title: "Class 11 Mathematics Master Guide",
    class: "11",
    subject: "Mathematics",
    price: 199,
    originalPrice: 399,
    author: "YouTop Academy",
    pages: 420,
    coverImage:
      "https://m.media-amazon.com/images/I/918O3XZAW9L.jpg",
    description:
      "Dive deep into Class 11 Mathematics. Step-by-step solved examples, shortcut methods for objective questions, and clear conceptual explanations for topics like Calculus and Conic Sections.",
    features: [
      "Step-by-step Standard Solutions",
      "Shortcut Tricks for JEE",
      "Chapter-wise Practice Questions",
      "Mind Maps for Quick Recall",
    ],
  },
  {
    id: "note-class10-science",
    title: "Class 10 Science Toppers Notes",
    class: "10",
    subject: "Science",
    price: 99,
    originalPrice: 249,
    author: "YouTop Academy",
    pages: 210,
    coverImage:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop",
    description:
      "Score 95%+ in Class 10 Science Boards. These notes simplify complex scientific concepts with real-world examples, colourful diagrams, and concise summaries.",
    features: [
      "Strictly NCERT Based",
      "Coloured Diagrams",
      "Board Exam Answer Writing Tips",
      "Important Activities Explained",
    ],
  },
  {
    id: "note-class10-sst",
    title: "Class 10 Social Science Simplified",
    class: "10",
    subject: "Social Science",
    price: 99,
    originalPrice: 199,
    author: "YouTop Academy",
    pages: 250,
    coverImage:
      "https://m.media-amazon.com/images/I/61-m5MRi+gL._AC_UF1000,1000_QL80_.jpg",
    description:
      "History dates got you confused? Civics chapters feeling too long? Our SST notes bring you flowcharts, timelines, and point-wise answers to make memorization easy.",
    features: [
      "Historical Timelines Included",
      "Map Work Pointing Guide",
      "Point-wise Answers for 3/5 Marker",
      "Easy Flowcharts",
    ],
  },
  {
    id: "note-class9-maths",
    title: "Class 9 Mathematics Basics to Pro",
    class: "9",
    subject: "Mathematics",
    price: 89,
    originalPrice: 199,
    author: "YouTop Academy",
    pages: 180,
    coverImage:
      "https://m.media-amazon.com/images/I/918O3XZAW9L.jpg",
    description:
      "Build a strong foundation in Mathematics. These notes cover every concept of Class 9 Maths clearly, paving the way for your higher secondary classes.",
    features: [
      "Foundation Level Concepts",
      "Easy to Understand Language",
      "Lots of Practice Problems",
      "Formula Cheat Sheet",
    ],
  },
  {
    id: "note-class8-all",
    title: "Class 8 All Subjects Combo",
    class: "8",
    subject: "All Subjects",
    price: 249,
    originalPrice: 599,
    author: "YouTop Academy",
    pages: 600,
    coverImage:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
    description:
      "A complete bundle for Class 8 students. Covers Science, Maths, Social Science, and English grammar in an engaging and easy-to-read format.",
    features: [
      "4 Subjects in 1 Bundle",
      "Interactive Learning Format",
      "Grammar Rules Simplified",
      "Science Experiments Explained",
    ],
  },
  {
    id: "note-class7-science",
    title: "Class 7 Science Explorer",
    class: "7",
    subject: "Science",
    price: 59,
    originalPrice: 149,
    author: "YouTop Academy",
    pages: 120,
    coverImage:
      "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?q=80&w=800&auto=format&fit=crop",
    description:
      "Explore the fascinating world of science. Perfectly crafted for Class 7 students with lots of illustrations to keep learning fun.",
    features: ["Fun Illustrations", "Simple Language", "Quick Chapter Recaps"],
  },
  {
    id: "note-class6-maths",
    title: "Class 6 Maths Starter Pack",
    class: "6",
    subject: "Mathematics",
    price: 59,
    originalPrice: 129,
    author: "YouTop Academy",
    pages: 100,
    coverImage:
      "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=800&auto=format&fit=crop",
    description:
      "Transitioning to middle school maths is easy with this starter pack. Covers fractions, decimals, algebra basics, and geometry clearly.",
    features: [
      "Basic Algebra Introduced Simply",
      "Visual Geometry",
      "Step-by-step methods",
    ],
  },
  {
    id: "note-class5-all",
    title: "Class 5 Super Learner Bundle",
    class: "5",
    subject: "All Subjects",
    price: 149,
    originalPrice: 399,
    author: "YouTop Academy",
    pages: 300,
    coverImage:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop",
    description:
      "The ultimate study companion for 5th graders. Colorful, engaging, and covering EVS, Maths, and English perfectly to ensure strong basics.",
    features: [
      "Highly Visual Content",
      "Story-based Learning",
      "EVS Concepts Simplified",
      "Basic Grammar",
    ],
  },
];

export const getSubjects = () => {
  const subjects = new Set<string>();
  notesStore.forEach((note) => subjects.add(note.subject));
  return Array.from(subjects).sort();
};

export const getClasses = () => {
  const classes = new Set<string>();
  notesStore.forEach((note) => classes.add(note.class));
  return Array.from(classes).sort((a, b) => parseInt(b) - parseInt(a)); // Descending: 12, 11, 10...
};
