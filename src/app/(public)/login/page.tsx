"use client";
import { useForm } from "@mantine/form";
import React, { useEffect, useState } from "react";
import Input from "@/src/components/Forms/Input";
import OnboardingFormContainer from "@/src/components/Common/OnboardingFormContainer";
import Link from "next/link";
import Password from "@/src/components/Forms/Password";
import styles from "./styles.module.scss";
import BeyondButton from "@/src/components/Common/Button";

const Login = () => {

  const form = useForm({
    initialValues: {
      password: "",
      email: "",
      remember: false,
    },
    validate: {
      password: (value: string) => (value ? null : "Password is required"),
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
      <OnboardingFormContainer
        footerContainer={
          <div>
            <div className={styles.footer}>
            Don’t have an account?
            <Link href="/signup">Sign Up</Link>
        </div>
          </div>
        }
      >
        <form
          className="flex flex-col gap-md w-full"
          onSubmit={form.onSubmit(handleFormSubmit)}
        >
          <div className={styles.text}>Login</div>
          <Input
            placeholder="Enter your email or ID"
            {...form.getInputProps("email")}
            error={form.errors.email}
            className="w-full"
          />
          <div className="flex flex-col gap-sm">
            <Password
              placeholder="Enter your password"
              {...form.getInputProps("password")}
              error={form.errors.password}
              className="w-full"
            />
            {/* <div className="text-end text-p-md text-grey-800">
              Forgot Password?{" "}
              <Link href={"#"} className="text-blue-600">
                Reset
              </Link>
            </div> */}
          </div>
          <div></div>
          <BeyondButton
            size="lg"
            type="submit"
            title={"Log In"}
            className="mt-md"
          />
        </form>
      </OnboardingFormContainer>
    </div>
  );
};

export default Login;
