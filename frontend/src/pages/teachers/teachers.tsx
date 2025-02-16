import TeacherCard from "../../components/TeacherCard";

function getTeachers() {
  // Aquí normalmente harías una llamada a tu API
  return [
    {
      id: 1,
      name: "María González",
      specialty: "Desarrollo Web",
      image: "/avatar.webp",
      coursesCount: 3,
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      specialty: "Diseño UX/UI",
      image: "/avatar.webp",

      coursesCount: 2,
    },
    {
      id: 3,
      name: "Laura Martínez",
      specialty: "Marketing Digital",
      image: "/avatar.webp",

      coursesCount: 4,
    },
    {
      id: 4,
      name: "Alejandro Sánchez",
      specialty: "Ciencia de Datos",
      image: "/avatar.webp",
      coursesCount: 3,
    },
    {
      id: 5,
      name: "Ana López",
      specialty: "Desarrollo Móvil",
      image: "/avatar.webp",
      coursesCount: 2,
    },
    {
      id: 6,
      name: "Roberto Fernández",
      specialty: "Inteligencia Artificial",
      image: "/avatar.webp",
      coursesCount: 3,
    },
  ];
}

const Teachers = () => {
  const teachers = getTeachers();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Nuestros Profesores</h1>
          <p className="text-xl">
            Conoce a los expertos que te guiarán en tu aprendizaje
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teachers;
