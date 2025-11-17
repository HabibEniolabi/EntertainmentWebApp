"use client";
import { useForm } from "@mantine/form";
import React from "react";
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

  const handleFormSubmit = async (values: any) => {
    setLoading(true);
    try{
      await signInWithEmailAndPassword(auth, values.email, values.password);
      showNotification({
        title: "Success",
        message: "Account logged In successfully!",
        color: "green",
      });
      router.push("/trending");
    } catch (error: any) {
      let message = "Login failed";
      if (error.code === "auth/user-not-found") message = "Email not registered";
      if (error.code === "auth/wrong-password") message = "Incorrect password";

      showNotification({
        title: "Error",
        message,
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

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
