"use client";
import { Button } from "@nextui-org/react";
import Carousel from "@/components/carrousel/CarrosselV1";
import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function TeacherDashboard() {
  interface Item {
    title: string;
    subject: string;
    imageUrl?: string;
  }

  const [tots, setTots] = useState<Item[]>([]);
  const [exercises, setExercises] = useState<Item[]>([]);

  useEffect(() => {
    const fetchTots = async () => {
      const response = [
        { title: "Soma de arcos", subject: "Matemática", imageUrl: "/mathImage.png" },
        { title: "Soma de arcos", subject: "Matemática", imageUrl: "/mathImage.png" },
        { title: "Soma de arcos", subject: "Matemática", imageUrl: "/mathImage.png" },
        { title: "Soma de arcos", subject: "Matemática", imageUrl: "/mathImage.png" },
        { title: "Soma de arcos", subject: "Matemática", imageUrl: "/mathImage.png" },
        { title: "Soma de arcos", subject: "Matemática", imageUrl: "/mathImage.png" },
        { title: "Soma de arcos", subject: "Matemática", imageUrl: "/mathImage.png" },
        { title: "Soma de arcos", subject: "Matemática", imageUrl: "/mathImage.png" },
        { title: "Soma de arcos", subject: "Matemática", imageUrl: "/mathImage.png" },
      ];
      setTots(response);
    };

    const fetchExercises = async () => {
      const response = [
        { title: "Multiplicação", subject: "Matemática"}
      ];
      setExercises(response);
    };

    fetchTots();
    fetchExercises();
  }, []);

  return (
    <div className="mt-5">
      <div className="flex justify-center gap-10 items-center h-28">
        <div className="h-full gap-4 mt-4">
          <h1 className="text-lg font-semibold text-[#5406E2]">
            Saldo Disponível
          </h1>
          <div className="flex gap-2">
            <p className="font-semibold text-[#5406E2]">R$</p>
            <h1 className="font-semibold text-[#5406E2] text-4xl">0,00</h1>
          </div>
        </div>
        <Button
          color="primary"
          className="bg-[#5406E2] hover:bg-[#5406E2] focus:bg-[#5406E2] p-5 rounded-full text-sm"
        >
          Transferir
        </Button>
        <div className="h-full">
          <img src="/topIcon.svg" alt="icon" className="h-12 w-12" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center mb-6 bg-[#4006A9] py-4">
        <div className="text-white px-4">
          <p className="text-3xl">0</p>
          <p className="text-xs">Tot Feitos</p>
        </div>
        <div className="text-white px-4">
          <p className="text-3xl">0</p>
          <p className="text-xs">Comentários recebidos</p>
        </div>
        <div className="text-white px-4">
          <p className="text-3xl">0</p>
          <p className="text-xs">Exercícios criados</p>
        </div>
      </div>

      <div className="h-[30rem]">
        <div className="h-3/6">
          <h2 className="text-lg font-bold text-[#5406E2] mb-2 ml-3">
            Seus Tots
          </h2>
          {tots.length > 0 ? (
            <Carousel items={tots} />
          ) : (
            <div className="flex justify-center h-full">
              <p className="text-gray-500">Nada por aqui :(</p>
            </div>
          )}
        </div>

        <div className="h-4/6">
          <h2 className="text-lg font-bold text-[#5406E2] mb-2 ml-3">
            Seus Exercícios
          </h2>
          {exercises.length > 0 ? (
            <Carousel items={exercises} />
          ) : (
            <div className="flex justify-center h-full">
              <p className="text-gray-500">Nada por aqui :(</p>
            </div>
          )}
        </div>
      </div>

      <Button
        className="bg-[#5406E2] rounded-full w-16 h-16 fixed bottom-24 right-6 flex items-center justify-center shadow-lg"
        color="primary"
      >
        <PlusIcon className="h-6 w-6 text-white" />
      </Button>
    </div>
  );
}
