"use client";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import RegisterSteps from "./steps";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [subjectArea, setSubjectArea] = useState("");

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step === 1) router.push("/login");
    setStep(step - 1);
  };

  const finishStudentRegistration = async () => {
    const response = await fetch("/api/students", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (response.ok) {
      router.push("/login");
    }
  }

  const finishTeacherRegistration = async () => {
    const response = await fetch("/api/teachers", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
        fullName,
        cpf,
        birthDate,
        subjectArea,
      }),
    });

    if (response.ok) {
      router.push("/login");
    }
  }

  return (
    <section className="flex h-screen">
      <Button onClick={prevStep} className="my-6 bg-transparent fixed">
        <span className="text-2xl">{"<"}</span>
      </Button>
      <div className="w-full max-w-md m-auto bg-white rounded-lg shadow-default py-10 px-6">
        {RegisterSteps({
          step,
          setStep,
          email,
          setEmail,
          password,
          setPassword,
          confirmPassword,
          setConfirmPassword,
          name,
          setName,
          role,
          setRole,
          fullName,
          setFullName,
          cpf,
          setCpf,
          birthDate,
          setBirthDate,
          subjectArea,
          setSubjectArea,
          nextStep,
          finishStudentRegistration,
          finishTeacherRegistration
        })}
      </div>
    </section>
  );
}
