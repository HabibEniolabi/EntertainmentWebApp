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
  const color = activeState ? "white" : "#5A698F";
  
  return (
      <Link
        href={link}
        className={`${styles.menuLink} ${activeState && styles.active}`}
        onClick={onClick}
      >
        <div className={styles.iconWrapper}>
          {activeState
            ? React.cloneElement(activeIcon, { color })
            : React.cloneElement(icon, { color })}
        </div>
      </Link>
  );
};

export default MenuLink;