"use client";
import type { ReactNode } from "react";
import React from "react";
import Link from "next/link";

interface MenuLinkProps {
  icon: React.ReactElement<any>;
  activeState: boolean;
  link: string;
  onClick: () => void;
  activeIcon: React.ReactElement<any>;
}

const MenuLink = ({
  activeState,
  icon,
  link,
  onClick,
  activeIcon,
}: MenuLinkProps): ReactNode => {
  const iconColorClass = activeState ? "fill-[#FC4747]" : "fill-[#5A698F]";
//    hover:fill-white
  return (
      <Link
        href={link}
        className={`max-w-[20px] w-full h-[20px] items-center  ${activeState}`}
        onClick={onClick}
      >
        <div className="w-[24px] h-[24px]">
          {activeState
            ? React.cloneElement(activeIcon, { iconColorClass })
            : React.cloneElement(icon, {  iconColorClass })}
        </div>
      </Link>
  );
};

export default MenuLink;
