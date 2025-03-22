"use client"
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

const FormSession = () => {
    const [form, setForm] = useState({
        username: "",
        password:  ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value || "",
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const responseEnvio = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/generateToken`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!responseEnvio.ok) {
                throw new Error(`Error ${responseEnvio.status}: ${responseEnvio.statusText}`);
            }

            const responseToken = await responseEnvio.text();
            const payload = JSON.parse(atob(responseToken.split('.')[1])); 
            
            localStorage.setItem('token', responseToken);
            localStorage.setItem('role', payload.role);
            window.location.reload();

            
        } catch (error) {
            console.error("Error al iniciar sesion:", error);
            throw error;
        }
    }

    return (
        <form className="w-full flex flex-col gap-y-6 max-w-md bg-white p-6 rounded-md"
        onSubmit={handleSubmit}
        >
            <div className="mb-4">
                <Label htmlFor="nombre" className="block text-sm font-medium mb-2">
                    Correo electronico 
                </Label>
                <Input
                    id="username"
                    name="username"
                    type="email"
                    placeholder="your@email.com"
                    value={form.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-4">
                <Label htmlFor="fecha" className="block text-sm font-medium mb-2">
                    Contraseña
                </Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    placeholder="123456"
                    onChange={handleChange}
                    required
                />
            </div>
            <Button type="submit" className={`w-full  `} >
                Ingresar
            </Button>
        </form>
    )
}

export default FormSession;