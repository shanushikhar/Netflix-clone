import React, { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import Input from "@/components/Input";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

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

  const handleLogin = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.error(error);
    }
  }, [email, password]);

  const handleRegister = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name: userName,
        password,
      });

      handleLogin();
    } catch (error) {
      console.error(error);
    }
  }, [email, userName, password, handleLogin]);

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
            <button
              onClick={varient === "login" ? handleLogin : handleRegister}
              className="bg-red-600 text-white py-3 rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {varient === "login" ? "Login" : "Sign up"}
            </button>

            <div className="flex flex-row justify-center mt-8 gap-10">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full hover:opacity-80 cursor-pointer transform flex justify-center items-center"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full hover:opacity-80 cursor-pointer transform flex justify-center items-center"
              >
                <FaGithub size={30} />
              </div>
            </div>

            <p className="mt-8 text-neutral-500 ">
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
