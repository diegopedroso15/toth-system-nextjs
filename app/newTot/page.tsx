"use client";
import {
  Button,
  Input,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import CreateModal from "./createTotModal";

interface Line {
  content: string;
  type: string;
  position: number;
}

export default function CreateTot() {
  const router = useRouter();
  const [category, setCategory] = useState("Matemática");
  const [topic, setTopic] = useState("");
  const [topics, setTopics] = useState(["Aguarde um momento..."]);
  const [subtopic, setSubtopic] = useState("");
  const [subtopics, setSubtopics] = useState([]);
  const { isOpen, onOpenChange } = useDisclosure();

  const [title, setTitle] = useState("");
  const [lines, setLines] = useState<Line[]>([]);
  const [lineContent, setLineContent] = useState("");
  const [lineType, setLineType] = useState("");
  const [modalStage, setModalStage] = useState("Seleção");

  function addLine() {
    const newLines = {
      content: lineContent,
      type: lineType,
      position: lines.length + 1,
    };
    setLines([...lines, newLines]);
    setLineContent("");
    setLineType("");
  }

  useEffect(() => {
    async function fetchData() {
      await fetch("/api/subjects/topics/" + category, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setTopics(data);
        });
    }
    fetchData();
  }, [category]);

  const handleDefineTopic = (key: string) => {
    setTopic(key);

    async function fetchData() {
      await fetch("/api/subjects/subtopics/" + key, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setSubtopics(data);
        });
    }

    fetchData();
  };

  const handleSubmit = async () => {
    const totData = {
      title,
      category,
      topic,
      subtopic,
      lines,
    };

    console.log(totData);
    /* const response = await fetch("/api/tots", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(totData),
    });

    if (response.ok) {
      alert("Tot criado com sucesso!");
    } else {
      alert("Erro ao criar tot.");
    } */
  };

  return (
    <div className="pt-16">
      <div className="mb-4 flex text-white">
        <Button
          onClick={() => {
            router.push("/dashboard");
          }}
          className="bg-transparent"
          isIconOnly
        >
          <img src="/backIcon.svg" alt="Back" />
        </Button>
        <div className="text-white">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o Título"
            color="danger"
            classNames={{
              input: [
                "bg-transparent",
                "font-bold",
                "placeholder:text-[#4006A9] dark:placeholder:text-white/80",
                "placeholder:text-3xl",
                "text-3xl",
                "text-[#4006A9] !important",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-none",
                "bg-transparent",
                "border-none",
                "focus:border-none",
                "group-data-[focus=true]:bg-transparent",
              ],
            }}
          />
        </div>
      </div>

      <div className="content-center ml-14">
        <h2 className="text-sm text-black mb-2">{category}</h2>
      </div>

      <div className="mx-4 h-16 flex gap-1">
        <img src="/inputConector.svg" alt="" className="h-10" />
        <div className="mt-5 w-full">
          <Dropdown backdrop="blur">
            <DropdownTrigger>
              <Button variant="bordered" className="capitalize w-full">
                {topic || "Selecione o tópico"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Seleção de tópicos"
              selectionMode="single"
              onAction={(key) => handleDefineTopic(key.toString())}
            >
              {topics.map((t) => (
                <DropdownItem key={t}>{t}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      {subtopics && subtopics.length > 0 && (
        <div className="pr-4 pl-10 h-20 flex gap-1">
          <img src="/inputConector.svg" alt="" className="h-10" />
          <div className="mt-5 w-full">
            <Dropdown backdrop="blur">
              <DropdownTrigger>
                <Button variant="bordered" className="capitalize w-full">
                  {subtopic || "Selecione o subtópico"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Seleção de subtópicos"
                selectionMode="single"
                onAction={(key) => setSubtopic(key.toString())}
              >
                {subtopics.map((s: any) => (
                  <DropdownItem key={s}>{s}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      )}

      <div className="">
        <ul className="pl-8 font-semibold text-base  ">
          {lines.map(
            (line, index) =>
              (line.type === "Texto" && (
                <li key={index} className=" flex">
                  {line.content}
                  <div className="pr-2">
                    <Button isIconOnly className="bg-transparent"
                    onClick={() => {
                      setLineContent(line.content);
                      setLineType(line.type);
                      setModalStage(line.type);
                      onOpenChange();
                    }
                    }
                    >
                      <img src="/editIcon.svg" alt="Edit" />
                    </Button>
                  </div>
                </li>
              )) ||
              (line.type === "Imagem" && (
                <li key={index} className="py-3">
                  <img src={line.content} alt="" />
                </li>
              ))
          )}
        </ul>
      </div>

      {subtopic && (
        <div className="flex justify-center mt-4">
          <Button
            onClick={() => onOpenChange()}
            className="rounded-full border-2 border-gray-400 w-12 h-12"
          >
            <PlusIcon className="w-6 h-6" />
          </Button>
        </div>
      )}

      <CreateModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleAddLine={addLine}
        setLineContent={setLineContent}
        setLineType={setLineType}
        modalStage={modalStage}
        setModalStage={setModalStage}
      />
    </div>
  );
}
