import { ExpenseTable } from "./expense/ExpenseTable";
import { ExpenseDetailsDialog } from "./expense/ExpenseDetailsDialog";
import { EditExpenseDialog } from "./expense/EditExpenseDialog";
import { useExpenseList } from "./expense/hooks/useExpenseList";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
  margin: '16px',
  transition: '0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
  },
});

const useStyles = {
  title: {
    fontWeight: 'bold',
    color: '#3f51b5',
  },
  content: {
    fontSize: '1rem',
    color: '#555',
  },
};

export const ExpenseList = () => {
  const {
    expenses,
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
    costCenters,
    selectedCostCenter,
    setSelectedCostCenter
  } = useExpenseList();

  const [searchTerm, setSearchTerm] = useState('');

  const filteredExpenses = expenses.filter(expense =>
    expense.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="text-center py-4">Cargando gastos...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Lista de Gastos</h2>
        <div className="w-full max-w-xs">
          <Select
            value={selectedCostCenter}
            onValueChange={setSelectedCostCenter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por centro de costo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Todos</SelectItem>
                {costCenters.map((center) => (
                  <SelectItem key={center} value={center}>
                    {center}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="p-4">
        <input
          type="text"
          placeholder="Buscar gastos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <div className="grid grid-cols-1 gap-4">
          {filteredExpenses.map(expense => (
            <StyledCard key={expense.id}>
              <CardContent>
                <Typography sx={useStyles.title}>{expense.description}</Typography>
                <Typography sx={useStyles.content}>Monto: ₡{expense.amount}</Typography>
                <Typography sx={useStyles.content}>Fecha: {new Date(expense.date).toLocaleDateString()}</Typography>
                <Typography sx={useStyles.content}>Centro de Costo: {expense.costCenter}</Typography>
                <Typography sx={useStyles.content}>Código DDI: {expense.ddiCode}</Typography>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(expense)} className="mr-0">
                    <FaEdit className="text-blue-500" />
                  </button>
                  <button onClick={() => handleDelete(expense.id)} className="mr-0">
                    <FaTrashAlt className="text-red-500" />
                  </button>
                  <button onClick={() => handleViewDetails(expense)} className="mr-0">
                    <FaEye className="text-gray-500" />
                  </button>
                </div>
              </CardContent>
            </StyledCard>
          ))}
        </div>
      </div>

      <EditExpenseDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        expense={editingExpense}
        onSave={handleSaveEdit}
        costCenters={costCenters}
      />

      <ExpenseDetailsDialog
        isOpen={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
        expense={selectedExpense}
        imageUrl={selectedImage}
        isLoading={isLoadingImage}
      />
    </div>
  );
};