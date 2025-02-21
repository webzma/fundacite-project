import CourseCard from "@/components/courseCard";
import { Clock, Users, Gem } from "lucide-react";

// Aquí normalmente harías una llamada a tu API 🚀
function getCourseData(id: string) {
  return {
    id: Number.parseInt(id),
    title: "Desarrollo Web Fullstack",
    instructor: "María González",
    description:
      "Aprende a construir aplicaciones web completas desde cero. Este curso cubre tanto el desarrollo frontend como backend, utilizando las tecnologías más demandadas en la industria.",
    image: "/placeholder.svg?height=400&width=600",
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
        image: "/ui-ux.webp",
      },
      {
        id: 3,
        title: "Marketing Digital",
        instructor: "Laura Martínez",
        image: "/marketing.webp",
      },
    ],
  };
}

const Course = () => {
  const course = getCourseData("1");
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Desarrollo Web Fullstack</h1>
          <p className="text-xl mb-6 text-gray-200">
            Aprende a construir aplicaciones web completas desde cero. Este
            curso cubre tanto el desarrollo frontend como backend, utilizando
            las tecnologías más demandadas en la industria.
          </p>
          <div className="flex items-center space-x-4">
            <img
              src={"/wilberk.webp"}
              alt="Instructor"
              width={50}
              height={50}
              className="rounded-full size-[50px] object-cover"
            />
            <span className="text-lg text-gray-200">
              Instructor: Wilberk Ledezma
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <section className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Acerca de este curso</h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="grid grid-cols-3 gap-4 text-center pt-4">
                <div className="flex flex-col items-center">
                  <Clock className="text-[#003366]" size="30" />
                  <span className="text-sm text-gray-500">Duración</span>
                  <span className="font-semibold">12 semanas</span>
                </div>
                <div className="flex flex-col items-center">
                  <Users className="text-[#003366]" size="30" />
                  <span className="text-sm text-gray-500">Estudiantes</span>
                  <span className="font-semibold">422</span>
                </div>
                <div className="flex flex-col items-center">
                  <Gem className="text-[#003366]" size="30" />
                  <span className="text-sm text-gray-500">Nivel</span>
                  <span className="font-semibold">Intermedio</span>
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
                    </summary>
                    <ul className="p-4 space-y-2">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="flex items-center">
                          <span className="h-2 w-2 text-[#0072ff] rounded-full mr-2"></span>
                          <div className="text-gray-700">{lesson}</div>
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <img
                src="/programming.webp"
                width={600}
                height={400}
                className="w-full rounded-lg mb-4"
              />
              <button className="w-full bg-blue-gradient text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition duration-300 mb-4">
                Inscribirse Ahora
              </button>
              <ul className="text-sm text-gray-600">
                <li className="flex items-center mb-2 gap-2">
                  <Clock className="text-[#003366]" size="20" />
                  <span className="text-sm text-gray-500">
                    12 semanas de duración
                  </span>
                </li>
                <li className="flex items-center mb-2 gap-2">
                  <Users className="text-[#003366]" size="20" />
                  <span className="text-sm text-gray-500">422 estudiantes</span>
                </li>
                <li className="flex items-center mb-2 gap-2">
                  <Gem className="text-[#003366]" size="20" />
                  <span className="text-sm text-gray-500">
                    Nivel intermedio
                  </span>
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
      </div>
    </div>
  );
};

export default Course;
