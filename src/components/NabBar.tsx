import { Link, useLocation } from "react-router-dom";
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
import { IconType } from "react-icons/lib";
import { cn } from "@/lib/utils";
interface navItemsProps {
  name: string;
  path: string;
  outlineIcon: IconType;
  solidIcon: IconType;
  isActive: boolean;
}
function NabBar() {
  let location = useLocation();
  const navItems: navItemsProps[] = [
    {
      name: "My Space",
      path: "/my-page",
      outlineIcon: PiUserCircle,
      solidIcon: PiUserCircleFill,
      isActive: location.pathname === "/my-page" ? true : false,
    },
    {
      name: "Search",
      path: "/search",
      outlineIcon: CiSearch,
      solidIcon: CiSearch,
      isActive: location.pathname === "/search" ? true : false,
    },
    {
      name: "Home",
      path: "/",
      outlineIcon: RiHomeSmile2Line,
      solidIcon: RiHomeSmile2Fill,
      isActive: location.pathname === "/" ? true : false,
    },
    {
      name: "TV",
      path: "/shows",
      outlineIcon: BiTv,
      solidIcon: BiSolidTv,
      isActive: location.pathname === "/shows" ? true : false,
    },
    {
      name: "Movies",
      path: "/movies",
      outlineIcon: LuClapperboard,
      solidIcon: LuClapperboard,
      isActive: location.pathname === "/movies" ? true : false,
    },
    {
      name: "Sports",
      path: "/sports",
      outlineIcon: MdOutlineSportsBaseball,
      solidIcon: MdSportsBaseball,
      isActive: location.pathname === "/sports" ? true : false,
    },
    {
      name: "Categories",
      path: "/categories",
      outlineIcon: BiCategoryAlt,
      solidIcon: BiSolidCategoryAlt,
      isActive: location.pathname === "/categories" ? true : false,
    },
  ];
  const [navBarOpen, setNavBarOpen] = useState(false);
  const hoverBtn = () => {};
  return (
    <aside className="fixed w-24 h-screen">
      <div className="fixed z-30 w-24 h-auto">
        <div className="py-8">
          <Link to="/">
            <img src={logo} alt="logo" className="w-14 h-auto mx-auto" />
          </Link>
        </div>
      </div>
      <nav className="fixed z-20 top-0 bottom-0 min-w-24 h-screen backdrop-blur-sm">
        <div
          className={cn(
            "invisible hidden  absolute top-0 bottom-0 h-screen w-screen opacity-0 bg-gradient-to-r from-zinc-950 via-zinc-950/50 via-50% transition-all duration-700",
            {
              "visible opacity-100 block": navBarOpen,
            }
          )}
        ></div>
        <div className="h-full py-10 flex flex-col items-center justify-center absolute max-w-64">
          <div
            className={cn("flex flex-col w-full space-y-4 group/wrapper", {})}
            onMouseEnter={() => setNavBarOpen(true)}
            onMouseLeave={() => setNavBarOpen(false)}
          >
            {navItems.map((item, index) => (
              <Link to={item.path} key={index} className={`w-full mx-5`}>
                <button
                  className={cn(
                    "flex items-center w-full  group/item hover:scale-105 hover:translate-x-2 transition-all duration-300 ease-linear",
                    {
                      "drop-shadow-[0_35px_35px_rgba(225,225,225,1)]":
                        item.isActive,
                    }
                  )}
                >
                  <div className="w-12 h-12 flex items-center justify-center ">
                    {item.isActive ? (
                      <item.solidIcon className="text-2xl text-white " />
                    ) : (
                      <item.outlineIcon className="text-2xl text-white" />
                    )}
                  </div>
                  <p
                    className={cn(
                      "invisible opacity-0 group-hover/item:text-white -translate-x-5  transition-all delay-75 duration-300 text-lg font-semibold text-white",
                      {
                        "text-white": item.isActive,
                        "text-gray-400": !item.isActive,
                        "visible translate-x-0 opacity-100": navBarOpen,
                      }
                    )}
                  >
                    {item.name}
                  </p>
                </button>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default NabBar;
