import { NavLink } from "react-router-dom";
import { Input } from "./ui/input";

function NabBar() {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "TV Shows", path: "/tv-shows" },
    { name: "Contact", path: "/contact" },
  ];
  return (
    <header className="flex flex-row justify-between items-center lg:py-5 lg:px-10 xl:px-20">
      <h1>watcherhub</h1>
      <ul className="flex space-x-4">
        {navItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              style={({ isActive, isPending, isTransitioning }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isPending ? "red" : "black",
                  viewTransitionName: isTransitioning ? "slide" : "",
                };
              }}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <div>
        <Input placeholder="Search" />
      </div>
    </header>
  );
}

export default NabBar;
