"use client";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";
import Input from "@/src/components/Forms/Input";
import OnboardingFormContainer from "@/src/components/Common/OnboardingFormContainer";
import Password from "@/src/components/Forms/Password";
import styles from "./styles.module.scss";
import BeyondButton from "@/src/components/Common/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; 
import { app } from "../../../firebaseconfig"
import { showNotification } from "@mantine/notifications";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState<string | null>(null);
  const auth = getAuth(app);

  const form = useForm({
    initialValues: {
      password: "",
      email: "",
      remember: false,
    },
    validate: {
      password: (value: string) => (value ? null : "Can't be empty"),
      email: (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? null : "Invalid email format";
      },
    },
  });

  useEffect(() => {
    if (loginError) {
      showNotification({
        title: "Error",
        message: loginError,
        color: "red",
      });
      setLoginError(null); 
    } else if (loginSuccess) { 
      showNotification({
        title: "Success",
        message: loginSuccess,
        color: "green",
      });
      
      setTimeout(() => {
          router.push("/trending");
      }, 100);
      
      setLoginSuccess(null);
    }
  }, [loginError, loginSuccess, router]);
  const handleFormSubmit = async (values: any) => {
    setLoading(true);
    setLoginError(null);
    setLoginSuccess(null); 
    try{
      await signInWithEmailAndPassword(auth, values.email, values.password);
      setLoginSuccess("Account logged in successfully!");
    } catch (error: any) {
      let message = "Login unsuccessful. Double-check your email and password.";
      switch (error.code) {
      case "auth/invalid-credential":
      case "auth/user-not-found":
      case "auth/wrong-password":
        message = "Login details not recognized. Haven't signed up yet? Go to Sign Up.";
        break;
      case "auth/invalid-email":
        message = "Please enter a valid email address.";
        break;
      default:
        message = "An unexpected error occurred. Please try again later.";
    }
      setLoginError(message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.loginPage}>
      <OnboardingFormContainer>
        <div className={styles.text}>Login</div>
        <form
          className={styles.form}
          onSubmit={form.onSubmit(handleFormSubmit)}
        > 
          <Input
            placeholder="Enter address"
            {...form.getInputProps("email")}
            error={form.isTouched("email") ? form.errors.email : null}
            className="w-full"
          />
          <Password
            placeholder="Password"
            {...form.getInputProps("password")}
            error={form.isTouched("password") ? form.errors.password : null}
            className="w-full"
           />
          <BeyondButton
              size="lg"
              type="submit"
              loading={loading}
              title={"Login to your account"}
              className={styles.loginButton}
          />
        </form>
      </OnboardingFormContainer>
    </div>
  );
};

export default Login;
