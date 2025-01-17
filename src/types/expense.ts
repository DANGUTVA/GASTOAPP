export interface Expense {
  id: string;
  date: string;
  description: string;
  costCenter: string;
  amount: number;
  ddiCode: string;
  created_at?: string;
}

export interface ExpenseContextType {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  addExpense: (expense: Omit<Expense, "id" | "created_at">) => void;
  deleteExpense: (id: string) => void;
  editExpense: (expense: Expense) => void;
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  fetchExpenses: (date: Date) => Promise<void>;
}