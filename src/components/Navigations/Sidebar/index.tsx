"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MenuLink from "../MenuLink";
import classes from "./styles.module.scss";
import { useDispatch } from "react-redux";
import User from '@/src/assets/images/image-avatar.png';
import Profile from "../Profile";
import { JSX } from "react";
import Bookmark from "@/src/assets/icons/Bookmark";
import Movie from "@/src/assets/icons/Movie";
import Trending from "@/src/assets/icons/Trending";
import TvSeries from "@/src/assets/icons/TvSeries";
import MovieList from "@/src/assets/icons/MovieList";
import styles from "./styles.module.scss";

const data = [
  {
    link: "/trending",
    icon: <Trending color="white" width={20} height={20}/>,
    activeIcon: <Trending color="#FC4747" width={20} height={20}/>,
  },
  {
    link: "/movie",
    icon: <Movie color="#5A698F" width={20} height={20}/>,
    activeIcon: <Movie color="#FC4747" width={20} height={20}/>,
  },
  {
    link: "/series",
    icon: <TvSeries color="#5A698F" width={20} height={20}/>,
    activeIcon: <TvSeries color="#FC4747" width={20} height={20}/>,
  },
  {
    link: "/bookmark",
    icon: <Bookmark color="#5A698F" width={20} height={20}/>,
    activeIcon: <Bookmark color="#FC4747" width={20} height={20}/>,
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
      className={`${styles.aside} ${
    showSidebar ? `${styles.mobileSidebar} ${styles.active}` : ""
  }`}
    >
      <div onClick={() => setShowSidebar(false)} className={styles.mobileSidebarBg} />
      <nav
        className={`${styles.sidebar} lg:w-[250px] h-full flex flex-col justify-between `}
      >
        <div className={styles.menu}>
            <Link
                href={`${modifiedPathname}/trending`}
                onClick={() => handleMenuLinkClick("./trending")}
            >
                <div className={styles.icon}>
                    <MovieList className="#FC4747" width={32} height={26}/>
                </div>
            </Link>
          <div className={styles.menuLinks}>
              {links}
          </div>
        </div>
       <Profile image={User}/>
      </nav>
    </aside>
  );
};

export default Sidebar;
