"use client";

import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { BookOpen, Home, LogOut, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function DashboardSidebar() {
  const { logout, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Talleres y Cursos", href: "/dashboard/talleres", icon: BookOpen },
  ];

  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-4 bg-background border-b lg:hidden">
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
          <Menu className="h-6 w-6" />
        </Button>
        <div className="font-semibold">Sistema Administrativo</div>
        <div className="w-10" />
      </div>

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-72 bg-background p-6 shadow-lg transform transition-transform duration-200",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="font-bold text-xl">Sistema Admin</div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-1">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  pathname === item.href ? "bg-muted" : ""
                )}
                asChild
                onClick={() => setIsOpen(false)}
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.name}
                </Link>
              </Button>
            ))}
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="border-t pt-4 mb-4">
              <div className="flex items-center mb-2">
                <User className="mr-2 h-5 w-5" />
                <div className="font-medium">{user?.name}</div>
              </div>
              <div className="text-sm text-muted-foreground">{user?.email}</div>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:bg-gray-50">
        <div className="flex flex-col h-full">
          <div className="flex items-center h-16 px-6 border-b">
            <div className="font-bold text-xl">Sistema Admin</div>
          </div>

          <div className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  pathname === item.href ? "bg-muted" : ""
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.name}
                </Link>
              </Button>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center mb-2">
              <User className="mr-2 h-5 w-5" />
              <div className="font-medium">{user?.name}</div>
            </div>
            <div className="text-sm text-muted-foreground mb-4">
              {user?.email}
            </div>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
