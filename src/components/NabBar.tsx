import { NavLink } from "react-router-dom";

function NabBar() {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];
  return (
    <header className="grid lg:grid-cols-3 lg:px-10 xl:px-20 sm:py-5">
      <h1 className="text-2xl">watcherhub</h1>
      <ul className="flex space-x-8 justify-center items-center">
        {navItems.map((item) => (
          <li key={item.name}>
            <NavLink to={item.path}>
              {({ isActive, isPending, isTransitioning }) => (
                <span
                  className={
                    isActive ? "font-bold text-white" : "text-slate-400"
                  }
                >
                  {item.name}
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
      <div></div>
    </header>
  );
}

export default NabBar;
