import Link from "next/link";
import CourseCard from "@/components/courseCard";

const Home = () => {
  const featuredCourses = [
    {
      id: 1,
      title: "Introducción a la Programación",
      instructor: "Ana García",
      image: "/programming.webp",
    },
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
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="min-h-screen">
        <section className="bg-blue-gradient text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Bienvenido a Fundacite
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200">
                Descubre una nueva forma de aprender con los mejores
                profesionales
              </p>
              <Link
                href="/courses"
                className="inline-block bg-white text-[#003366] font-semibold py-3 px-6 rounded-lg hover:bg-blue-100 transition duration-300 shadow-neon"
              >
                Explora nuestros cursos
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-[#003366] mb-12">
            Cursos Destacados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/courses"
              className="inline-block bg-blue-gradient text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition duration-300 shadow-lg"
            >
              Ver todos los cursos
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
