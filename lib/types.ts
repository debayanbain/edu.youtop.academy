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
  imageLink?: string;
  class: string;
  subject: string;
  description?: string;
  isOwned?: boolean;
}

export interface Feature {
  label: string;
  color: string;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiData<T> {
  id: number;
  attributes: T;
}

export interface Order {
  id: number;
  userId: string;
  orderId: string;
  paymentId?: string;
  amount: number;
  status: 'pending' | 'success' | 'failed';
  productType: string;
  productId: string;
  createdAt: string;
}
