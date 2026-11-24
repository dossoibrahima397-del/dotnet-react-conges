import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium transition duration-200"
      : "text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full text-sm font-medium transition duration-200";

  const mobileNavLinkClass = ({ isActive }) =>
    isActive
      ? "block bg-purple-600 text-white px-3 py-2 rounded-md text-base font-medium"
      : "block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium";

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink
              to="/"
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              DotnetReactCrud
            </NavLink>
          </div>

          {/* Menu Ordinateur */}
          <div className="hidden md:flex space-x-2">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/person" className={navLinkClass}>
              Person
            </NavLink>
            <NavLink to="/conges" className={navLinkClass}>
              Congés
            </NavLink>
          </div>

          {/* Bouton Menu Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-1 bg-white border-t border-gray-100">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={mobileNavLinkClass}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className={mobileNavLinkClass}
          >
            About
          </NavLink>
          <NavLink
            to="/person"
            onClick={() => setIsOpen(false)}
            className={mobileNavLinkClass}
          >
            Person
          </NavLink>
          <NavLink
            to="/conges"
            onClick={() => setIsOpen(false)}
            className={mobileNavLinkClass}
          >
            Congés
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
