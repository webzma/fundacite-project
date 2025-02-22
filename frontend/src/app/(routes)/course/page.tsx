import Image from "next/image";
import type { Metadata } from "next";
import { ChevronRight, Clock, Users, BarChart } from "lucide-react";
import CourseCard from "@/components/courseCard";
import ReviewSystem from "@/components/reviewSystem";
import DiscussionForum from "@/components/discussionForum";
import ShareButtons from "@/components/shareButtons";
import ExamSystem from "@/components/examSystem";
import Link from "next/link";

// Esta función simularía la obtención de datos del curso desde una API o base de datos
async function getCourseData(id: string) {
  // Aquí normalmente harías una llamada a tu API
  return {
    id: Number.parseInt(id),
    title: "Desarrollo Web Fullstack",
    instructor: "Wilberk Ledezma",
    description:
      "Aprende a construir aplicaciones web completas desde cero. Este curso cubre tanto el desarrollo frontend como backend, utilizando las tecnologías más demandadas en la industria.",
    image: "/programming.webp",
    duration: "12 semanas",
    students: 1500,
    level: "Intermedio",
    modules: [
      {
        title: "Introducción al Desarrollo Web",
        lessons: [
          "HTML5 Avanzado",
          "CSS3 y Preprocesadores",
          "JavaScript Moderno",
        ],
      },
      {
        title: "Frontend Frameworks",
        lessons: ["React.js", "Estado y Hooks", "Manejo de Rutas"],
      },
      {
        title: "Backend Development",
        lessons: ["Node.js Fundamentos", "Express.js", "APIs RESTful"],
      },
      {
        title: "Bases de Datos",
        lessons: ["SQL vs NoSQL", "MongoDB", "Integración con Backend"],
      },
      {
        title: "Despliegue y DevOps",
        lessons: ["CI/CD", "Contenedores con Docker", "Despliegue en la Nube"],
      },
    ],
    relatedCourses: [
      {
        id: 2,
        title: "Diseño UX/UI Avanzado",
        instructor: "Carlos Rodríguez",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 3,
        title: "Marketing Digital",
        instructor: "Laura Martínez",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    completed: true,
  };
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const course = await getCourseData(params.id);
  return {
    title: `${course.title} | CursosApp`,
    description: course.description,
  };
}

export default async function CoursePage({
  params,
}: {
  params: { id: string };
}) {
  const course = await getCourseData(params.id);

  // Simulamos algunas reseñas y posts iniciales
  const initialReviews = [
    {
      id: 1,
      user: "Ana L.",
      rating: 5,
      comment: "Excelente curso, muy completo y bien explicado.",
      date: "2023-05-15",
    },
    {
      id: 2,
      user: "Carlos M.",
      rating: 4,
      comment:
        "Muy buen contenido, pero algunas partes podrían ser más detalladas.",
      date: "2023-05-10",
    },
  ];

  const initialPosts = [
    {
      id: 1,
      user: "María G.",
      content:
        "¿Alguien puede explicar mejor el concepto de closures en JavaScript?",
      date: "2023-05-20",
      replies: [],
    },
    {
      id: 2,
      user: "Juan P.",
      content: "Excelente curso, ¿habrá una continuación más avanzada?",
      date: "2023-05-18",
      replies: [],
    },
  ];

  const courseUrl = `https://cursosapp.com/courses/${course.id}`; // Reemplaza con tu dominio real

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-blue-gradient dark:bg-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-xl mb-6">{course.description}</p>
          <div className="flex items-center space-x-4">
            <Image
              src={"/wilberk.webp"}
              alt={course.instructor}
              width={60}
              height={60}
              className="rounded-full size-[40px] object-cover"
            />
            <span className="text-lg">Instructor: {course.instructor}</span>
          </div>
          <div className="mt-6">
            <ShareButtons url={courseUrl} title={course.title} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <section className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Acerca de este curso</h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <Clock className="h-8 w-8 text-blue-500 mb-2" />
                  <span className="text-sm text-gray-500">Duración</span>
                  <span className="font-semibold">{course.duration}</span>
                </div>
                <div className="flex flex-col items-center">
                  <Users className="h-8 w-8 text-blue-500 mb-2" />
                  <span className="text-sm text-gray-500">Estudiantes</span>
                  <span className="font-semibold">{course.students}</span>
                </div>
                <div className="flex flex-col items-center">
                  <BarChart className="h-8 w-8 text-blue-500 mb-2" />
                  <span className="text-sm text-gray-500">Nivel</span>
                  <span className="font-semibold">{course.level}</span>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Contenido del curso</h2>
              <div className="space-y-4">
                {course.modules.map((module, index) => (
                  <details key={index} className="border rounded-lg">
                    <summary className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                      <span className="font-semibold">{module.title}</span>
                      <ChevronRight className="h-5 w-5 text-blue-500" />
                    </summary>
                    <ul className="p-4 space-y-2">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="flex items-center">
                          <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </section>
            <section className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <ReviewSystem
                courseId={course.id}
                initialReviews={initialReviews}
              />
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <Image
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                width={600}
                height={400}
                className="w-full rounded-lg mb-4"
              />
              <button className="w-full bg-blue-gradient text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition duration-300 mb-4">
                Inscribirse Ahora
              </button>
              <ul className="text-sm text-gray-600">
                <li className="flex items-center mb-2">
                  <Clock className="h-5 w-5 mr-2 text-blue-500" />
                  {course.duration} de duración
                </li>
                <li className="flex items-center mb-2">
                  <Users className="h-5 w-5 mr-2 text-blue-500" />
                  {course.students} estudiantes inscritos
                </li>
                <li className="flex items-center">
                  <BarChart className="h-5 w-5 mr-2 text-blue-500" />
                  Nivel {course.level}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Cursos relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {course.relatedCourses.map((relatedCourse) => (
              <CourseCard key={relatedCourse.id} course={relatedCourse} />
            ))}
          </div>
        </section>
        {course.completed && (
          <section className="bg-white rounded-lg shadow-lg p-6 mb-8 mt-14">
            <h2 className="text-2xl font-bold mb-4">
              ¡Felicidades! Has completado el curso
            </h2>
            <p className="mb-4">
              Ya puedes obtener tu certificado digital verificable.
            </p>
            <Link
              href={`/certificates/generate/${course.id}`}
              className="bg-blue-gradient text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
            >
              Obtener Certificado
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}
