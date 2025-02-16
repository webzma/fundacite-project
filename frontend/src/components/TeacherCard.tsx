import { BookOpen } from "lucide-react";

interface TeacherCardProps {
  teacher: {
    id: number;
    name: string;
    specialty: string;
    image: string;
    coursesCount: number;
  };
}

function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={teacher.image || "/placeholder.svg"}
          alt={teacher.name}
          width={400}
          height={400}
          className="w-full object-cover aspect-square"
        />
        <div className="absolute inset-0 bg-blue-gradient opacity-0 hover:opacity-75 transition-opacity duration-300 flex items-center justify-center">
          <a
            href={`/teachers/${teacher.id}`}
            className="text-white text-lg font-semibold hover:underline"
          >
            Ver perfil
          </a>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2 text-blue-800">{teacher.name}</h3>
        <p className="text-gray-600 mb-4">{teacher.specialty}</p>
        <div className="flex items-center text-blue-600">
          <BookOpen className="h-5 w-5 mr-2" />
          <span>{teacher.coursesCount} cursos</span>
        </div>
      </div>
    </div>
  );
}

export default TeacherCard;
