'use client'
import { useGetCategoryById } from "@/api/getCategoryById";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ImagenCategory {
    imagen: File | null;
}

const AddCategory = () => {

    const { idCoffee } = useParams();
    const { error, loading, result }: { error: any, loading: boolean, result: any } = useGetCategoryById(Number(idCoffee));
    const router = useRouter();
    const [categoryAdd, setCoffee] = useState({
        id: -1,
        categoryName: ''
    });

    const [imagenCategory, setImagenCoffee] = useState<ImagenCategory>({
        imagen: null
    });

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

        formData.append('category', JSON.stringify(categoryAdd));

        if (imagenCategory.imagen !== null) {
            alert("Se ha seleccionado una imagen")
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
                alert('Categoría actualizada correctamente');
            } else {
                alert('Categoría creada correctamente');
            }
            router.push('/contentManager');

        } catch (error) {
            console.error('Error creando categoria:', error);
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
                            <Button type="button" className="w-full  transition" variant={'destructive'} disabled>
                                Eliminar
                            </Button>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default AddCategory;