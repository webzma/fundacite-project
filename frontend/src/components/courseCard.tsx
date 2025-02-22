import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    image: string;
  };
}

function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="relative">
        <Image
          src={course.image || "/placeholder.svg"}
          alt={course.title}
          width={300}
          height={200}
          className="w-full object-cover size-[280px]"
          quality={100}
        />
        <div className="absolute inset-0 bg-blue-gradient opacity-0 hover:opacity-75 transition-opacity duration-300 flex items-center justify-center">
          <Link
            href={`/course`}
            className="text-white text-lg font-semibold hover:underline"
          >
            Ver detalles
          </Link>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2 text-[#003366]">
          {course.title}
        </h3>
        <p className="text-gray-600 mb-4">Instructor: {course.instructor}</p>
        <Link
          href={`/courses/${course.id}`}
          className="inline-block bg-blue-gradient text-white font-semibold py-2 px-4 rounded hover:opacity-90 transition duration-300"
        >
          Inscribirse
        </Link>
      </div>
    </div>
  );
}

export default CourseCard;
