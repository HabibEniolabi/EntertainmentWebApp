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
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? null
          : "Invalid email format",
      password: (value) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
  });

  const handleFormSubmit = async (values: any) => {
    console.log("Login form values:", values);
  };

  return (
    <div className={styles.signUpPage}>
      <OnboardingFormContainer >
        <div className={styles.text}>Sign Up</div>
        <form
          className={styles.form}
          onSubmit={form.onSubmit(handleFormSubmit)}
        > 
          <Input
            placeholder="Enter address"
            {...form.getInputProps("email")}
            error={form.isTouched("email") ? form.errors.email : null}
          />
            <Password
              placeholder="Password"
              {...form.getInputProps("password")}
              error={form.isTouched("password") ? form.errors.password : null}
            />
            <Password
              placeholder="Repeat Password"
               {...form.getInputProps("confirmPassword")}
                error={
                form.isTouched("confirmPassword")
                    ? form.errors.confirmPassword
                    : null
                }
            />
            <Link href="/login">
              <BeyondButton
                size="lg"
                type="submit"
                title={"Crete an account"}
                className={styles.signUpButton}
              />
            </Link>
          
        </form>
      </OnboardingFormContainer>
    </div>
  );
};

export default Login;