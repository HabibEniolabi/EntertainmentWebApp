"use client";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/src/components/Forms/Input";
import Password from "@/src/components/Forms/Password";
import OnboardingFormContainer from "@/src/components/Common/OnboardingFormContainer";
import BeyondButton from "@/src/components/Common/Button";
import styles from "./styles.module.scss";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../../firebaseconfig"

const SignUp = () => {
  const auth = getAuth(app);
  console.log("Firebase Auth instance:", auth);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Invalid email format",
      password: (value) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
  });

  const handleFormSubmit = async (values: any) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password); // ✅ await
      showNotification({
        title: "Success",
        message: "Account created successfully!",
        color: "green",
      });
      router.push("/login"); // ✅ redirect after success
    } catch (error: any) {
      showNotification({
        title: "Error",
        message: error.message,
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signUpPage}>
      <OnboardingFormContainer>
        <div className={styles.text}>Sign Up</div>
        <form className={styles.form} onSubmit={form.onSubmit(handleFormSubmit)}>
          <Input
            placeholder="Enter email"
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
            error={form.isTouched("confirmPassword") ? form.errors.confirmPassword : null}
          />
          <BeyondButton
            size="lg"
            // href="/login"
            type="submit"
            title="Create an account"
            loading={loading} // ✅ shows spinner while submitting
            className={styles.signUpButton}
          />
        </form>
      </OnboardingFormContainer>
    </div>
  );
};

export default SignUp;
