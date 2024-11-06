"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Textarea,
} from "@nextui-org/react";

interface CreateTotModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  handleAddLine: () => void;
  handleEditLine: () => void;
  lineContent: string;
  setLineContent: (value: string) => void;
  lineType: string;
  setLineType: (value: string) => void;
  modalStage: string;
  setModalStage: (value: string) => void;
  mode?: "add" | "edit";
  setModalMode: (value: "add" | "edit") => void;
}

export default function CreateTotModal({
  isOpen,
  onOpenChange,
  handleAddLine,
  handleEditLine,
  lineContent,
  setLineContent,
  lineType,
  setLineType,
  modalStage,
  setModalStage,
  mode,
  setModalMode,
}: CreateTotModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={() => {
        onOpenChange();
        setModalStage("Seleção");
        setModalMode("add");
      }}
      placement="center"
      classNames={{
        backdrop: "bg-gray-500 bg-opacity-50",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <div className="flex flex-col items-center gap-2 p-6 rounded-lg bg-white">
            <ModalHeader className="text-xl font-semibold mb-4">
              {modalStage}
            </ModalHeader>

            <ModalBody className="w-full">
              {modalStage === "Seleção" && (
                <div className="flex flex-col gap-4 w-full">
                  {["Texto", "Imagem", "Vídeo", "Link", "Citação"].map(
                    (item) => (
                      <Button
                        key={item}
                        className="border border-gray-300 w-full text-black"
                        variant="bordered"
                        onPress={() => {
                          setLineType(item);
                          setModalStage(item);
                        }}
                      >
                        {item}
                      </Button>
                    )
                  )}
                </div>
              )}

              {modalStage === "Texto" && (
                <div className="flex flex-col gap-4 w-full">
                  <Textarea
                    className="border border-gray-300"
                    placeholder="Digite o texto do Tot"
                    value={lineContent}
                    onChange={(e) => setLineContent(e.target.value)}
                  />
                  <Button
                    className="border border-gray-300 w-full bg-green-600 text-white font-semibold"
                    variant="bordered"
                    onPress={() => {
                      console.log(mode);
                      mode === "add" ? handleAddLine() : handleEditLine();
                      onOpenChange();
                      setModalStage("Seleção");
                      setModalMode("add");
                    }}
                  >
                    {mode === "add" ? "Adicionar" : "Modificar"}
                  </Button>
                  <Button
                    className="border border-gray-300 w-full bg-red-600 text-white font-semibold"
                    variant="bordered"
                  >
                    Excluir
                  </Button>
                </div>
              )}

              {modalStage === "Imagem" && (
                <div className="flex flex-col gap-4 w-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setLineContent(reader.result as string); // Salva a imagem em base64
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <Button
                    className="border border-gray-300 w-full bg-green-600 text-white font-semibold"
                    variant="bordered"
                    onPress={() => {
                      mode === "add" ? handleAddLine() : handleEditLine();
                      onOpenChange();
                      setModalStage("Seleção");
                      setModalMode("add");
                    }}
                  >
                    {mode === "add" ? "Adicionar" : "Modificar"}
                  </Button>
                </div>
              )}
            </ModalBody>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
