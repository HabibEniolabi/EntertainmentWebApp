"use client";
import { useForm } from "@mantine/form";
import React from "react";
import Input from "@/src/components/Forms/Input";
import OnboardingFormContainer from "@/src/components/Common/OnboardingFormContainer";
import Password from "@/src/components/Forms/Password";
import styles from "./styles.module.scss";
import BeyondButton from "@/src/components/Common/Button";
import Link from "next/link";

const Login = () => {

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
    console.log("Login form values:", values);
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
            <Link href="/trending">
                <BeyondButton
                    size="lg"
                    type="submit"
                    title={"Login to your account"}
                    className={styles.loginButton}
                />
            </Link>
        </form>
      </OnboardingFormContainer>
    </div>
  );
};

export default Login;
