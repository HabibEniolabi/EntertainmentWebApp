"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MenuLink from "../MenuLink";
import classes from "./styles.module.scss";
import { useDispatch } from "react-redux";
// import { clearToken } from "@/config/store/auth/slice";
// import { useSystemColorScheme } from "@/hooks/useSystemColorScheme";
import User from '@/assets/images/user-image.png';
import Profile from "../Profile";
import { JSX } from "react";
import Bookmark from "@/src/assets/icons/Bookmark";
import Movie from "@/src/assets/icons/Movie";
import Trending from "@/src/assets/icons/Trending";
import Search from "@/src/assets/icons/Search";
import TvSeries from "@/src/assets/icons/TvSeries";
import MovieList from "@/src/assets/icons/MovieList";

const data = [
  {
    link: "/movielist",
    icon: <MovieList color={"fill-[#5A698F]"} />,
    activeIcon: <MovieList color={"fill-{#FC4747}"}  />,
  },
  {
    link: "/trending",
    icon: <Trending color={"fill-[#5A698F]"} />,
    activeIcon: <Trending color={"fill-{#FC4747}"} />,
  },
  {
    link: "/movie",
    icon: <Movie color={"fill-[#5A698F]"} />,
    activeIcon: <Movie color={"fill-{#FC4747}"} />,
  },
  {
    link: "/series",
    icon: <TvSeries color={"fill-[#5A698F]"} />,
    activeIcon: <TvSeries color={"fill-{#FC4747}"} />,
  },
  {
    link: "/bookmark",
    icon: <Bookmark color={"fill-[#5A698F]"} />,
    activeIcon: <Bookmark color={"fill-{#FC4747}"} />,
  }
];

const Sidebar = ({ setShowSidebar, showSidebar }: any): JSX.Element => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const splittedCurrentPathname = pathname.split("/");
  const modifiedPathname = splittedCurrentPathname.toSpliced(-1, 1).join("/");

  const handleMenuLinkClick = (link: string): void => {
    setShowSidebar(false);
    router.push(link);
  };

//   const handleLogout = () => {
//     dispatch(clearToken());
//     router.replace("/login");
//   };

  const links = data.map((item, index) => {
    return (
      <MenuLink
        key={index}
        icon={item.icon}
        activeState={pathname.includes(item.link)}
        link={item.link}
        activeIcon={item.activeIcon}
        onClick={() => handleMenuLinkClick(item.link)}
      />
    );
  });

  return (
    <aside
      className={`${classes.aside} ${
        showSidebar ? "mobileSidebar active" : ""
      }`}
    >
      <div onClick={() => setShowSidebar(false)} className="mobileSidebarBg" />
      <nav
        className={`${classes.sidebar} lg:w-[96px] h-screen overflow-y-auto justify-between `}
      >
        <div className="flex flex-col w-full h-full justify-between">
          <div className="h-[88px] flex justify-center px-sm items-center">
            {/* <Link
              href={`${modifiedPathname}/movielist`}
              className={"flex items-center gap-sm "}
            >
              <MovieList className="fill-[#FC4747]"/>
            </Link> */}
            <Link
                href={`${modifiedPathname}/movielist`}
                className={`max-w-[32px] w-full h-[27px] items-center rounded-[20px] text-[#FC4747]`}
                onClick={() => handleMenuLinkClick("./movielist")}
            >
                <div className="w-full h-full">
                    <MovieList className="fill-[#FC4747]"/>
                </div>
            </Link>
          </div>
          
          <div className="flex flex-col gap-[6px] pt-[20px] px-sm">
            <div className="flex flex-col gap-sm">{links}</div>
          </div>
        </div>
       <Profile image={User}/>
      </nav>
    </aside>
  );
};

export default Sidebar;
