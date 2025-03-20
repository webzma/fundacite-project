"use client";

import { useAuth } from "@/context/auth-context";
import { useCourses } from "@/context/course-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Users,
  Calendar,
  TrendingUp,
  ChevronRight,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Types
interface StatCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: LucideIcon;
}

/* interface Course {
  id: string;
  title: string;
  instructor: string;
  status: "active" | "pending";
  students: number;
} */

interface ActivityItem {
  type: "success" | "info" | "warning" | "error";
  title: string;
  time: string;
}

// Constants
/* const THEME_COLOR = "#193966"; */
const RECENT_ACTIVITIES: ActivityItem[] = [
  { type: "success", title: "Nuevo taller creado", time: "Hace 2 horas" },
  { type: "info", title: "Taller actualizado", time: "Hace 5 horas" },
  { type: "warning", title: "Nuevo estudiante inscrito", time: "Hace 1 día" },
  { type: "error", title: "Taller cancelado", time: "Hace 2 días" },
];

// Components
const StatCard = ({ title, value, description, icon: Icon }: StatCardProps) => (
  <Card className="dashboard-card">
    <CardHeader className="dashboard-card-header">
      <div className="flex text-[#193966] items-center justify-between">
        <span className="font-medium">{title}</span>
        <Icon className="dashboard-card-icon" />
      </div>
    </CardHeader>
    <CardContent className="dashboard-card-content">
      <div className="dashboard-card-value text-2xl font-extrabold">
        {value}
      </div>
      <p className="dashboard-card-label text-sm text-[#193966]">
        {description}
      </p>
    </CardContent>
  </Card>
);

const ActivityDot = ({ type }: { type: ActivityItem["type"] }) => {
  const colors = {
    success: "bg-green-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
  };
  return <div className={`h-2 w-2 rounded-full ${colors[type]} mt-2`}></div>;
};

export default function Dashboard() {
  const { user } = useAuth();
  const { courses } = useCourses();

  const totalStudents = courses.reduce(
    (acc, course) => acc + course.students,
    0
  );

  const activeWorkshops = courses.filter(
    (course) => course.status === "active"
  ).length;

  const stats = [
    {
      title: "Total Talleres",
      value: courses.length,
      description: "Talleres registrados",
      icon: BookOpen,
    },
    {
      title: "Talleres Activos",
      value: activeWorkshops,
      description: "En progreso",
      icon: Calendar,
    },
    {
      title: "Total Estudiantes",
      value: totalStudents,
      description: "Inscritos en talleres",
      icon: Users,
    },
    {
      title: "Promedio Asistencia",
      value: "87%",
      description: "Tasa de asistencia",
      icon: TrendingUp,
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1 text-primary">Dashboard</h1>
          <p className="text-muted-foreground">Bienvenido, {user?.name}</p>
        </div>
        <Button asChild className="bg-primary p-5">
          <Link
            href="/dashboard/talleres/crear"
            className="inline-flex items-center"
          >
            Crear nuevo taller
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="dashboard-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#193966]">
              Talleres Recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courses.slice(0, 5).map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between border-b border-border pb-4"
                >
                  <div>
                    <h3 className="font-medium text-xl">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {course.instructor}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Badge
                      className={`badge ${
                        course.status === "active"
                          ? "bg-green-200 text-green-700"
                          : "bg-yellow-200 text-yellow-700"
                      }`}
                    >
                      {course.status === "active" ? "Activo" : "Pendiente"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" asChild size="sm">
                <Link href="/dashboard/talleres">
                  Ver todos los talleres
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#193966]">
              Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {RECENT_ACTIVITIES.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <ActivityDot type={activity.type} />
                  <div>
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
