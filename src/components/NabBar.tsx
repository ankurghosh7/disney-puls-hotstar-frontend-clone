import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { HiMenuAlt2 } from "react-icons/hi";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMediaQuery } from "usehooks-ts";
import logo from "../../public/watcherhub_logo.svg";
function NabBar() {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];

  const isTablet = useMediaQuery("(min-width: 640px)");
  return (
    <header className="flex justify-between sm:grid sm:justify-normal grid-cols-3 lg:px-10 xl:px-20 p-5 relative z-40 select-none">
      <Link to={"/"}>
        <div className="flex items-center space-x-2">
          <img src={logo} alt="logo" className="w-8 h-8 md:w-10 md:h-10" />
          <h1 className="text-xl md:text-2xl col-span-2 md:col-span-1 logo_font font-extrabold">
            watcherhub
          </h1>
        </div>
      </Link>
      {isTablet ? (
        <ul
          className={` bg-transparent flex  space-x-8 justify-center items-center `}
        >
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink to={item.path}>
                {({ isActive }) => (
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
      ) : (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost">
              <HiMenuAlt2 className="text-2xl" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <ul className="space-y-4 py-10 w-full">
              {navItems.map((item) => (
                <li key={item.name} className="w-full ">
                  <NavLink to={item.path} className={"w-full inline-block"}>
                    {({ isActive }) => (
                      <span
                        className={`${
                          isActive
                            ? "font-bold text-black bg-gray-50 "
                            : "text-slate-400 bg-slate-50/10"
                        } w-full inline-block p-2 rounded-lg text-center`}
                      >
                        {item.name}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      )}
    </header>
  );
}

export default NabBar;
