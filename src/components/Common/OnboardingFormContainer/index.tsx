import React from "react";
import styles from "./styles.module.scss"
import MovieList from "@/src/assets/icons/MovieList";

interface OnboardingFormContainerProps {
  children?: React.ReactNode;
  footerContainer?: React.ReactNode;
}

const OnboardingFormContainer = ({
  children,
  footerContainer
}: OnboardingFormContainerProps) => {
  return (
    <div className={styles.onboardingFormContainer}>
      <div className={styles.header}>
       <MovieList className="#FC4747" width={32} height={26}/>
      </div>
      <div className={styles.container}>{children}</div>
      <div className={styles.footer}>
        {footerContainer}
      </div>
    </div>
  );
};

export default OnboardingFormContainer;
