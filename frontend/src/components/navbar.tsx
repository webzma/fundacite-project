import Link from "next/link";

function Navbar() {
  return (
    <nav className="bg-blue-gradient backdrop-blur-md bg-opacity-80 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="font-bold text-2xl tracking-tight hover:text-blue-200 transition-colors duration-300"
            >
              Fundacite
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              href="/courses"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 hover:text-white transition-colors duration-300"
            >
              Cursos
            </Link>
            <Link
              href="/teachers"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 hover:text-white transition-colors duration-300"
            >
              Profesores
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 hover:text-white transition-colors duration-300"
            >
              Sobre nosotros
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
