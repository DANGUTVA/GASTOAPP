// Tipo para la base de datos
export interface DBExpense {
  id: string;
  description: string | null;
  amount: number;
  costCenter: string;
  date: string;
  ddiCode: string | null;
  created_at?: string;
}

// Tipo para la aplicación
export interface Expense {
  id: string;
  description: string;
  amount: number;
  costCenter: string;
  date: Date;
  ddiCode: string;
  hasReceipt: boolean;
  created_at?: string;
}

export type NewExpense = Omit<Expense, "id" | "created_at"> & {
  date: Date;
};

export type ExpenseContextType = {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  addExpense: (expense: NewExpense) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  editExpense: (expense: Expense) => Promise<void>;
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  fetchExpenses: (date: Date) => Promise<void>;
  costCenters: string[];
  addCostCenter: (newCostCenter: string) => void;
};