import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useExpenseStorage = () => {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const handleViewImage = async (expenseId: string) => {
    try {
      setIsLoadingImage(true);
      setSelectedImage(null);

      // Obtener la URL pública directamente
      const { data: urlData } = supabase
        .storage
        .from('receipts')
        .getPublicUrl(`receipt-${expenseId}.jpg`);

      if (!urlData.publicUrl) {
        throw new Error('Error al obtener la URL de la imagen');
      }

      // Verificar si la imagen existe haciendo una petición HEAD
      const response = await fetch(urlData.publicUrl, { method: 'HEAD' });
      if (!response.ok) {
        throw new Error('No se encontró la imagen para este gasto');
      }

      setSelectedImage(urlData.publicUrl);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al cargar la imagen",
        variant: "destructive",
      });
      setSelectedImage(null);
    } finally {
      setIsLoadingImage(false);
    }
  };

  return {
    selectedImage,
    isLoadingImage,
    handleViewImage,
  };
};