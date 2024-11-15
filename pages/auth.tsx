import React, { useCallback, useState } from "react";
import Input from "@/components/Input";

export default function auth() {
  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [varient, setVarient] = useState("login");

  const toggleVarient = useCallback(() => {
    setVarient((currentVarient) =>
      currentVarient === "login" ? "register" : "login"
    );
  }, []);

  return (
    <div className="relative h-full w-full bg-[url('/images/background.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      {/* for background opacity */}
      <div className="bg-black h-full w-full vsm:bg-opacity-50 sm:bg-opacity-50 md:bg-opacity-50 lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.webp" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 md:w-2/5 lg:w-2/5 lg:max-w-md rounded-md w-full ">
            <h2 className="text-white mb-8 text-4xl font-semibold">
              {varient === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {varient !== "login" && (
                <Input
                  id="username"
                  label="Username"
                  onChange={(ev: any) => setUsername(ev.target.value)}
                  value={userName}
                  type="text"
                />
              )}
              <Input
                id="email"
                label="Email"
                onChange={(ev: any) => setEmail(ev.target.value)}
                value={email}
                type="email"
              />
              <Input
                id="password"
                label="Password"
                onChange={(ev: any) => setPassword(ev.target.value)}
                value={password}
                type="password"
              />
            </div>
            <button className="bg-red-600 text-white py-3 rounded-md w-full mt-10 hover:bg-red-700 transition">
              {varient === "login" ? "Login" : "Sign up"}
            </button>
            <p className="mt-12 text-neutral-500 ">
              {varient === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVarient}
                className="ml-1 text-white hover:underline cursor-pointer"
              >
                {varient === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
