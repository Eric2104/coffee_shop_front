import ProtectedRoute from "@/components/ProtectedRoute";

const Page = () => {
    return (
        <ProtectedRoute>
            <div>
                <h1>Profile Page</h1>
                {/* Contenido de la página de perfil */}
            </div>
        </ProtectedRoute>
    );
}

export default Page;