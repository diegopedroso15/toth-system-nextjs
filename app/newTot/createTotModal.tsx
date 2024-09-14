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

export default function CreateTotModal({ isOpen, onOpenChange, handleAddLine, setLineContent, setLineType, modalStage, setModalStage}: any) {

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      classNames={{
        backdrop: "bg-gray-500 bg-opacity-50",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <div className="flex flex-col items-center gap-2 p-6 rounded-lg bg-white">
            <ModalHeader className="text-xl font-semibold mb-4">
              Criar
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
                    onChange={(e) => setLineContent(e.target.value)}
                  />
                  <Button
                    className="border border-gray-300 w-full bg-green-600 text-white font-semibold"
                    variant="bordered"
                    onPress={() => {
                      handleAddLine();
                      onOpenChange();
                      setModalStage("Seleção");
                    }}
                  >
                    Modificar
                  </Button>
                  <Button
                    className="border border-gray-300 w-full bg-red-600 text-white font-semibold"
                    variant="bordered"
                  >
                    Excluir
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
