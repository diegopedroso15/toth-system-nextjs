"use client";
import { useRouter } from "next/navigation";
import TotItem from "./totItem";

export default function Carousel({
  items,
  type,
}: {
  items: Array<{id: number, title: string; subject: string; imageUrl?: string}>;
  type?: "tot" | "exercise";
}) {
  const router = useRouter();

  return (
    <div className="flex overflow-x-scroll space-x-4 py-4 scrollbar-hide">
      <div className="min-w-44">
        <TotInitialItem type={type ?? "tot"} />
      </div>
      {items.map((item, index) => (
        <div key={index} className="min-w-44" onClick={() => {
          type === "tot" ? router.push("/totManagement?id=" + item.id) : router.push("/exerciseManagement?id=" + item.id);
        }}>
          <TotItem
            title={item.title}
            subject={item.subject}
            imageUrl={item.imageUrl}
          />
        </div>
      ))}
    </div>
  );
}

export function TotInitialItem({type}: {type: "tot" | "exercise"}) {
  const router = useRouter();
  const title = type === "tot" ? "Crie um TOT" : "Crie um Exercício";
  
  return (
    <div onClick={() => {
      type === "tot" ? router.push("/totManagement") : router.push("/exerciseManagement");
    }} className="relative rounded-3xl shadow-lg overflow-hidden w-44 h-44 ml-4 bg-green-800 hover:bg-green-700 cursor-pointer">
      <div className="p-2 w-full h-full text-white z-10 flex justify-center flex-col">
        <p className="text-medium font-bold self-center">{title}</p>
        <p className="text-sm self-center">Clique para começar</p>
      </div>
    </div>
  );
}
