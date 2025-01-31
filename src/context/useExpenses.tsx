import { useContext } from "react";
import { ExpenseContext } from "./expenseContextConstants";
import type { ExpenseContextType } from "@/types/expense";

export const useExpenses = (): ExpenseContextType => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }
  return context;
};
