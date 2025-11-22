"use client";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import React, { useState } from "react";
import Input from "@/src/components/Forms/Input";
import OnboardingFormContainer from "@/src/components/Common/OnboardingFormContainer";
import Password from "@/src/components/Forms/Password";
import BeyondButton from "@/src/components/Common/Button";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../../firebaseconfig";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";

const Login = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Invalid email format",
      password: (value) => (value ? null : "Can't be empty"),
    },
  });

  const handleFormSubmit = async (values: any) => {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);

      showNotification({
        title: "Success",
        message: "Logged in successfully!",
        color: "green",
      });

      router.push("/trending");
    } catch (error: any) {
      let message = "Login unsuccessful. Double-check your email and password.";

      switch (error.code) {
        case "auth/invalid-credential":
        case "auth/user-not-found":
        case "auth/wrong-password":
          message =
            "Login details not recognized. Haven't signed up yet? Go to Sign Up.";
          break;
        case "auth/invalid-email":
          message = "Please enter a valid email address.";
          break;
      }

      showNotification({
        title: "Error",
        message,
        color: "red",
      });
    }

    setLoading(false);
  };

  return (
    <div className={styles.loginPage}>
      <OnboardingFormContainer>
        <div className={styles.text}>Login</div>

        <form className={styles.form} onSubmit={form.onSubmit(handleFormSubmit)}>
          <Input
            placeholder="Enter email address"
            {...form.getInputProps("email")}
            error={form.errors.email}
            className="w-full"
          />

          <Password
            placeholder="Password"
            {...form.getInputProps("password")}
            error={form.errors.password}
            className="w-full"
          />

          <BeyondButton
            size="lg"
            type="submit"
            loading={loading}
            title="Login to your account"
            className={styles.loginButton}
          />
        </form>
      </OnboardingFormContainer>
    </div>
  );
};

export default Login;