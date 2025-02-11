import { ExpenseTable } from "./expense/ExpenseTable";
import { ExpenseDetailsDialog } from "./expense/ExpenseDetailsDialog";
import { EditExpenseDialog } from "./expense/EditExpenseDialog";
import { useExpenseList } from "./expense/hooks/useExpenseList";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
      
      <ExpenseTable
        expenses={expenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onViewDetails={handleViewDetails}
      />

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