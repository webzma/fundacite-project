import TeacherCard from "@/components/teacherCard";

function getTeachers() {
  // Aquí normalmente harías una llamada a tu API
  return [
    {
      id: 1,
      name: "Wilberk Ledezma",
      specialty: "Desarrollo Web",
      image: "/wilberk.webp",
      coursesCount: 3,
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      specialty: "Diseño UX/UI",
      image: "/carlos.webp",

      coursesCount: 2,
    },
    {
      id: 3,
      name: "Daniel Ochoa",
      specialty: "Marketing Digital",
      image: "/daniel.webp",
      coursesCount: 4,
    },
    {
      id: 4,
      name: "Anthony Ramirez",
      specialty: "Ciencia de Datos",
      image: "/anthony.webp",
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
          <p className="text-xl text-gray-200">
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
