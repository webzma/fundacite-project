import { Link } from "react-router-dom";

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    instructor: string;
    image: string;
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={course.image || "/placeholder.svg"}
          alt={course.title}
          width={300}
          height={200}
          className="w-full object-cover size-[280px]"
        />
        <div className="absolute inset-0 bg-blue-gradient opacity-0 hover:opacity-75 transition-opacity duration-300 flex items-center justify-center">
          <Link
            to={`/courses/1`}
            className="text-white text-lg font-semibold hover:underline"
          >
            Ver detalles
          </Link>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2 text-blue-800">{course.title}</h3>
        <p className="text-gray-600 mb-4">Instructor: {course.instructor}</p>
        <a
          href={`/courses/${course.id}`}
          className="inline-block bg-blue-gradient text-white font-semibold py-2 px-4 rounded hover:opacity-90 transition duration-300"
        >
          Inscribirse
        </a>
      </div>
    </div>
  );
}
