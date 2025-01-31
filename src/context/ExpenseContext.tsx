import { useContext, useState, useEffect, useCallback } from "react";
import { Expense, ExpenseContextType, NewExpense, DBExpense } from "@/types/expense";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  fetchExpensesFromDB, 
  fetchCostCentersFromDB, 
  convertToDBExpense,
  convertToExpense 
} from "./expenseUtils";
import { ExpenseContext } from "./expenseContextConstants";

export const ExpenseProvider = ({ children }: { children: React.ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [costCenters, setCostCenters] = useState<string[]>([]);
  const { toast } = useToast();

  const fetchExpenses = useCallback(async (date: Date) => {
    try {
      const data = await fetchExpensesFromDB(date);
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los gastos",
        variant: "destructive",
      });
    }
  }, [toast]);

  const fetchCostCenters = useCallback(async () => {
    try {
      const centers = await fetchCostCentersFromDB();
      setCostCenters(centers);
    } catch (error) {
      console.error('Error fetching cost centers:', error);
    }
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      await fetchExpenses(currentDate);
      await fetchCostCenters();
    };
    loadInitialData();
  }, [currentDate, fetchExpenses, fetchCostCenters]);

  const addCostCenter = (newCostCenter: string) => {
    if (!costCenters.includes(newCostCenter)) {
      setCostCenters(prev => [...prev, newCostCenter]);
    }
  };

  const addExpense = async (expense: NewExpense) => {
    try {
      const dbExpense: DBExpense = {
        ...expense,
        id: crypto.randomUUID(),
        hasReceipt: false,
        date: new Date(expense.date).toISOString().split('T')[0],
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('expenses')
        .insert([dbExpense])
        .select()
        .single();

      if (error) throw error;

      const newExpense = convertToExpense(data as DBExpense);
      setExpenses(prev => [...prev, newExpense]);
      
      toast({
        title: "Éxito",
        description: "Gasto agregado correctamente",
      });
    } catch (error) {
      console.error('Error adding expense:', error);
      toast({
        title: "Error",
        description: "No se pudo agregar el gasto",
        variant: "destructive",
      });
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setExpenses(prev => prev.filter(e => e.id !== id));
      toast({
        title: "Éxito",
        description: "Gasto eliminado correctamente",
      });
    } catch (error) {
      console.error('Error deleting expense:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el gasto",
        variant: "destructive",
      });
    }
  };

  const editExpense = async (expense: Expense) => {
    try {
      const dbExpense: DBExpense = {
        ...expense,
        date: expense.date.toISOString().split('T')[0]
      };

      const { error } = await supabase
        .from('expenses')
        .update(dbExpense)
        .eq('id', expense.id);

      if (error) throw error;

      setExpenses(prev => prev.map(e => e.id === expense.id ? expense : e));
      toast({
        title: "Éxito",
        description: "Gasto actualizado correctamente",
      });
    } catch (error) {
      console.error('Error updating expense:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el gasto",
        variant: "destructive",
      });
    }
  };

  const value: ExpenseContextType = {
    expenses,
    setExpenses,
    addExpense,
    deleteExpense,
    editExpense,
    currentDate,
    setCurrentDate,
    fetchExpenses,
    costCenters,
    addCostCenter,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};

// Eliminado useExpenses para mejorar Fast Refresh