import { RegistroForm } from "@/components/auth/register-form";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import Link from "next/link";

export default function Registro() {
  return (
    <main className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/70 z-10"></div>
        <div className="relative z-20 max-w-md text-white p-8">
          <h1 className="text-4xl font-bold mb-4">
            Únete a Nuestra Plataforma
          </h1>
          <p className="text-white/80 mb-6">
            Crea una cuenta para acceder a todas las funcionalidades de nuestro
            sistema de gestión de talleres y cursos. Comienza a administrar tus
            programas educativos de manera eficiente.
          </p>
          <div className="flex space-x-2">
            <div className="h-2 w-2 rounded-full bg-white/40"></div>
            <div className="h-2 w-2 rounded-full bg-white/60"></div>
            <div className="h-2 w-2 rounded-full bg-white/80"></div>
            <div className="h-2 w-2 rounded-full bg-white"></div>
          </div>
        </div>
      </div>

      {/* Panel derecho - Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-primary">Crear Cuenta</h1>
            <p className="text-muted-foreground mt-1">
              Regístrate para comenzar
            </p>
          </div>
          <RegistroForm />
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{" "}
              <Button
                variant="link"
                asChild
                className="p-0 h-auto font-semibold"
              >
                <Link href="/">Inicia sesión</Link>
              </Button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
