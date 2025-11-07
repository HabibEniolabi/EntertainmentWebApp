import React from "react";
import styles from "./styles.module.scss"
import MovieList from "@/src/assets/icons/MovieList";
import Link from "next/dist/client/link";

interface OnboardingFormContainerProps {
  children?: React.ReactNode;
  footerTitle?: string;
  footerLink?: string;
}

const OnboardingFormContainer = ({
  children,
  footerLink,
  footerTitle
}: OnboardingFormContainerProps) => {
  return (
    <div className={styles.onboardingFormContainer}>
      <div className={styles.header}>
       <MovieList className="#FC4747" width={32} height={26}/>
      </div>
      <div className={styles.container}>
        <div className={styles.formContent}>
            {children}
        </div>
        <div className={styles.footer}>
            {footerTitle}
            <Link href="/sign-up">{footerLink}</Link>
        </div>
       </div>
    </div>
  );
};

export default OnboardingFormContainer;
