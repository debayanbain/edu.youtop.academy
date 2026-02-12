import { Update, Book } from "./types";

export const LATEST_UPDATES: Update[] = [
  {
    id: 1,
    title: "Madhyamik 2026 Exam Schedule Released by WBBSE",
    type: "Exam",
    date: "Feb 10",
  },
  {
    id: 2,
    title: "WB Govt Announces 5,000 New Teaching Positions",
    type: "Job",
    date: "Feb 8",
  },
  {
    id: 3,
    title: "HS 2025 Final Results Published — Check Now",
    type: "Result",
    date: "Feb 5",
  },
  {
    id: 4,
    title: "SVMCM Scholarship Application Deadline Extended",
    type: "Exam",
    date: "Feb 3",
  },
];

export const MOCK_BOOKS: Book[] = [
  {
    id: 1,
    title: "Madhyamik All-in-One Guide 2026",
    author: "YouTOP Academy",
    price: 199,
    originalPrice: 499,
    tag: "Best Seller",
    coverColor: "bg-gradient-to-br from-purple-500 to-indigo-600",
    imageLink: "/images/hs.png"
  },
  {
    id: 2,
    title: "HS Physics Super Notes",
    author: "YouTOP Academy",
    price: 149,
    originalPrice: 399,
    tag: "New",
    coverColor: "bg-gradient-to-br from-amber-400 to-orange-500",
    imageLink: "/images/mh.png"
  },
  {
    id: 3,
    title: "Bengali Grammar Complete Guide",
    author: "YouTOP Academy",
    price: 99,
    originalPrice: 299,
    tag: "Popular",
    coverColor: "bg-gradient-to-br from-emerald-400 to-teal-600",
  },
  {
    id: 4,
    title: "Mathematics Problem Bank",
    author: "YouTOP Academy",
    price: 179,
    originalPrice: 449,
    tag: "Trending",
    coverColor: "bg-gradient-to-br from-pink-400 to-rose-600",
  },
];
