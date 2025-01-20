import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CameraDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: () => void;
  videoRef: React.RefObject<HTMLVideoElement>;
}

export const CameraDialog = ({ isOpen, onClose, onCapture, videoRef }: CameraDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] sm:max-h-[90vh] p-4 flex flex-col">
        <DialogHeader className="mb-2">
          <DialogTitle>Capturar Factura</DialogTitle>
        </DialogHeader>
        <div className="relative flex-1 flex items-center justify-center bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
            <Button
              onClick={onCapture}
              className="w-full max-w-[200px] mx-auto block bg-green-600 hover:bg-green-700"
            >
              Capturar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};