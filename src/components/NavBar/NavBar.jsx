import Link from "next/link";
import Image from "next/image";

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-5 flex justify-between items-center">
        <Link href="/">
          <Image
            src={`/logowhite.svg`}
            alt="Logo"
            width={200}
            height={200}
            className="cursor-pointer"
          />
        </Link>

        <div className="flex space-x-4">
          <Link
            href="/api/employees"
            className="hover:bg-gray-700 px-3 py-2 rounded-md text-md font-medium transition duration-150 ease-in-out cursor-pointer"
          >
            Employees
          </Link>
          <Link
            href="/api/departments"
            className="hover:bg-gray-700 px-3 py-2 rounded-md text-md font-medium transition duration-150 ease-in-out cursor-pointer"
          >
            Departments
          </Link>
          <Link
            href="/api/projects"
            className="hover:bg-gray-700 px-3 py-2 rounded-md text-md font-medium transition duration-150 ease-in-out cursor-pointer"
          >
            Projects
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
