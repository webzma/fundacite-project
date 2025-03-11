"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCourses } from "@/context/course-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CrearTaller() {
  const router = useRouter()
  const { addCourse } = useCourses()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    duration: "",
    capacity: "",
    status: "pending",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validación básica
    if (!formData.title || !formData.instructor || !formData.duration) {
      alert("Por favor completa los campos obligatorios")
      return
    }

    // Crear nuevo curso
    addCourse({
      ...formData,
      id: Date.now().toString(),
      students: 0,
      duration: Number.parseInt(formData.duration),
      capacity: Number.parseInt(formData.capacity),
    })

    router.push("/dashboard/talleres")
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/dashboard/talleres">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold">Crear Nuevo Taller</h1>
      </div>

      <Card className="shadow-sm">
        <form onSubmit={handleSubmit}>
          <CardHeader className="pb-4">
            <CardTitle>Información del Taller</CardTitle>
            <CardDescription>Completa la información para crear un nuevo taller o curso.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Título <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Nombre del taller o curso"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructor">
                  Instructor <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="instructor"
                  name="instructor"
                  value={formData.instructor}
                  onChange={handleChange}
                  placeholder="Nombre del instructor"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe el contenido del taller"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="duration">
                  Duración (horas) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  min="1"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Ej: 8"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Capacidad</Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  min="1"
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder="Ej: 20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select
                  name="status"
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-3 pt-6">
            <Button variant="outline" type="button" asChild className="w-full sm:w-auto">
              <Link href="/dashboard/talleres">Cancelar</Link>
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              Crear Taller
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

