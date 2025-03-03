"use client";

import type React from "react";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Esta función simularía la obtención de datos del curso desde una API o base de datos
async function getCourse(id: string) {
  // Aquí normalmente harías una llamada a tu API
  return {
    id: Number.parseInt(id),
    title: "Desarrollo Web Fullstack",
    description: "Aprende a construir aplicaciones web completas desde cero.",
    instructor: "María González",
    duration: "12 semanas",
    level: "Intermedio",
  };
}

export default function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const courseId = unwrappedParams.id;

  const router = useRouter();
  const [course, setCourse] = useState({
    id: 0,
    title: "",
    description: "",
    instructor: "",
    duration: "",
    level: "",
  });

  useEffect(() => {
    if (courseId !== "new") {
      getCourse(courseId).then(setCourse);
    }
  }, [courseId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
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
            value={course.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            name="description"
            value={course.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="instructor">Instructor</Label>
          <Input
            id="instructor"
            name="instructor"
            value={course.instructor}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="duration">Duración</Label>
          <Input
            id="duration"
            name="duration"
            value={course.duration}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="level">Nivel</Label>
          <Input
            id="level"
            name="level"
            value={course.level}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">Guardar Curso</Button>
      </form>
    </div>
  );
}
