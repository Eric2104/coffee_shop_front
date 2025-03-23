'use client'
import { useGetCoffee } from "@/api/getCoffe";
import { useGetOriginById } from "@/api/getOriginById";
import DialogErrors from "@/components/dialog-errors";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast"


interface Origin {
    id?: number;
    nameOrigin: string;
}

const AddOrigin = () => {
    const { idCoffee } = useParams();
    const router = useRouter();
    const { error, loading, result }: { error: any, loading: boolean, result: any } = useGetOriginById(Number(idCoffee));
    const [originAdd, setOriginAdd] = useState<Origin>({
        id: -1,
        nameOrigin: ''
    });
    const [showDialogErrors, setShowDialogErrors] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOriginAdd({
            ...originAdd,
            [name]: value
        });
    };

    const messageError = [
        {
            titulo: 'Error',
            descripcion: 'Este origen no puede ser eliminado ya que está asociado a un producto, debes asegurarte de que no esté asociado a ningún producto para poder eliminarlo.'
        }
    ]

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();

        let originData = { ...originAdd };
        if (!idCoffee) {
            const { id, ...rest } = originData;
            originData = rest;
        }

        formData.append('origin', JSON.stringify(originData));

        try {
            // Enviar la solicitud POST con formData
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/coffee-app/origin`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (idCoffee) {
                toast({
                    title: 'Éxito',
                    description: 'Origen actualizado correctamente',
                });
            } else {
                toast({
                    title: 'Éxito',
                    description: 'Origen creado correctamente',
                });
            }
            router.push('/contentManager');

        } catch (error) {
            console.error('Error creando origen:', error);
            toast({
                title: 'Error',
                description: 'Error creando categoría',
                variant: 'destructive'
            });
        }
    };

    //useEffect que actualiza los datos si result contiene datos
    useEffect(() => {
        if (result) {
            setOriginAdd({
                id: result.id || -1,
                nameOrigin: result.nameOrigin || ''
            });
        }
    }, [result]);

    const deleteCoffee = async () => {
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/coffee-app/origin/${idCoffee}`);
            if (res.status === 200) {
                toast({
                    title: 'Éxito',
                    description: 'Origen eliminado correctamente',
                });
                router.push('/contentManager');
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 409) {
                setShowDialogErrors(true);
            } else {
                console.error('Error eliminando origen:', error);
                toast({
                    title: 'Error',
                    description: 'Error eliminando origen',
                    variant: 'destructive'
                });
            }
        }
    };

    return (
        <Card className="max-w-lg mx-auto my-6 p-6 bg-white dark:bg-gray-900 shadow-xl rounded-lg">
            <CardHeader>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Agregar Origen 🌎
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                    Especifica un nuevo origen para los productos.
                </p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="nameOrigin">Nombre del Origen</Label>
                        <Input
                            id="nameOrigin"
                            name="nameOrigin"
                            value={originAdd.nameOrigin}
                            onChange={handleChange}
                            placeholder="Ejemplo: Colombia, Etiopía"
                            required
                        />
                        <Input
                            name="id"
                            value={originAdd.id}
                            onChange={handleChange}
                            required
                            className="hidden"
                        />
                    </div>

                    <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90 transition">
                        {idCoffee ? 'Actualizar Origen' : 'Agregar Origen'}
                    </Button>
                    {idCoffee && (
                        <Button type="button" className="w-full transition" variant={'destructive'} onClick={deleteCoffee} >
                            Eliminar origen
                        </Button>
                    )}
                </form>
                <DialogErrors isOpen={showDialogErrors} messageError={messageError} setIsOpen={setShowDialogErrors}/>
            </CardContent>
        </Card>
    );
};

export default AddOrigin;