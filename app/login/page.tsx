"use client";

import { Input, Button, Spacer, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        if (user.role === "teacher") {
          localStorage.setItem("user", JSON.stringify(user.id));
          localStorage.setItem("role", user.role);
          localStorage.setItem("role_id", user.teacher_id);
          router.push("/dashboard");
        } else {
          localStorage.setItem("user", JSON.stringify(user.id));
          localStorage.setItem("role", user.role);
          localStorage.setItem("role_id", user.student_id);
          router.push("/student");
        }
      } else {
        console.error("Erro ao fazer login");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <section className="flex h-screen">
      <div className="w-screen max-w-md m-auto bg-white rounded-lg shadow-default py-5">
        <div className="mb-6 flex justify-end">
          <div className="w-44 h-64 rounded-md">
            <img
              src="/LogoLoginScreen.svg"
              alt="Logo"
              className="w-full h-full"
            />
          </div>
        </div>

        <div className="px-6">
          <div className="text-left mb-4">
            <label
              htmlFor="email"
              className="text-base text-[#5406E2] font-bold"
            >
              Usuário
            </label>
            <Input
              id="email"
              fullWidth
              placeholder="seunome@thoth.com.br"
              className="mt-1"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="text-left mb-6">
            <label
              htmlFor="password"
              className="text-base text-[#5406E2] font-bold"
            >
              Senha
            </label>
            <Input
              id="password"
              fullWidth
              placeholder="********"
              className="mt-1"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            color="primary"
            className="w-full bg-[#5406E2] hover:bg-[#5406E2] focus:bg-[#5406E2]"
            onClick={handleLogin}
          >
            Entrar
          </Button>

          <Spacer y={1} />

          <div className="text-center mt-5">
            <Link href="/register" className="text-[#5406E2]">
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
