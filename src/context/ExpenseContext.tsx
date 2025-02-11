import React, { createContext, useContext, useState, useEffect } from "react";
import { Expense, ExpenseContextType } from "../types/expense";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider = ({ children }: { children: React.ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const { toast } = useToast();

  const fetchExpenses = async (date: Date) => {
    try {
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .gte('date', startOfMonth.toISOString())
        .lte('date', endOfMonth.toISOString())
        .order('date', { ascending: false });

      if (error) throw error;

      // Convert dates to local timezone
      const transformedData = data.map(expense => {
        const localDate = new Date(expense.date);
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const adjustedDate = new Date(localDate.toLocaleString('en-US', { timeZone: userTimeZone }));

        return {
          ...expense,
          date: adjustedDate, // Return adjusted date directly
        };
      });

      setExpenses(transformedData);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los gastos.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchExpenses(currentDate);
  }, [currentDate]);

  const addExpense = async (expense: Omit<Expense, "id" | "created_at">) => {
    try {
      const { data, error } = await supabase
        .from('expenses')
        .insert([expense])
        .select()
        .single();

      if (error) throw error;

      const newExpense = data as Expense;
      setExpenses(prev => [...prev, newExpense]);

      // Actualizar currentDate si es necesario
      setCurrentDate(new Date(newExpense.date)); // Asumiendo que expense.date es la fecha del gasto

      // Llamar a fetchExpenses para obtener los gastos del mes correcto
      fetchExpenses(new Date(newExpense.date));

      toast({
        title: "Gasto agregado",
        description: "El gasto ha sido agregado exitosamente."
      });
    } catch (error) {
      console.error('Error adding expense:', error);
      toast({
        title: "Error",
        description: "No se pudo agregar el gasto.",
        variant: "destructive"
      });
    }
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const editExpense = (expense: Expense) => {
    setExpenses(prev => prev.map(e => e.id === expense.id ? expense : e));
  };

  return (
    <ExpenseContext.Provider value={{ 
      expenses, 
      setExpenses, 
      addExpense, 
      deleteExpense, 
      editExpense,
      currentDate,
      setCurrentDate,
      fetchExpenses
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }
  return context;
};