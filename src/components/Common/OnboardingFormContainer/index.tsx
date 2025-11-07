import React from "react";
import styles from "./styles.module.scss"
import MovieList from "@/src/assets/icons/MovieList";
import Link from "next/dist/client/link";
import { usePathname } from "next/navigation";

interface OnboardingFormContainerProps {
  children?: React.ReactNode;
}

const OnboardingFormContainer = ({
  children
}: OnboardingFormContainerProps) => {

    const pathname = usePathname();

   const isSignUpPage = pathname === "/sign-up";
   const linkHref = isSignUpPage ? "/login" : "/sign-up";
   const footerText = isSignUpPage
    ? "Already have an account?"
    : "Don’t have an account?";
   const linkText = isSignUpPage ? "Login" : "Sign Up";

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
            {footerText}
            <Link href={linkHref}>{linkText}</Link>
        </div>
       </div>
    </div>
  );
};

export default OnboardingFormContainer;
