export interface Update {
  id: number;
  title: string;
  type: "Exam" | "Job" | "Result";
  date: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  originalPrice: number;
  tag: string;
  coverColor: string;
  imageLink?: string
}

export interface Feature {
  label: string;
  color: string;
}
