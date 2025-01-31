import { Expense, DBExpense } from "@/types/expense";
import { supabase } from "@/integrations/supabase/client";

export const fetchExpensesFromDB = async (date: Date) => {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('date', date.toISOString().split('T')[0]);

  if (error) throw error;

  const dbExpenses = data as DBExpense[];
  return dbExpenses.map(dbExpense => ({
    ...dbExpense,
    date: new Date(dbExpense.date),
    description: dbExpense.description || '',
    ddiCode: dbExpense.ddiCode || '',
  })) as Expense[];
};

export const fetchCostCentersFromDB = async () => {
  const { data, error } = await supabase
    .from('expenses')
    .select('costCenter')
    .not('costCenter', 'is', null);

  if (error) throw error;

  return Array.from(new Set(data.map(item => item.costCenter)));
};

export const convertToDBExpense = (expense: Expense): DBExpense => {
  return {
    ...expense,
    date: expense.date.toISOString(),
    description: expense.description,
    ddiCode: expense.ddiCode,
    hasReceipt: expense.hasReceipt,
    created_at: expense.created_at
  };
};

export const convertToExpense = (dbExpense: DBExpense): Expense => {
  return {
    ...dbExpense,
    date: new Date(dbExpense.date),
    description: dbExpense.description || '',
    ddiCode: dbExpense.ddiCode || '',
  };
};
