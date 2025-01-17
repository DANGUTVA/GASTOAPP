import { useState } from "react";
import { useExpenseCRUD } from "./useExpenseCRUD";
import { useExpenseStorage } from "./useExpenseStorage";
import { Expense } from "@/types/expense";

export const useExpenseList = () => {
  const {
    expenses,
    isLoading,
    isEditDialogOpen,
    setIsEditDialogOpen,
    editingExpense,
    handleDelete,
    handleEdit,
    handleSaveEdit
  } = useExpenseCRUD();

  const {
    isImageDialogOpen,
    setIsImageDialogOpen,
    selectedImage,
    isLoadingImage,
    handleViewImage
  } = useExpenseStorage();

  const [selectedCostCenter, setSelectedCostCenter] = useState<string>("all");
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState<boolean>(false);

  const handleViewDetails = async (expense: Expense) => {
    setSelectedExpense(expense);
    setIsDetailsDialogOpen(true);
    if (expense.hasReceipt) {
      await handleViewImage(expense.id);
    }
  };

  const filteredExpenses = selectedCostCenter === "all"
    ? expenses
    : expenses.filter(expense => expense.costCenter === selectedCostCenter);

  const uniqueCostCenters = Array.from(new Set(expenses.map(expense => expense.costCenter)));

  return {
    expenses: filteredExpenses,
    isLoading,
    isEditDialogOpen,
    setIsEditDialogOpen,
    editingExpense,
    isDetailsDialogOpen,
    setIsDetailsDialogOpen,
    selectedImage,
    isLoadingImage,
    selectedExpense,
    handleDelete,
    handleEdit,
    handleSaveEdit,
    handleViewDetails,
    costCenters: uniqueCostCenters,
    selectedCostCenter,
    setSelectedCostCenter
  };
};