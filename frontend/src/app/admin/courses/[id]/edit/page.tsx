"use client";

import type React from "react";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type Course = {
  id: number;
  title: string;
  instructor: string;
  descripcion: string;
  students: number;
  duration: string;
  level: string;
};

// Esta función simularía la obtención de datos del curso desde una API o base de datos
function getCourse() {
  // Aquí normalmente harías una llamada a tu API
  return [
    {
      id: 1,
      title: "Desarrollo Web Fullstack",
      descripcion: "Aprende a construir aplicaciones web completas desde cero.",
      instructor: "María González",
      students: 1500,
      duration: "12 semanas",
      level: "Intermedio",
    },
    {
      id: 2,
      title: "Diseño UX/UI Avanzado",
      descripcion: "Conviértete en un experto en diseño de interfaces.",
      instructor: "Carlos Rodríguez",
      students: 1200,
      duration: "8 semanas",
      level: "Avanzado",
    },
    {
      id: 3,
      title: "Marketing Digital",
      descripcion: "Aprende a promocionar tus productos en Internet.",
      instructor: "Laura Martínez",
      students: 980,
      duration: "10 semanas",
      level: "Intermedio",
    },
  ];
}

export default function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>({
    id: 0,
    title: "",
    instructor: "",
    descripcion: "",
    students: 0,
    duration: "",
    level: "",
  });

  const unwrappedParams = use(params);
  const courseId = unwrappedParams.id;

  useEffect(() => {
    if (courseId !== "new") {
      const courses = getCourse();
      const course = courses.find((course) => course.id === Number(courseId));
      setCourse(course || null);
    }
  }, [courseId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCourse((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí normalmente enviarías los datos a tu API
    console.log("Curso guardado:", course);
    router.push("/admin/courses");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">
        {courseId === "new" ? "Crear Curso" : "Editar Curso"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Título del Curso</Label>
          <Input
            id="title"
            name="title"
            value={course?.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            name="description"
            value={course?.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="instructor">Instructor</Label>
          <Input
            id="instructor"
            name="instructor"
            value={course?.instructor}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="duration">Duración</Label>
          <Input
            id="duration"
            name="duration"
            value={course?.duration}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="level">Nivel</Label>
          <Input
            id="level"
            name="level"
            value={course?.level}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">Guardar Curso</Button>
      </form>
    </div>
  );
}
