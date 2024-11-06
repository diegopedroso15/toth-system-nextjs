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
import { useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
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
  const [linePosition, setLinePosition] = useState(0);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [canSend, setCanSend] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function fetchIdData() {
      try {
        const response = await fetch("/api/questions/byId/" + id, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar dados da questão.");
        }

        const data = await response.json();
        setTitle(data.tot.title);
        setCategory(data.tot.subject);
        setTopic(data.tot.topic);
        setSubtopic(data.tot.subtopic);
        setLines(
          data.lines.map((q: any) => ({
            content: q.content,
            type: q.line_type,
            position: q.position,
          }))
        );
        setIsEditing(true);
      } catch (error) {
        console.error("Erro:", error);
      }
    }

    fetchIdData();
  }, [id]);

  useEffect(() => {
    async function fetchTopics() {
      await fetch("/api/subjects/topics/" + category, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setTopics(data);
        })
        .catch((error) => {
          console.error("Erro ao buscar tópicos:", error);
        });
    }

    fetchTopics();
  }, [category]);

  useEffect(() => {
    const fetchSubtopics = async () => {
      await fetch("/api/subjects/subtopics/" + topic, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setSubtopics(data);
        })
        .catch((error) => {
          console.error("Erro ao buscar sub-tópicos:", error);
        });
    };

    if (topic) {
      fetchSubtopics();
    }
  }, [topic]);

  useEffect(() => {
    setCanSend(lines.length > 0);
  }, [lines]);

  function addLine() {
    const newLines = {
      content: lineContent,
      type: lineType,
      position: lines.length + 1,
    };
    setLines([...lines, newLines]);
    setCanSend(lines.length > 0 ? true : false);
    setLineContent("");
    setLineType("");
  }

  function editLineContent() {
    const newLines = lines.map((line) => {
      if (line.position === linePosition) {
        return {
          content: lineContent,
          type: lineType,
          position: linePosition,
        };
      }
      return line;
    });
    setLines(newLines);
    setLineContent("");
    setLineType("");
  }

  const handleDefineSubtopic = (key: string) => {
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
      subject: category,
      teacher_id: localStorage.getItem("role_id"),
      topic,
      subtopic,
      lines,
    };
    
    let response;
    if (isEditing) {
      response = await fetch("/api/tots/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(totData),
      });
    } else {
      response = await fetch("/api/tots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(totData),
      });
    }
    if (response.ok) {
      alert("Tot criado com sucesso!");
      router.push("/dashboard");
    } else {
      alert("Erro ao criar tot.");
    }
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
              onAction={(key) => handleDefineSubtopic(key.toString())}
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
        <ul className="pl-8 font-semibold text-base">
          {lines.map(
            (line, index) =>
              (line.type === "Texto" && (
                <li key={index} className="flex py-2">
                  {line.content}
                  <div className="pr-2">
                    <Button
                      isIconOnly
                      className="bg-transparent"
                      onClick={() => {
                        setLineContent(line.content);
                        setLineType(line.type);
                        setLinePosition(line.position);
                        setModalStage(line.type);
                        setModalMode("edit");
                        onOpenChange();
                      }}
                    >
                      <img src="/editIcon.svg" alt="Edit" />
                    </Button>
                  </div>
                </li>
              )) ||
              (line.type === "Imagem" && (
                <li
                  key={index}
                  className="py-3 flex justify-center content-center"
                >
                  <img
                    src={line.content}
                    alt=""
                    className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain"
                  />
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

      <div className="flex justify-around my-4">
        <Button
          onClick={() => router.push("/dashboard")}
          className="bg-red-600 text-white"
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          isDisabled={!canSend}
          className="bg-[#5406E2] text-white w-20"
        >
          Salvar
        </Button>
      </div>

      <CreateModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleAddLine={addLine}
        handleEditLine={editLineContent}
        lineContent={lineContent}
        setLineContent={setLineContent}
        lineType={lineType}
        setLineType={setLineType}
        modalStage={modalStage}
        setModalStage={setModalStage}
        mode={modalMode}
        setModalMode={setModalMode}
      />
    </div>
  );
}
