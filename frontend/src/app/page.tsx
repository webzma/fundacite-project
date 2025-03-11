import { LoginForm } from "@/components/auth/login-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/30">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Sistema Administrativo
          </h1>
          <p className="text-muted-foreground">Gestión de talleres y cursos</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
