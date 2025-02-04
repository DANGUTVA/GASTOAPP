import { useContext } from 'react';
import { ExpenseContext } from '@/context/ExpenseContext';

const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }
  return context;
};

export { useExpenses } from '../useExpenses';
