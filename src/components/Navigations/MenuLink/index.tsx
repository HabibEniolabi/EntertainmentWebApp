"use client";
import type { ReactNode } from "react";
import React from "react";
import Link from "next/link";
import styles from "./styles.module.scss";

interface MenuLinkProps {
  icon: React.ReactElement<{ color?: string }>;
  activeState: boolean;
  link: string;
  onClick: () => void;
  activeIcon: React.ReactElement<{ color?: string }>;
}

const MenuLink = ({
  activeState,
  icon,
  link,
  onClick,
  activeIcon,
}: MenuLinkProps): ReactNode => {
  const color = activeState ? "#FC4747" : "#5A698F";
  return (
      <Link
        href={link}
        className={`h-[32px] flex gap-md items-center  ${activeState}`}
        onClick={onClick}
      >
        <div className={styles.aside}>
          {activeState
            ? React.cloneElement(activeIcon, { color })
            : React.cloneElement(icon, {  color })}
        </div>
      </Link>
  );
};

export default MenuLink;
