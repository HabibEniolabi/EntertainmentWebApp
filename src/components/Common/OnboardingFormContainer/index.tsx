import React from "react";
import styles from "./styles.module.scss"
import MovieList from "@/src/assets/icons/MovieList";
import Link from "next/dist/client/link";

interface OnboardingFormContainerProps {
  children?: React.ReactNode;
}

const OnboardingFormContainer = ({
  children,
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
            Don’t have an account?
            <Link href="/sign-up">Sign Up</Link>
        </div>
       </div>
    </div>
  );
};

export default OnboardingFormContainer;
