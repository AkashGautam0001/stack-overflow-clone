"use client";
65;
import { useAuthStore } from "@/store/Auth";
import React from "react";

function RegisterPage() {
  const { createAccount, login } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // collect data
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // validate
    if (!firstName || !lastName || !email || !password) {
      setError(() => "Please fill out all the field");
      return;
    }

    // call the store
    setIsLoading(true);
    setError("");

    const response = await createAccount(
      `${firstName} ${lastName}`,
      email?.toString(),
      password?.toString()
    );

    if (response.error) {
      setError(() => response.error!.message);
    } else {
      const loginResponse = await login(email.toString(), password.toString());

      if (loginResponse.error) {
        setError(() => loginResponse.error!.message);
      }
    }

    setIsLoading(() => false);
  };
  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}></form>
    </div>
  );
}

export default RegisterPage;
