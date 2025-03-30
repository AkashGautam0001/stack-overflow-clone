"use client";
import { useAuthStore } from "@/store/Auth";
import React from "react";

function LoginPage() {
  const { createAccount, login } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // collect data
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // validate
    if (!email || !password) {
      setError(() => "Please fill out all the field");
      return;
    }

    setIsLoading(() => true);
    setError("");

    const response = await login(email.toString(), password.toString());

    if (response.error) {
      setError(() => response.error!.message);
    }

    setIsLoading(() => false);
  };
  return <div></div>;
}

export default LoginPage;
