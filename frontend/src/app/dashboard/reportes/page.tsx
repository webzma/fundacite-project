"use client";

import { useState } from "react";
import { useCourses } from "@/context/course-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/data-range-picker";
import {
  BarChart,
  PieChart,
  LineChart,
  Bar,
  Pie,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Download,
  BarChart3,
  PieChartIcon,
  LineChartIcon,
  Users,
  Calendar,
  Filter,
} from "lucide-react";

export default function Reportes() {
  const { courses } = useCourses();
  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  });
  const [instructor, setInstructor] = useState("todos");
  const [status, setStatus] = useState("todos");

  // Obtener lista única de instructores
  const instructores = [
    "todos",
    ...new Set(courses.map((course) => course.instructor)),
  ];

  // Datos para el gráfico de barras - Estudiantes por taller
  const estudiantesPorTaller = courses.map((course) => ({
    name:
      course.title.length > 20
        ? course.title.substring(0, 20) + "..."
        : course.title,
    estudiantes: course.students,
    capacidad: course.capacity,
  }));

  // Datos para el gráfico circular - Distribución por estado
  const talleresActivos = courses.filter(
    (course) => course.status === "active"
  ).length;
  const talleresPendientes = courses.filter(
    (course) => course.status === "pending"
  ).length;
  const distribucionEstados = [
    { name: "Activos", value: talleresActivos, color: "#10b981" },
    { name: "Pendientes", value: talleresPendientes, color: "#f59e0b" },
  ];

  // Datos para el gráfico de líneas - Tendencia de inscripciones (simulado)
  const tendenciaInscripciones = [
    { name: "Ene", inscripciones: 12 },
    { name: "Feb", inscripciones: 19 },
    { name: "Mar", inscripciones: 15 },
    { name: "Abr", inscripciones: 25 },
    { name: "May", inscripciones: 32 },
    { name: "Jun", inscripciones: 28 },
    { name: "Jul", inscripciones: 40 },
    { name: "Ago", inscripciones: 45 },
    { name: "Sep", inscripciones: 50 },
    { name: "Oct", inscripciones: 55 },
    { name: "Nov", inscripciones: 48 },
    { name: "Dic", inscripciones: 52 },
  ];

  // Calcular estadísticas generales
  const totalEstudiantes = courses.reduce(
    (acc, course) => acc + course.students,
    0
  );
  const totalCapacidad = courses.reduce(
    (acc, course) => acc + course.capacity,
    0
  );
  const porcentajeOcupacion =
    totalCapacidad > 0
      ? Math.round((totalEstudiantes / totalCapacidad) * 100)
      : 0;
  const promedioEstudiantesPorTaller =
    courses.length > 0 ? Math.round(totalEstudiantes / courses.length) : 0;

  // Función para exportar reportes (simulada)
  const exportarReporte = (formato: any) => {
    alert(`Reporte exportado en formato ${formato}`);
  };

  return (
    <div className="fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-1">
            Reportes y Estadísticas
          </h1>
          <p className="text-muted-foreground">
            Análisis detallado de talleres y estudiantes
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => exportarReporte("PDF")}>
            <Download className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
          <Button variant="outline" onClick={() => exportarReporte("Excel")}>
            <Download className="mr-2 h-4 w-4" />
            Exportar Excel
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-primary flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filtros de Reportes
          </CardTitle>
          <CardDescription>
            Personaliza los datos mostrados en los reportes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <DatePickerWithRange className="w-full" />
            </div>
            <div className="w-full md:w-64">
              <Select value={instructor} onValueChange={setInstructor}>
                <SelectTrigger>
                  <SelectValue placeholder="Instructor" />
                </SelectTrigger>
                <SelectContent>
                  {instructores.map((inst) => (
                    <SelectItem key={inst} value={inst}>
                      {inst === "todos" ? "Todos los instructores" : inst}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-64">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="active">Activos</SelectItem>
                  <SelectItem value="pending">Pendientes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="dashboard-card">
          <CardHeader className="dashboard-card-header">
            <div className="flex text-[#193966] items-center justify-between">
              <span className="font-medium">Total Talleres</span>
              <Calendar className="dashboard-card-icon" />
            </div>
          </CardHeader>
          <CardContent className="dashboard-card-content">
            <div className="dashboard-card-value">{courses.length}</div>
            <p className="text-[#193966] text-sm">Talleres registrados</p>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="dashboard-card-header">
            <div className="flex text-[#193966] items-center justify-between">
              <span className="font-medium">Total Estudiantes</span>
              <Users className="dashboard-card-icon" />
            </div>
          </CardHeader>
          <CardContent className="dashboard-card-content">
            <div className="dashboard-card-value">{totalEstudiantes}</div>
            <p className="text-[#193966] text-sm">Estudiantes inscritos</p>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="dashboard-card-header">
            <div className="flex text-[#193966] items-center justify-between">
              <span className="font-medium">Ocupación</span>
              <BarChart3 className="dashboard-card-icon" />
            </div>
          </CardHeader>
          <CardContent className="dashboard-card-content">
            <div className="dashboard-card-value">{porcentajeOcupacion}%</div>
            <p className="text-[#193966] text-sm">De la capacidad total</p>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="dashboard-card-header">
            <div className="flex text-[#193966] items-center justify-between">
              <span className="font-medium">Promedio</span>
              <Users className="dashboard-card-icon" />
            </div>
          </CardHeader>
          <CardContent className="dashboard-card-content">
            <div className="dashboard-card-value">
              {promedioEstudiantesPorTaller}
            </div>
            <p className="text-[#193966] text-sm">Estudiantes por taller</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de gráficos */}
      <Tabs defaultValue="estudiantes" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="estudiantes" className="flex items-center">
            <BarChart3 className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Estudiantes por Taller</span>
            <span className="sm:hidden">Estudiantes</span>
          </TabsTrigger>
          <TabsTrigger value="estados" className="flex items-center">
            <PieChartIcon className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Distribución por Estado</span>
            <span className="sm:hidden">Estados</span>
          </TabsTrigger>
          <TabsTrigger value="tendencias" className="flex items-center">
            <LineChartIcon className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Tendencia de Inscripciones</span>
            <span className="sm:hidden">Tendencias</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="estudiantes">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-primary">
                Estudiantes por Taller
              </CardTitle>
              <CardDescription>
                Comparativa de estudiantes inscritos vs. capacidad máxima por
                taller
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={estudiantesPorTaller}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={70}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="estudiantes"
                      name="Estudiantes Inscritos"
                      fill="#3b82f6"
                    />
                    <Bar
                      dataKey="capacidad"
                      name="Capacidad Máxima"
                      fill="#93c5fd"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estados">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-primary">
                Distribución por Estado
              </CardTitle>
              <CardDescription>
                Proporción de talleres según su estado actual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full flex items-center justify-center">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                  className="max-w-md mx-auto"
                >
                  <PieChart>
                    <Pie
                      data={distribucionEstados}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {distribucionEstados.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value} talleres`, "Cantidad"]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tendencias">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-primary">
                Tendencia de Inscripciones
              </CardTitle>
              <CardDescription>
                Evolución mensual de inscripciones a talleres
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={tendenciaInscripciones}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="inscripciones"
                      name="Inscripciones"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Tabla de resumen */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-xl text-primary">
            Resumen de Talleres
          </CardTitle>
          <CardDescription>
            Datos consolidados de todos los talleres
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full data-table">
              <thead>
                <tr>
                  <th>Taller</th>
                  <th>Instructor</th>
                  <th>Estudiantes</th>
                  <th>Capacidad</th>
                  <th>Ocupación</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => {
                  const ocupacion =
                    course.capacity > 0
                      ? Math.round((course.students / course.capacity) * 100)
                      : 0;

                  return (
                    <tr key={course.id}>
                      <td className="font-medium">{course.title}</td>
                      <td>{course.instructor}</td>
                      <td>{course.students}</td>
                      <td>{course.capacity}</td>
                      <td>
                        <div className="flex items-center">
                          <div className="w-full bg-secondary h-2 rounded-full mr-2">
                            <div
                              className={`h-2 rounded-full ${
                                ocupacion > 80
                                  ? "bg-red-500"
                                  : ocupacion > 60
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              }`}
                              style={{ width: `${ocupacion}%` }}
                            ></div>
                          </div>
                          <span className="text-xs whitespace-nowrap">
                            {ocupacion}%
                          </span>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            course.status === "active"
                              ? "badge-success"
                              : "badge-warning"
                          }`}
                        >
                          {course.status === "active" ? "Activo" : "Pendiente"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
