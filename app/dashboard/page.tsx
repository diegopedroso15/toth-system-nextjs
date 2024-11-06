"use client";
import { Button } from "@nextui-org/react";
import Carousel from "@/components/carrousel/CarrosselV1";
import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

interface Item {
  id: number;
  title: string;
  subject: string;
  imageUrl?: string;
}

export default function TeacherDashboard() {
  const router = useRouter();
  const [tots, setTots] = useState<Item[]>([]);
  const [exercises, setExercises] = useState<Item[]>([]);

  useEffect(() => {
    const teacher_id = localStorage.getItem("role_id");

    const fetchTots = async () => {
      const response = await fetch("/api/tots/byTeacher/" + teacher_id, {
        method: "GET",
      });
      const data = await response.json();
      const tots = data.map((tot: any) => ({
        id: tot.id,
        title: tot.title,
        subject: tot.subject,
        imageUrl: "/mathImage.png",
      }));
      setTots(tots);
    };

    const fetchExercises = async () => {
      const response = await fetch("/api/dashboard/exercises/getAll/" + teacher_id, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);

      const exercisesWithSubjects = await Promise.all(
        data.map(async (exercise: any) => {

          const subject = tots.find((tot) => tot.id === exercise.tot_id)?.subject;
          const title = tots.find((tot) => tot.id === exercise.tot_id)?.title;
          return {
            id: exercise.id,
            title: title ?? "Titulo",
            subject: subject ?? "Matéria",
            imageUrl: "",
          };
        })
      );
      setExercises(exercisesWithSubjects);
    };

    fetchTots();
    fetchExercises();
  }, [tots]);

  return (
    <div className="mt-5">
      <div className="flex justify-center gap-10 items-center h-28">
        <div className="h-full gap-4 mt-4">
          <h1 className="text-lg font-semibold text-[#5406E2]">Saldo Disponível</h1>
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
          <p className="text-3xl">{tots.length}</p>
          <p className="text-xs">Tot Feitos</p>
        </div>
        <div className="text-white px-4">
          <p className="text-3xl">0</p>
          <p className="text-xs">Comentários recebidos</p>
        </div>
        <div className="text-white px-4">
          <p className="text-3xl">{exercises.length}</p>
          <p className="text-xs">Exercícios criados</p>
        </div>
      </div>

      <div className="h-[30rem]">
        <div className="h-3/6">
          <h2 className="text-lg font-bold text-[#5406E2] mb-2 ml-3">Seus Tots</h2>
            <Carousel items={tots} type="tot" />
        </div>

        <div className="h-4/6">
          <h2 className="text-lg font-bold text-[#5406E2] mb-2 ml-3">Seus Exercícios</h2>
            <Carousel items={exercises} type="exercise" />
        </div>
      </div>
    </div>
  );
}
