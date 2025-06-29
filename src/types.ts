export interface Todo {
  _id: string;
  user?:string;
  text: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TodoList {
  _id: string;
  name: string;
  todos: Todo[];
}

export interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: string;
}

export interface Income {
  _id: string;
  title: string;
  amount: number;
  locked: boolean;
}