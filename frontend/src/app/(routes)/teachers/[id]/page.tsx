import Image from "next/image";
import type { Metadata } from "next";
import { BookOpen, Award, Users } from "lucide-react";
import CourseCard from "@/components/courseCard";

// Esta función simularía la obtención de datos del profesor desde una API o base de datos
async function getTeacherData(id: string) {
  // Aquí normalmente harías una llamada a tu API
  return {
    id: Number.parseInt(id),
    name: "Wilberk Ledezma",
    specialty: "Desarrollo Web",
    image: "/wilberk.webp",
    bio: "Wilberk Ledezma es una desarrolladora web full-stack con más de 10 años de experiencia en la industria. Ha trabajado en proyectos para grandes empresas tecnológicas y ahora comparte su conocimiento a través de cursos en línea.",
    experience: "10+ años",
    studentsCount: 5000,
    coursesCount: 3,
    courses: [
      {
        id: 1,
        instructor: "Wilberk Ledezma",
        title: "Desarrollo Web Fullstack",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 2,
        instructor: "Jorge E. González",
        title: "React Avanzado",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 3,
        instructor: "María Pérez",
        title: "Node.js para Principiantes",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  };
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const teacher = await getTeacherData(params.id);
  return {
    title: `${teacher.name} | CursosApp`,
    description: `Conoce a ${teacher.name}, experto en ${teacher.specialty} y profesor en CursosApp`,
  };
}

export default async function TeacherPage({
  params,
}: {
  params: { id: string };
}) {
  const teacher = await getTeacherData(params.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <Image
              src={teacher.image || "/placeholder.svg"}
              alt={teacher.name}
              width={200}
              height={200}
              className="rounded-full mb-6 md:mb-0 md:mr-8 size-[200px] object-cover"
            />
            <div>
              <h1 className="text-4xl font-bold mb-2">{teacher.name}</h1>
              <p className="text-xl mb-4">{teacher.specialty}</p>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  <span>{teacher.coursesCount} cursos</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{teacher.studentsCount} estudiantes</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  <span>{teacher.experience} de experiencia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <section className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">
                Acerca de {teacher.name}
              </h2>
              <p className="text-gray-600">{teacher.bio}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">
                Cursos de {teacher.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teacher.courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">
                Contacta con {teacher.name}
              </h3>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-gradient text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition duration-300"
                >
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
