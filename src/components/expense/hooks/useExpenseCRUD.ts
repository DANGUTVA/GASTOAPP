import { useState, useEffect } from "react";
import { useExpenses } from "@/context/useExpenses";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Expense, DBExpense } from "@/types/expense";

// Convert database expense to application expense
const convertToExpense = (dbExpense: DBExpense): Expense => ({
  ...dbExpense,
  date: new Date(dbExpense.date),
  description: dbExpense.description || "",
  ddiCode: dbExpense.ddiCode || "",
  hasReceipt: false // This will be updated when checking receipt existence
});

// Convert application expense to database expense
const convertToDBExpense = (expense: Expense): DBExpense => ({
  id: expense.id,
  description: expense.description || null,
  amount: expense.amount,
  costCenter: expense.costCenter,
  date: expense.date.toISOString(),
  ddiCode: expense.ddiCode || null
});

export const useExpenseCRUD = () => {
  const { expenses, setExpenses, deleteExpense, editExpense, currentDate } = useExpenses();
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        // Calcular el primer y último día del mes seleccionado
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        const { data, error } = await supabase
          .from('expenses')
          .select('*')
          .gte('date', startOfMonth.toISOString())
          .lte('date', endOfMonth.toISOString())
          .order('date', { ascending: false });

        if (error) throw error;

        // Convert and check receipts
        const expensesWithReceiptStatus = await Promise.all(
          (data as DBExpense[]).map(async (dbExpense) => {
            const expense = convertToExpense(dbExpense);
            try {
              const { data: fileData, error: fileError } = await supabase
                .storage
                .from('receipts')
                .download(`receipt-${expense.id}.jpg`);

              return {
                ...expense,
                hasReceipt: !fileError && fileData !== null
              };
            } catch {
              return expense;
            }
          })
        );

        setExpenses(expensesWithReceiptStatus);
      } catch (error) {
        console.error('Error fetching expenses:', error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los gastos",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpenses();
  }, [setExpenses, toast, currentDate]); // Agregamos currentDate como dependencia

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este gasto?");
    if (!confirmDelete) return;

    try {
      await supabase.storage
        .from('receipts')
        .remove([`receipt-${id}.jpg`]);

      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id);

      if (error) throw error;

      deleteExpense(id);
      toast({
        title: "Gasto eliminado",
        description: "El gasto ha sido eliminado exitosamente"
      });
    } catch (error) {
      console.error('Error deleting expense:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el gasto",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async (updatedExpense: Expense) => {
    if (isNaN(updatedExpense.date.getTime())) {
      toast({
        title: "Error",
        description: "Fecha no válida",
        variant: "destructive"
      });
      return;
    }

    try {
      const dbExpense = convertToDBExpense(updatedExpense);
      const { id, created_at, hasReceipt, ...payload } = dbExpense;
      const { error } = await supabase
        .from('expenses')
        .update(payload)
        .eq('id', updatedExpense.id);

      if (error) throw error;

      editExpense(updatedExpense);
      setIsEditDialogOpen(false);
      toast({
        title: "Gasto actualizado",
        description: "El gasto ha sido actualizado exitosamente"
      });
    } catch (error) {
      console.error('Error updating expense:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el gasto",
        variant: "destructive"
      });
    }
  };

  return {
    expenses,
    isLoading,
    isEditDialogOpen,
    setIsEditDialogOpen,
    editingExpense,
    handleDelete,
    handleEdit,
    handleSaveEdit
  };
};