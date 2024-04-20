import { Link, NavLink } from "react-router-dom";
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
import { motion } from "framer-motion";
interface navItemsProps {
  name: string;
  path: string;
  outlineIcon: IconType;
  solidIcon: IconType;
  isHovered: boolean;
}
function NabBar() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const navItems: navItemsProps[] = [
    {
      name: "My Space",
      path: "/my-page",
      outlineIcon: PiUserCircle,
      solidIcon: PiUserCircleFill,
      isHovered: false,
    },
    {
      name: "Search",
      path: "/search",
      outlineIcon: CiSearch,
      solidIcon: CiSearch,
      isHovered: false,
    },
    {
      name: "Home",
      path: "/",
      outlineIcon: RiHomeSmile2Line,
      solidIcon: RiHomeSmile2Fill,
      isHovered: false,
    },
    {
      name: "TV",
      path: "/shows",
      outlineIcon: BiTv,
      solidIcon: BiSolidTv,
      isHovered: false,
    },
    {
      name: "Movies",
      path: "/movies",
      outlineIcon: LuClapperboard,
      solidIcon: LuClapperboard,
      isHovered: false,
    },
    {
      name: "Sports",
      path: "/sports",
      outlineIcon: MdOutlineSportsBaseball,
      solidIcon: MdSportsBaseball,
      isHovered: false,
    },
    {
      name: "Categories",
      path: "/categories",
      outlineIcon: BiCategoryAlt,
      solidIcon: BiSolidCategoryAlt,
      isHovered: false,
    },
  ];
  const [navBarOpen, setNavBarOpen] = useState(false);
  const variants = {
    closed: {
      opacity: 0,
      x: "-30%",
      transitionEnd: { display: "none" },
    },
    open: {
      opacity: 1,
      x: 0,
      display: "block",
    },
  };

  return (
    <aside className="fixed w-24 h-screen z-30">
      <div className="fixed z-30 w-24 h-auto">
        <div className="py-8">
          <Link to="/">
            <img src={logo} alt="logo" className="w-14 h-auto mx-auto" />
          </Link>
        </div>
      </div>
      <div className="fixed z-20 top-0 bottom-0 min-w-24 h-screen backdrop-blur-sm flex items-center">
        <div
          className={cn(
            "invisible hidden  absolute top-0 bottom-0 h-screen w-screen opacity-0 bg-gradient-to-r from-zinc-950 via-zinc-950/50 via-50% transition-all duration-700",
            {
              "visible opacity-100 block": navBarOpen,
            }
          )}
        ></div>
        <nav className="h-full flex items-center absolute max-w-64">
          <div
            className={cn("flex flex-col space-y-4 group/wrapper")}
            onMouseEnter={() => setNavBarOpen(true)}
            // onMouseLeave={() => setNavBarOpen(false)}
          >
            {navItems.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                data-hover={false}
                className={cn(
                  "group/item mx-5 hover:scale-110 hover:translate-x-2 transition-all duration-200 ease-linear "
                )}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                {({ isActive }) => (
                  <motion.button
                    className={cn("flex items-center scale-100", {
                      "drop-shadow-[0_3px_20px_rgba(225,225,225,1)]": isActive,
                    })}
                    whileTap={{
                      scale: 0.9,
                    }}
                  >
                    <div
                      className={cn(
                        "w-12 h-12 flex items-center justify-center"
                      )}
                    >
                      {isActive ? (
                        <item.solidIcon className="text-2xl text-white" />
                      ) : navItems[hoverIndex]?.name === item.name ? (
                        <item.solidIcon className="text-2xl text-white" />
                      ) : (
                        <item.outlineIcon className="text-2xl text-gray-400" />
                      )}
                    </div>
                    <motion.span
                      variants={variants}
                      initial="closed"
                      animate={navBarOpen ? "open" : "closed"}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        "text-xl text-gray-400 font-semibold group-hover/item:text-white",
                        {
                          "text-white": isActive,
                        }
                      )}
                    >
                      {item.name}
                    </motion.span>
                  </motion.button>
                )}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
}

export default NabBar;
