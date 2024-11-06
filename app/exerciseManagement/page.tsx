"use client";
import {
  Button,
  Input,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  useDisclosure,
  Select,
  SelectItem,
  Selection,
} from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

interface Question {
  id: number;
  statement: string;
  alternatives: Alternative[];
}

interface Alternative {
  id: number;
  text: string;
  isCorrect: boolean;
}

export default function CreateTot() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [category, setCategory] = useState("Matemática");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [tots, setTots] = useState<any[]>([]);
  const [totRef, setTotRef] = useState("");
  const [canSend, setCanSend] = useState(false);
  const [value, setValue] = React.useState<Selection>(new Set([]));

  useEffect(() => {
    const fetchTots = async () => {
      const teacher_id = localStorage.getItem("role_id");
      const response = await fetch("/api/tots/byTeacher/" + teacher_id, {
        method: "GET",
      });
      const data = await response.json();
      setTots(data);
    };

    fetchTots();
  }, []);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const response = await fetch("/api/questions/byId/" + id, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      setTotRef(data.exercise.tot_id);
      setQuestions(
        data.questions.map((question: any, index: number) => ({
          id: index + 1,
          statement: question.statement,
          alternatives: data.alternatives
            .filter((alt: any) => alt.question_id === question.id)
            .map((alt: any) => ({
              id: alt.id,
              text: alt.text,
              isCorrect: alt.is_correct,
            })),
        }))
      );
    };

    fetchData();
  }, [id]);

  function addQuestion() {
    const newQuestion: Question = {
      id: questions.length + 1,
      statement: "",
      alternatives: [],
    };
    setQuestions([...questions, newQuestion]);
  }

  function addAlternative(questionId: number) {
    setQuestions(
      questions.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            alternatives: [
              ...question.alternatives,
              {
                id: question.alternatives.length + 1,
                text: "",
                isCorrect: false,
              },
            ],
          };
        }
        return question;
      })
    );
  }

  function updateAlternativeText(
    questionId: number,
    alternativeId: number,
    text: string
  ) {
    setQuestions(
      questions.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            alternatives: question.alternatives.map((alt) =>
              alt.id === alternativeId ? { ...alt, text } : alt
            ),
          };
        }
        return question;
      })
    );
  }

  function markAsCorrect(questionId: number, alternativeId: number) {
    setQuestions(
      questions.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            alternatives: question.alternatives.map((alt) =>
              alt.id === alternativeId
                ? { ...alt, isCorrect: true }
                : { ...alt, isCorrect: false }
            ),
          };
        }
        return question;
      })
    );
  }

  const handleSubmit = async () => {
    const role_id = localStorage.getItem("role_id");
    console.log({ questions, totRef, teacher_id: role_id });
    const response = await fetch("/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ questions, totRef, teacher_id: role_id }),
    });

    if (response.ok) {
      alert("Tot criado com sucesso!");
      router.push("/dashboard");
    } else {
      alert("Erro ao criar tot.");
    }
  };

  function updateQuestionStatement(questionId: number, statement: string) {
    setQuestions(
      questions.map((question) =>
        question.id === questionId ? { ...question, statement } : question
      )
    );
  }

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
        <div className="text-[#5406E2] text-2xl font-semibold">
          <h3>Criar Exercício</h3>
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <Select
          label="Selecione o Tot de referência"
          placeholder="Selecione o Tot de referência"
          className="w-full mx-5"
          selectedKeys={value}
          onSelectionChange={setValue}
          renderValue={() => <span>{value}</span>}
        >
          {tots.map((tot) => (
            <SelectItem key={tot.id}>{tot.title}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex justify-center flex-col p-5 mb-32">
        {questions.map((question) => (
          <div key={question.id} className="pb-5">
            <h3 className="text-lg font-semibold">Questão {question.id}</h3>
            <Input
              value={question.statement}
              onChange={(e) =>
                updateQuestionStatement(question.id, e.target.value)
              }
              placeholder="Digite o enunciado aqui..."
              className="mb-5"
            />
            {question.alternatives.map((alternative) => (
              <div
                key={alternative.id}
                className="flex items-center mb-2 gap-2"
              >
                <Input
                  value={alternative.text}
                  onChange={(e) =>
                    updateAlternativeText(
                      question.id,
                      alternative.id,
                      e.target.value
                    )
                  }
                  placeholder={`Digite a resposta ${String.fromCharCode(64 + alternative.id)} aqui...`}
                />
                <Button
                  onClick={() => markAsCorrect(question.id, alternative.id)}
                  className={
                    alternative.isCorrect ? "bg-green-500" : "bg-red-500"
                  }
                >
                  {alternative.isCorrect ? "✓" : "✗"}
                </Button>
              </div>
            ))}
            <Button
              className="bg-green-500"
              onClick={() => addAlternative(question.id)}
            >
              Adicionar Alternativa
            </Button>
          </div>
        ))}
        <Button className="bg-green-500" onClick={addQuestion}>
          Nova Questão
        </Button>
      </div>

      <div className="fixed bottom-0 w-full flex my-10 gap-2 left-0 px-5">
        <Button
          onClick={() => router.push("/dashboard")}
          className="bg-red-600 text-white w-1/2 h-12"
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          isDisabled={false}
          className="bg-[#5406E2] text-white w-1/2 h-12"
        >
          Salvar
        </Button>
      </div>
    </div>
  );
}
