import { useState } from "react";
import { useExpenses } from "@/context/useExpenses";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { NewExpense } from "@/types/expense";

// Add type declaration for window
declare global {
  interface FileSystemFileHandle {
    getFile(): Promise<File>;
  }
  
  interface Window {
    showOpenFilePicker(): Promise<FileSystemFileHandle[]>;
  }
}

export const useExpenseForm = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [costCenter, setCostCenter] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { addExpense, costCenters } = useExpenses();
  const { toast } = useToast();
  const [ddiCode, setDDICode] = useState({
    part1: "",
    part2: "",
    part3: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDDIInputChange = (
    part: 'part1' | 'part2' | 'part3',
    value: string
  ) => {
    const maxLength = part === 'part2' ? 4 : 3;
    const sanitizedValue = value.replace(/\D/g, '').slice(0, maxLength);

    setDDICode(prev => ({
      ...prev,
      [part]: sanitizedValue
    }));

    // Auto-focus next input if current is filled
    if (sanitizedValue.length === maxLength) {
      const nextPart = {
        part1: 'part2',
        part2: 'part3',
        part3: null
      }[part];

      if (nextPart) {
        const nextInput = document.querySelector(`input[name=ddi-${nextPart}]`);
        if (nextInput) {
          (nextInput as HTMLInputElement).focus();
        }
      }
    }
  };

  const handleCostCenterChange = (value: string) => {
    setCostCenter(value);
  };

  const uploadImage = async (imageData: string, expenseId: string): Promise<boolean> => {
    try {
      const { error: uploadError } = await supabase.storage
        .from('receipts')
        .upload(`${expenseId}.jpg`, imageData, {
          contentType: 'image/jpeg',
          upsert: true
        });

      if (uploadError) throw uploadError;

      return true;
    } catch (error) {
      console.error('Error uploading image:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!amount || !description || !costCenter) {
        toast({
          title: "Error",
          description: "Por favor completa todos los campos requeridos",
          variant: "destructive",
        });
        return;
      }

      const newExpense: NewExpense = {
        amount: Number(amount),
        costCenter,
        date: new Date(),
        ddiCode: ddiCode.part1 + ddiCode.part2 + ddiCode.part3,
        description,
        hasReceipt: false,
      };

      await addExpense(newExpense);

      // Reset form
      setDescription("");
      setAmount("");
      setCostCenter("");
      setDDICode({ part1: "", part2: "", part3: "" });
      setSelectedImage(null);

      toast({
        title: "¡Éxito!",
        description: "Gasto agregado correctamente",
      });
    } catch (error) {
      console.error('Error submitting expense:', error);
      toast({
        title: "Error",
        description: "No se pudo agregar el gasto",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    description,
    setDescription,
    amount,
    setAmount,
    costCenter,
    setCostCenter,
    selectedImage,
    setSelectedImage,
    ddiCode,
    isSubmitting,
    costCenters,
    handleDDIInputChange,
    handleCostCenterChange,
    handleSubmit,
  };
};