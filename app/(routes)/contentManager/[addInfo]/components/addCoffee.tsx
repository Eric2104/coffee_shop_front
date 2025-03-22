'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import axios from "axios";
import { usegetOrigin } from "@/api/getOrigin";
import { useGetCategories } from "@/api/getCategories";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useGetCoffee } from "@/api/getCoffe";
import { ProductType } from "@/types/product";


interface ImagenCoffee {
    imagen: File | null;

}

interface FormDataCoffee extends FormData {
    append(name: string, value: string | Blob, fileName?: string): void;
}

interface HandleChangeEvent extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> { }


const AddCoffee = () => {
    const { idCoffee } = useParams();
    const { error, loading, result }: { error: any, loading: boolean, result: any } = useGetCoffee(Number(idCoffee));
    const { error: originError, loading: originLoading, result: originResult = [] }: { error: any, loading: boolean, result: { id: number, nameOrigin: string }[] | null } = usegetOrigin();
    const { error: categoryError, loading: categoryLoading, result: categoryResult = [] }: { error: any, loading: boolean, result: { slug: string, categoryName: string, id: number }[] | null } = useGetCategories();
    const router = useRouter()
    const [coffee, setCoffee] = useState({
        id: -1,
        productName: '',
        description: '',
        active: false,
        taste: '',
        featured: false,
        price: '',
        origin: {
            id: 0
        },
        category: {
            id: 0
        },
    });

    const [imagenCoffee, setImagenCoffee] = useState<ImagenCoffee>({
        imagen: null
    });

    useEffect(() => {
        if (result) {
            setCoffee({
                id: result.id || -1,
                productName: result.productName || '',
                description: result.description || '',
                active: result.active || false,
                taste: result.taste || '',
                featured: result.featured || false,
                price: result.price || '',
                origin: {
                    id: result.origin?.id || 0
                },
                category: {
                    id: result.category?.id || 0
                },
            });


        }
    }, [result]);

    const handleChange = (e: HandleChangeEvent) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setCoffee({
            ...coffee,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImagenCoffee({
            imagen: e.target.files ? e.target.files[0] : null
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(coffee)

        // Crear un FormData para enviar datos en multipart/form-data
        const formData: FormDataCoffee = new FormData();

        // Verificar si idCoffee tiene valor
        let coffeeData = { ...coffee };
        if (!idCoffee) {
            const { id, ...rest } = coffeeData;
            coffeeData = rest;
        }

        // Convertir el objeto coffee a JSON y agregarlo a formData
        formData.append('coffee', JSON.stringify(coffeeData));

        // Se agrega la imagen al body si no es null
        if (imagenCoffee.imagen !== null) {
            formData.append('imagen', imagenCoffee.imagen);
        }

        try {
            //Enviar la solicitud POST con formData
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/coffee-app/coffees`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (idCoffee) {
                alert('Café actualizado correctamente');
            } else {
                alert('Café creado correctamente');
            }
            router.push('/contentManager');
                
        } catch (error) {
            console.error('Error creando café:', error);
        }
    };

    const deleteCoffee = async () => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/coffee-app/coffees/${idCoffee}`);
            alert('Café eliminado correctamente');
            router.push('/contentManager');
        }
        catch (error) {
            console.error('Error eliminando café:', error);
        }
    };

    return (
        <Card className="mx-auto my-6 p-6 bg-white dark:bg-gray-900 shadow-xl rounded-lg max-w-4xl">
            <CardHeader>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Agregar Nuevo Café ☕
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                    Completa los detalles para agregar un nuevo café a la tienda.
                </p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="productName">Nombre del Producto</Label>
                        <Input
                            id="productName"
                            name="productName"
                            value={coffee.productName}
                            onChange={handleChange}
                            placeholder="Ejemplo: Espresso Italiano"
                            required
                        />
                        <Input
                            name="id"
                            value={coffee.id}
                            onChange={handleChange}
                            placeholder="Ejemplo: Espresso Italiano"
                            required
                            className="hidden"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={coffee.description}
                            onChange={handleChange}
                            placeholder="Describe el café"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="price">Precio</Label>
                        <Input
                            type="number"
                            id="price"
                            name="price"
                            value={coffee.price}
                            onChange={handleChange}
                            placeholder="Ejemplo: 10.99"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label>Sabor</Label>
                            <Select
                                value={coffee.taste}
                                onValueChange={(value) => setCoffee({ ...coffee, taste: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona un sabor" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="sweet">Dulce</SelectItem>
                                        <SelectItem value="citric">Cítrico</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>Origen</Label>
                            <Select
                                value={String(coffee.origin.id)}
                                onValueChange={(value) => setCoffee({ ...coffee, origin: { ...coffee.origin, id: Number(value) } })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona un origen" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {originResult?.map((origen: { id: number; nameOrigin: string }) => (
                                            <SelectItem key={origen.id} value={String(origen.id)}>
                                                {origen.nameOrigin}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div>
                        <Label>Categoría</Label>
                        <Select
                            value={String(coffee.category.id)}
                            onValueChange={(value) => setCoffee({ ...coffee, category: { ...coffee.category, id: Number(value) } })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona una categoría" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {categoryResult?.map((categoria) => (
                                        <SelectItem key={categoria.slug} value={String(categoria.id)}>
                                            {categoria.categoryName}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                name="active"
                                checked={coffee.active}
                                onCheckedChange={(checked) => setCoffee({ ...coffee, active: !!checked })}
                            />
                            <Label>Activo</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                name="featured"
                                checked={coffee.featured}
                                onCheckedChange={(checked) => setCoffee({ ...coffee, featured: !!checked })}
                            />
                            <Label>Destacado</Label>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="space-y-2">
                            <Label>Imagen del Café</Label>
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

                    <div className="flex gap-3">
                        <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90 transition">
                            {idCoffee ? 'Actualizar café' : 'Agregar café'}
                        </Button>
                        {idCoffee && (
                            <Button type="button" className="w-full transition" variant={'destructive'} onClick={deleteCoffee}>
                                Eliminar café
                            </Button>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default AddCoffee;