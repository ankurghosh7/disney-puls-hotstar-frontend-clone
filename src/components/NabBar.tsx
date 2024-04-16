import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { HiMenuAlt2 } from "react-icons/hi";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMediaQuery } from "usehooks-ts";
import logo from "../../public/logo-d-plus.svg";
import { RiHomeSmile2Line, RiHomeSmile2Fill } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { PiUserCircle, PiUserCircleFill } from "react-icons/pi";
import { LuClapperboard } from "react-icons/lu";
import { MdOutlineSportsBaseball, MdSportsBaseball } from "react-icons/md";
import {
  BiCategoryAlt,
  BiTv,
  BiSolidTv,
  BiSolidCategoryAlt,
} from "react-icons/bi";
import { useState } from "react";

function NabBar() {
  const navItems = [
    {
      name: "My Space",
      path: "/my-page",
      outlineIcon: <PiUserCircle />,
      solidIcon: <PiUserCircleFill />,
    },
    { name: "Search", path: "/search", outlineIcon: <CiSearch /> },
    {
      name: "Home",
      path: "/",
      outlineIcon: <RiHomeSmile2Line />,
      solidIcon: <RiHomeSmile2Fill />,
    },
    {
      name: "TV",
      path: "/shows",
      outlineIcon: <BiTv />,
      solidIcon: <BiSolidTv />,
    },
    { name: "Movies", path: "/movies", outlineIcon: <LuClapperboard /> },
    {
      name: "Sports",
      path: "/sports",
      outlineIcon: <MdOutlineSportsBaseball />,
      solidIcon: <MdSportsBaseball />,
    },
    {
      name: "Categories",
      path: "/categories",
      outlineIcon: <BiCategoryAlt />,
      solidIcon: <BiSolidCategoryAlt />,
    },
  ];
  const [navBarOpen, setNavBarOpen] = useState(false);
  const isTablet = useMediaQuery("(min-width: 640px)");
  return (
    <aside className="max-h-screen h-screen w-24 fixed z-20">
      {/* <div className="w-full h-full  -z-10"></div> */}
      <div className="py-8 flex justify-center items-center flex-col z-30 space-y-4">
        <Link to={"/"}>
          <img
            src={logo}
            alt="logo"
            className="w-8 h-8 md:w-14 max-w-full md:h-auto "
          />
        </Link>
        <div className="text-sm bg-yellow-600/20 px-2 rounded-full text-yellow-400">
          <span className="text-xs">Subscribe</span>
        </div>
      </div>
      <div className="flex flex-col h-full w-full hover:w-fit py-8  select-none group z-10 absolute top-0 hover:ml-7">
        <nav className={`flex-1 w-full flex justify-center items-center `}>
          <ul className=" space-y-4 w-full group/nav ">
            {navItems.map((item) => (
              <li
                key={item.name}
                className=""
              >
                <NavLink
                  to={item.path}
                  className="flex  items-center justify-center group-hover/nav:justify-start space-x-2 text-gray-300 hover:scale-110  hover:translate-x-2 transition-all duration-300 ease-in-out"
                >
                  <div className="text-2xl p-2">{item.outlineIcon}</div>
                  <span className="text-xl hidden group-hover/nav:block delay-75 -translate-x-5 group-hover/nav:translate-x-0 transition-all duration-300 ease-in-out">
                    {item.name}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default NabBar;
