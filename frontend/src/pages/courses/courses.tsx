import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import CourseCard from "../../components/CourseCard";
import { Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";

type Course = {
  id: number;
  title: string;
  instructor: string;
  image: string;
  category: string;
};

const getCourses = () => {
  // Aquí normalmente harías una llamada a tu API
  return [
    {
      id: 1,
      title: "Desarrollo Web Fullstack",
      instructor: "María González",
      image: "/programming.jpg",
      category: "Desarrollo",
    },
    {
      id: 2,
      title: "Diseño UX/UI Avanzado",
      instructor: "Carlos Rodríguez",
      image: "/ui-ux.jpg",
      category: "Diseño",
    },
    {
      id: 3,
      title: "Marketing Digital",
      instructor: "Laura Martínez",
      image: "/marketing.jpg",
      category: "Marketing",
    },
    {
      id: 4,
      title: "Ciencia de Datos con Python",
      instructor: "Alejandro Sánchez",
      image: "/data-science.jpg",
      category: "Data Science",
    },
    {
      id: 5,
      title: "Desarrollo de Apps Móviles",
      instructor: "Ana López",
      image: "/mobile-development.jpg",
      category: "Desarrollo",
    },
    {
      id: 6,
      title: "Inteligencia Artificial Práctica",
      instructor: "Roberto Fernández",
      image: "/ai.jpg",
      category: "IA",
    },
  ];
};

const categories = [
  "Todos",
  "Desarrollo",
  "Diseño",
  "Marketing",
  "Data Science",
  "IA",
];

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const newCourses = getCourses();

  const filteredCourses = courses.filter(
    (course) =>
      (selectedCategory === "Todos" || course.category === selectedCategory) &&
      (course.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchValue.toLowerCase()))
  );

  useEffect(() => {
    setCourses(newCourses);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Explora Nuestros Cursos</h1>
          <p className="text-xl">
            Encuentra el curso perfecto para impulsar tu carrera
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Buscar cursos por título o instructor..."
              className="w-full p-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-500 mr-2" />
            <Select
              value={selectedCategory}
              onValueChange={(value) => setSelectedCategory(value)}
            >
              <SelectTrigger className="w-[180px] focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
