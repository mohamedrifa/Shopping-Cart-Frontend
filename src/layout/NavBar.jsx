import React from "react";
import { NavLink } from "react-router-dom";
import { Home, ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  const navItems = [
    { path: "/", label: "Home", icon: <Home size={20} /> },
    { path: "/cart", label: "Cart", icon: <ShoppingCart size={20} /> },
    { path: "/profile", label: "Profile", icon: <User size={20} /> },
  ];

  return (
    <>
      {/* Desktop Navbar (Top) */}
      <nav className="hidden md:flex justify-center bg-white shadow-md py-4 fixed top-0 w-full z-50">
        <ul className="flex gap-8 text-gray-700 font-semibold">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 transition-colors ${
                    isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Bottom Navbar */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-inner py-2 z-50">
        <ul className="flex justify-around text-gray-600">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center text-xs ${
                    isActive ? "text-blue-600" : "text-gray-500"
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}