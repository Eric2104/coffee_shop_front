import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react";

interface MessageError {
    titulo: string;
    descripcion: string;
}

interface DialogErrorsProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void; // Añadido para actualizar el estado desde el componente padre
    messageError: MessageError[];
}

const DialogErrors = ({ isOpen, setIsOpen, messageError }: DialogErrorsProps) => {
    const [open, setOpen] = useState(isOpen);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) {
            setIsOpen(false); // Actualiza el estado en el componente padre cuando el diálogo se cierra
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent>
                {messageError.map((error, index) => (
                    <DialogHeader key={index}>
                        <DialogTitle>{error.titulo}</DialogTitle>
                        <DialogDescription>{error.descripcion}</DialogDescription>
                    </DialogHeader>
                ))}
            </DialogContent>
        </Dialog>
    );
}

export default DialogErrors;