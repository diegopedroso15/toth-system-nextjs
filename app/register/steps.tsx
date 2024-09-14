import { Input, Button, Spacer, Dropdown, DropdownMenu, DropdownItem, DropdownSection, DropdownTrigger } from "@nextui-org/react";
import { useState } from "react";

interface RegisterStepsProps {
  step: number;
  setStep: (value: number) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  role: string;
  setRole: (value: string) => void;
  fullName: string;
  setFullName: (value: string) => void;
  cpf: string;
  setCpf: (value: string) => void;
  birthDate: string;
  setBirthDate: (value: string) => void;
  subjectArea: string;
  setSubjectArea: (value: string) => void;
  nextStep: () => void;
  finishStudentRegistration: () => void;
  finishTeacherRegistration: () => void;
}

export default function RegisterSteps({
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
}: RegisterStepsProps) {
  const [infoStep, setInfoStep] = useState(0);

  const infoMessages = [
    "Agora vamos te explicar como funciona a remuneração por parte do app...",
    "A receita que geramos vem através de anúncios visualizados dentro da plataforma.",
    "Parte dela é destinada à manutenção do sistema.",
    "A outra parte é entregue completamente aos professores parceiros.",
    "O professor recebe o valor referente aos anúncios exibidos em seu conteúdo.",
    "Após o acúmulo de, no mínimo, 100 reais, o professor pode requisitar a transferência.",
  ];

  const handleNextInfoStep = () => {
    if (infoStep < infoMessages.length - 1) {
      setInfoStep(infoStep + 1);
    } else {
      nextStep();
      setInfoStep(0);
    }
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h1 className="text-xl font-bold text-center text-purple-700 mb-6">
            Seu e-mail é:
          </h1>
          <Input
            fullWidth
            placeholder="seunome@thoth.com.br"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Spacer y={8} />
          <Button
            color="primary"
            className="w-full bg-[#5406E2] hover:bg-[#5406E2] focus:bg-[#5406E2]"
            onClick={nextStep}
          >
            Confirmar
          </Button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h1 className="text-xl font-bold text-center text-purple-700 mb-6">
            Qual a sua senha?
          </h1>
          <Input
            fullWidth
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Spacer y={5} />
          <Input
            fullWidth
            placeholder="Confirme a Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Spacer y={8} />
          <Button
            color="primary"
            className="w-full bg-[#5406E2] hover:bg-[#5406E2] focus:bg-[#5406E2]"
            onClick={nextStep}
          >
            Confirmar
          </Button>
          <Spacer y={5} />
          <p className="text-sm text-gray-600">
            Use pelo menos oito caracteres com letras, números e símbolos.
          </p>
        </div>
      )}

      {step === 3 && (
        <div>
          <h1 className="text-xl font-bold text-center text-purple-700 mb-6">
            Como gostaria de ser chamado?
          </h1>
          <Input
            fullWidth
            placeholder="Ex: Victor Araújo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Spacer y={8} />
          <Button
            color="primary"
            className="w-full bg-[#5406E2] hover:bg-[#5406E2] focus:bg-[#5406E2]"
            onClick={nextStep}
          >
            Confirmar
          </Button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h1 className="text-xl font-bold text-center text-purple-700 mb-6">
            Beleza, Você é...
          </h1>
          <Button
            color="primary"
            className="w-full bg-[#5406E2] hover:bg-[#5406E2] focus:bg-[#5406E2] mb-4"
            onClick={() => {
              setRole("Aluno");
              finishStudentRegistration();
            }}
          >
            Aluno
          </Button>
          <Button
            color="primary"
            className="w-full bg-[#5406E2] hover:bg-[#5406E2] focus:bg-[#5406E2]"
            onClick={() => {
              setRole("Professor");
              nextStep();
            }}
          >
            Professor
          </Button>
        </div>
      )}

      {step === 5 && (
        <div className="text-center">
          <img
            src="/Logo.svg"
            alt="Logo"
            className="w-32 h-32 mx-auto mb-6"
          />
          <p className="text-lg text-purple-700 mb-6">{infoMessages[infoStep]}</p>
          <Button
            color="primary"
            className="w-full bg-[#5406E2] hover:bg-[#5406E2] focus:bg-[#5406E2]"
            onClick={handleNextInfoStep}
          >
            Próximo
          </Button>
        </div>
      )}

      {step === 6 && (
        <div>
          <h1 className="text-xl font-bold text-center text-purple-700 mb-6">
            Seu nome completo é:
          </h1>
          <Input
            fullWidth
            placeholder="Ex: Gleidson Mussel"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Spacer y={8} />
          <p className="text-sm text-gray-600 mb-6">
            Precisamos do nome como consta em seus documentos, para verificar a sua identidade.
          </p>
          <Button
            color="primary"
            className="w-full bg-[#5406E2] hover:bg-[#5406E2] focus:bg-[#5406E2]"
            onClick={nextStep}
          >
            Confirmar
          </Button>
        </div>
      )}

      {step === 7 && (
        <div>
          <h1 className="text-xl font-bold text-center text-purple-700 mb-6">
            Seu CPF é:
          </h1>
          <Input
            fullWidth
            placeholder="Ex: 000.000.000-00"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <Spacer y={8} />
          <Button
            color="primary"
            className="w-full bg-[#5406E2] hover:bg-[#5406E2] focus:bg-[#5406E2]"
            onClick={nextStep}
          >
            Confirmar
          </Button>
        </div>
      )}

      {step === 8 && (
        <div>
          <h1 className="text-xl font-bold text-center text-purple-700 mb-6">
            Você nasceu em:
          </h1>
          <Input
            fullWidth
            placeholder="Ex: DD/MM/AAAA"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <Spacer y={8} />
          <Button
            color="primary"
            className="w-full bg-[#5406E2] hover:bg-[#5406E2] focus:bg-[#5406E2]"
            onClick={nextStep}
          >
            Confirmar
          </Button>
        </div>
      )}

      {step === 9 && (
        <div>
          <h1 className="text-xl font-bold text-center text-purple-700 mb-6">
            Você atua em:
          </h1>
          <Dropdown backdrop="blur">
            <DropdownTrigger>
              <Button
                color="primary"
                className="w-full bg-transparent border border-gray-400 hover:border-gray-500 focus:border-gray-500 text-[#5406E2]"
              >
                {subjectArea || "Escolha uma área"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Single selection actions"
              selectionMode="single"
              onAction={(key) => setSubjectArea(key.toString())}
            >
              <DropdownItem key="Matemática">Matemática</DropdownItem>
              <DropdownItem key="Física">Física</DropdownItem>
              <DropdownItem key="Química">Química</DropdownItem>
              <DropdownItem key="Biologia">Biologia</DropdownItem>
              <DropdownItem key="História">História</DropdownItem>
              <DropdownItem key="Geografia">Geografia</DropdownItem>
              <DropdownItem key="Português">Português</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Spacer y={8} />
          <Button
            color="primary"
            className="w-full bg-[#5406E2] hover:bg-[#5406E2] focus:bg-[#5406E2]"
            onClick={() => finishTeacherRegistration()}
          >
            Confirmar
          </Button>
        </div>
      )}
    </div>
  );
}
