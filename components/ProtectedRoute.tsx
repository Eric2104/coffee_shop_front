'use client'
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { token } = useAuth();
    const router = useRouter();


    useEffect(() => {
        if (!token) {
            router.push('/');
        }
    }, [token, router]);


    if (!token) {
        return (
            
            <div>Necesitas iniciar sesion</div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;