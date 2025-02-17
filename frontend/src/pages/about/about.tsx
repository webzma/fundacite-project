import { CheckCircle, Users, BookOpen, Award } from "lucide-react";

const teamMembers = [
  {
    name: "Ana García",
    role: "CEO & Fundadora",
    image: "/wilberk.webp",
  },
  {
    name: "Carlos Rodríguez",
    role: "Director de Tecnología",
    image: "/anthony.webp",
  },
  {
    name: "Laura Martínez",
    role: "Directora de Contenido",
    image: "/carlos.webp",
  },
  {
    name: "Miguel Sánchez",
    role: "Director de Operaciones",
    image: "/daniel.webp",
  },
];

const stats = [
  { label: "Estudiantes", value: "100,000+", icon: Users },
  { label: "Cursos", value: "500+", icon: BookOpen },
  { label: "Instructores", value: "200+", icon: Award },
  { label: "Países", value: "50+", icon: CheckCircle },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-blue-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Sobre CursosApp</h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-200">
            Transformando la educación en línea con cursos de alta calidad y una
            experiencia de aprendizaje única.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-bold text-[#003366] mb-4">
              Nuestra Misión
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
              En CursosApp, nos dedicamos a democratizar la educación de
              calidad, haciendo que el conocimiento sea accesible para todos, en
              cualquier lugar y en cualquier momento.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center">
                  <stat.icon className="h-12 w-12 text-[#003366] mb-4" />
                </div>
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-base font-medium text-gray-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#003366] mb-8 text-center">
            Nuestro Equipo
          </h2>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#003366] mb-8 text-center">
            Nuestros Valores
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#003366]/90 mb-2">
                Innovación
              </h3>
              <p className="text-gray-600">
                Constantemente buscamos nuevas formas de mejorar la experiencia
                de aprendizaje en línea.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#003366]/90 mb-2">
                Calidad
              </h3>
              <p className="text-gray-600">
                Nos comprometemos a ofrecer contenido educativo de la más alta
                calidad y relevancia.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#003366]/90 mb-2">
                Accesibilidad
              </h3>
              <p className="text-gray-600">
                Trabajamos para hacer que la educación de calidad sea accesible
                para todos, sin importar su ubicación o circunstancias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Únete a nuestra comunidad de aprendizaje
          </h2>
          <p className="text-xl mb-8">
            Descubre cómo CursosApp puede ayudarte a alcanzar tus metas
            educativas y profesionales.
          </p>
          <a
            href="/courses"
            className="bg-white text-[#003366] font-bold py-3 px-6 rounded-lg hover:bg-blue-50 transition duration-300"
          >
            Explora nuestros cursos
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
