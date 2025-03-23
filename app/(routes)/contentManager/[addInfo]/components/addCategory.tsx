'use client'
import { useGetCategoryById } from "@/api/getCategoryById";
import DialogErrors from "@/components/dialog-errors";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast"


interface ImagenCategory {
    imagen: File | null;
}

// Define the Category interface
interface Category {
    id?: number;
    categoryName: string;
}

const AddCategory = () => {

    const { idCoffee } = useParams();
    const { error, loading, result }: { error: any, loading: boolean, result: any } = useGetCategoryById(Number(idCoffee));
    const router = useRouter();

    // Use the Category interface in the useState hook
    const [categoryAdd, setCoffee] = useState<Category>({
        id: -1,
        categoryName: ''
    });

    const [imagenCategory, setImagenCoffee] = useState<ImagenCategory>({
        imagen: null
    });

    const [showDialogErrors, setShowDialogErrors] = useState(false);

    const messageError = [
        {
            titulo: 'Error',
            descripcion: 'Esta categoría no puede ser eliminada ya que está asociada a un producto, debes asegurarte de que no esté asociada a ningún producto para poder eliminar'
        }
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCoffee({
            ...categoryAdd,
            [name]: value
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImagenCoffee({
            imagen: e.target.files ? e.target.files[0] : null
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();

        let categoryData = { ...categoryAdd };
        if (!idCoffee) {
            const { id, ...rest } = categoryData;
            categoryData = rest;
        }

        formData.append('category', JSON.stringify(categoryData));

        if (imagenCategory.imagen !== null) {
            formData.append('imagen', imagenCategory.imagen);
        }

        try {
            // Enviar la solicitud POST con formData
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/coffee-app/categories`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (idCoffee) {
                toast({
                    title: 'Éxito',
                    description: 'Categoría actualizado correctamente',
                });
            } else {
                toast({
                    title: 'Éxito',
                    description: 'Categoría creado correctamente',
                });
            }
            router.push('/contentManager');

        } catch (error) {
            console.error('Error creando categoria:', error);
            toast({
                title: 'Error',
                description: 'Error creando categoría',
                variant: 'destructive'
            });
        }
    };

    useEffect(() => {
        if (result) {
            setCoffee({
                id: result.id || -1,
                categoryName: result.categoryName || ''
            });
        }
    }, [result])

    const deleteCategory = async () => {
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/coffee-app/categories/${idCoffee}`);
            if (res.status === 200) {
                toast({
                    title: 'Éxito',
                    description: 'Categoría eliminado correctamente',
                });
                router.push('/contentManager');
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 409) {
                setShowDialogErrors(true);
            } else {
                console.error('Error eliminando categoría:', error);
                toast({
                    title: 'Error',
                    description: 'Error eliminando categoría',
                    variant: 'destructive'
                });
            }
        }
    };


    return (
        <Card className="max-w-lg mx-auto my-6 p-6 bg-white dark:bg-gray-900 shadow-xl rounded-lg">
            <CardHeader>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Agregar Nueva Categoría 📂
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                    Completa la información para añadir una nueva categoría.
                </p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="categoryName">Nombre de la Categoría</Label>
                        <Input
                            id="categoryName"
                            name="categoryName"
                            value={categoryAdd.categoryName}
                            onChange={handleChange}
                            placeholder="Ejemplo: Cafés Especiales"
                            required
                        />
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="space-y-2">
                            <Label>Imagen de la Categoría</Label>
                            <Input type="file" name="imagen" onChange={handleFileChange} />
                        </div>
                        {(result && result.imagen) &&
                            (
                                <div className="w-[10rem] md:w-[15rem] h-[10rem] overflow-hidden rounded-lg shadow-md">
                                    <img src={`${result.imagen.url}`} alt={`${result.imagen.name}`} className="object-cover w-full h-full" />
                                </div>
                            )
                        }
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90 transition">
                            {idCoffee ? 'Actualizar' : 'Agregar'}
                        </Button>
                        {idCoffee && (
                            <Button type="button" className="w-full  transition" variant={'destructive'} onClick={deleteCategory}>
                                Eliminar
                            </Button>
                        )}
                    </div>
                </form>
                <DialogErrors isOpen={showDialogErrors} messageError={messageError} setIsOpen={setShowDialogErrors} />
            </CardContent>
        </Card>
    );
};

export default AddCategory;